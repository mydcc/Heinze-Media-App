<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let canvas: HTMLCanvasElement;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let cube: THREE.Mesh;
    let animationId: number;

    onMount(async () => {
        if (!browser) return;

        // Import THREE dynamically
        const THREE = await import("three");

        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0e27);

        // Camera
        camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 3;

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowShadowMap;

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
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            metalness: 0.7,
            roughness: 0.2,
        });
        cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);

        // Create toroid geometry for background
        const toroidGeometry = new THREE.TorusGeometry(3, 0.3, 16, 32);
        const toroidMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            metalness: 0.5,
            roughness: 0.4,
            wireframe: false,
        });
        const toroid = new THREE.Mesh(toroidGeometry, toroidMaterial);
        toroid.position.z = -5;
        toroid.castShadow = true;
        scene.add(toroid);

        // Animation loop
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Rotate cube
            cube.rotation.x += 0.003;
            cube.rotation.y += 0.005;

            // Rotate toroid
            toroid.rotation.x += 0.0005;
            toroid.rotation.z += 0.0008;

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        // Handle mouse movement
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            cube.position.x = x * 0.5;
            cube.position.y = y * 0.5;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            toroidGeometry.dispose();
            toroidMaterial.dispose();
        };
    });
</script>

<canvas bind:this={canvas} class="h-screen w-full" />

<style>
    canvas {
        display: block;
        background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
    }
</style>
