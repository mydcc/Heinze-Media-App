<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import * as THREE from "three";

    const { heightClass = "h-screen", viewMode = "full" } = $props();

    let canvas: HTMLCanvasElement;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let cube: THREE.Mesh;
    let toroid: THREE.Mesh | null = null;
    let gridPlane: THREE.Mesh | null = null;
    let gridMaterial: THREE.MeshBasicMaterial | null = null;
    let animationId: number;
    let geometry: THREE.BoxGeometry;
    let material: THREE.MeshStandardMaterial;
    let toroidGeometry: THREE.TorusGeometry | null = null;
    let toroidMaterial: THREE.MeshStandardMaterial | null = null;
    let gridGeometry: THREE.PlaneGeometry | null = null;
    let handleResize: (() => void) | null = null;
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    let themeObserver: MutationObserver | null = null;
    let startTime = 0;
    let isVisible = false;

    const getVar = (name: string) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();

    const applyThemeColors = () => {
        const bg = getVar("--color-bg-body") || "#0a0e27";
        const accent = getVar("--color-accent") || "#6366f1";
        const highlight = getVar("--color-text-muted") || "#8b5cf6";

        scene.background = new THREE.Color(bg);
        material.color = new THREE.Color(accent);
        if (toroidMaterial) toroidMaterial.color = new THREE.Color(highlight);
        if (gridMaterial) gridMaterial.color = new THREE.Color(highlight);
    };

    onMount(() => {
        if (!browser) return;

        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0e27);

        // Camera with dynamic configuration based on viewMode
        const cameraConfigs = {
            compact: {
                fov: 50,
                position: [-0.6, 0.2, 2.2] as [number, number, number],
                lookAt: [-0.6, 0.2, 0] as [number, number, number],
            },
            medium: {
                fov: 55,
                position: [0, 0.5, 3.5] as [number, number, number],
                lookAt: [0, 0, 0] as [number, number, number],
            },
            full: {
                fov: 60,
                position: [0, 0.6, 4.5] as [number, number, number],
                lookAt: [0, 0, 0] as [number, number, number],
            },
        };
        const config =
            cameraConfigs[viewMode as keyof typeof cameraConfigs] ||
            cameraConfigs.full;

        camera = new THREE.PerspectiveCamera(
            config.fov,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        );
        camera.position.set(...config.position);
        camera.lookAt(...config.lookAt);

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        scene.add(directionalLight);

        // Create animated cube
        geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
        material = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            metalness: 0.7,
            roughness: 0.2,
        });
        cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.set(-0.6, 0.2, 0);
        scene.add(cube);

        // Create toroid geometry for background (only for medium and full)
        if (viewMode !== "compact") {
            toroidGeometry = new THREE.TorusGeometry(1.8, 0.2, 16, 48);
            toroidMaterial = new THREE.MeshStandardMaterial({
                color: 0x8b5cf6,
                metalness: 0.5,
                roughness: 0.4,
                wireframe: false,
            });
            toroid = new THREE.Mesh(toroidGeometry, toroidMaterial);
            toroid.position.set(1.2, -0.2, -0.8);
            toroid.castShadow = true;
            scene.add(toroid);
        }

        // Wireframe grid plane (XR-style) - only for full view
        if (viewMode === "full") {
            gridGeometry = new THREE.PlaneGeometry(12, 6, 40, 20);
            gridMaterial = new THREE.MeshBasicMaterial({
                color: 0x8b5cf6,
                wireframe: true,
                transparent: true,
                opacity: 0.2,
            });
            gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
            gridPlane.rotation.x = -Math.PI / 2 + 0.15;
            gridPlane.position.set(0, -1.2, -1.5);
            scene.add(gridPlane);
        }

        // Animation loop
        startTime = performance.now();
        const animate = () => {
            if (!isVisible) return;
            animationId = requestAnimationFrame(animate);
            const t = (performance.now() - startTime) * 0.001;

            // Rotate cube - faster and more dramatic for compact view
            const rotationSpeed = viewMode === "compact" ? 1.5 : 1.0;
            cube.rotation.x += 0.0025 * rotationSpeed;
            cube.rotation.y += 0.0035 * rotationSpeed;
            cube.position.y = 0.2 + Math.sin(t * 1.1) * 0.08;

            // Rotate toroid (only if exists)
            if (toroid) {
                toroid.rotation.x += 0.0006;
                toroid.rotation.z += 0.0012;
                toroid.position.y = -0.2 + Math.sin(t * 0.9) * 0.06;
            }

            // Subtle grid drift (only if exists)
            if (gridPlane) {
                gridPlane.rotation.z = Math.sin(t * 0.2) * 0.03;
            }

            renderer.render(scene, camera);
        };

        applyThemeColors();

        // Visibility Observer
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;

                if (isVisible && !wasVisible) {
                    animate();
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(canvas);

        // Handle window resize
        handleResize = () => {
            const width = window.innerWidth;
            const height = canvas.clientHeight;
            canvas.style.width = width + "px";
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        // Handle mouse movement
        handleMouseMove = (event: MouseEvent) => {
            if (!isVisible) return;
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            cube.position.x = x * 0.5;
            cube.position.y = y * 0.5;
        };

        window.addEventListener("mousemove", handleMouseMove);

        themeObserver = new MutationObserver(() => applyThemeColors());
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-mode"],
        });

        return () => {
            observer.disconnect();
            if (handleResize)
                window.removeEventListener("resize", handleResize);
            if (handleMouseMove)
                window.removeEventListener("mousemove", handleMouseMove);
            if (themeObserver) themeObserver.disconnect();
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (toroidGeometry) toroidGeometry.dispose();
            if (toroidMaterial) toroidMaterial.dispose();
            if (gridGeometry) gridGeometry.dispose();
            if (gridMaterial) gridMaterial.dispose();
        };
    });
</script>

<canvas
    bind:this={canvas}
    class={`${heightClass} w-full`}
    style="width:100vw;display:block;"
></canvas>

<style>
    canvas {
        display: block;
        width: 100vw;
        background: linear-gradient(
            135deg,
            var(--color-bg-body) 0%,
            color-mix(in srgb, var(--color-accent) 18%, var(--color-bg-body))
                100%
        );
    }
</style>
