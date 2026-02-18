<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { themeState } from "$lib/state/theme.svelte";

    let { scrollProgress = $bindable(0) }: { scrollProgress?: number } =
        $props();
    let container: HTMLDivElement;

    // Helper function to get CSS variable color
    function getCSSColor(varName: string): string {
        if (typeof window === "undefined") return "#334eff";
        return (
            getComputedStyle(document.documentElement)
                .getPropertyValue(varName)
                .trim() || "#334eff"
        );
    }

    // Helper function to convert CSS color to THREE.Color
    function getThreeColor(varName: string): THREE.Color {
        const cssColor = getCSSColor(varName);
        return new THREE.Color(cssColor);
    }

    onMount(() => {
        // Scene Storage for reactivity
        let scene: THREE.Scene;
        let ambientLight: THREE.AmbientLight;
        let light1: THREE.DirectionalLight;
        let light2: THREE.DirectionalLight;
        let sphereMaterial: THREE.MeshPhysicalMaterial;
        let gridHelper: THREE.GridHelper;

        const updateColors = () => {
            if (!scene) return;

            const accentColor = getThreeColor("--color-accent");
            const bgDark = getThreeColor("--clr-dark");
            const textMuted = getThreeColor("--text-muted");
            const highlightPrimary = getThreeColor("--highlight-primary");

            // Update Fog
            if (scene.fog instanceof THREE.FogExp2) {
                scene.fog.color.copy(bgDark);
            }

            // Update Lights
            if (ambientLight) ambientLight.color.copy(textMuted);
            if (light1) light1.color.copy(accentColor);
            if (light2) light2.color.copy(highlightPrimary);

            // Update Materials
            if (sphereMaterial) {
                sphereMaterial.color.copy(accentColor);
                sphereMaterial.emissive.copy(accentColor);
            }

            // Update Grid
            if (gridHelper) {
                // GridHelper colors are less easy to update directly,
                // but we can access the material
                const gridMaterial =
                    gridHelper.material as THREE.LineBasicMaterial;
                gridMaterial.color.copy(accentColor);
                gridMaterial.transparent = true;
                gridMaterial.opacity = 0.5;
            }
        };

        // Get dynamic theme colors
        const accentColor = getCSSColor("--color-accent");
        const bgDark = getCSSColor("--clr-dark") || "#08103f";
        const bgSurface = getCSSColor("--bg-surface") || "#05081a";

        // Scene Setup
        scene = new THREE.Scene();
        const fogColor = new THREE.Color(bgDark);
        scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.008);

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 8;
        camera.position.y = 2;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Wireframe Grid
        const gridSize = 2000;
        const gridDivisions = 2000;
        const accentThreeColor = getThreeColor("--color-accent");
        gridHelper = new THREE.GridHelper(
            gridSize,
            gridDivisions,
            accentThreeColor,
            accentThreeColor.clone().multiplyScalar(0.6),
        );
        gridHelper.position.y = -3;
        scene.add(gridHelper);

        // Glass Sphere (Glänzend, Metallisch, Halbtransparent)
        const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
        const sphereAccentColor = getThreeColor("--color-accent");
        sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: sphereAccentColor,
            emissive: sphereAccentColor,
            emissiveIntensity: 0.4,
            metalness: 0.0,
            roughness: 1.0,
            transmission: 0.0,
            transparent: true,
            opacity: 1.0,
            reflectivity: 0.0,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            ior: 1.5,
            thickness: 0.5,
            envMapIntensity: 1.5,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = false;
        sphere.receiveShadow = false;
        scene.add(sphere);

        // Licht 1 (Links) - Direktionales Licht mit Schatten
        const light1Color = getThreeColor("--color-accent");
        light1 = new THREE.DirectionalLight(light1Color, 1);
        light1.position.set(-5, 5, 5);
        light1.castShadow = false;
        light1.shadow.mapSize.width = 2048;
        light1.shadow.mapSize.height = 2048;
        light1.shadow.camera.left = -10;
        light1.shadow.camera.right = 10;
        light1.shadow.camera.top = 10;
        light1.shadow.camera.bottom = -10;
        light1.shadow.camera.near = 0.5;
        light1.shadow.camera.far = 50;
        light1.shadow.bias = -0.001;
        scene.add(light1);

        // Licht 2 (Rechts) - Direktionales Licht mit Schatten
        const light2Color = getThreeColor("--highlight-primary");
        light2 = new THREE.DirectionalLight(light2Color, 1);
        light2.position.set(5, 3, 3);
        light2.castShadow = false;
        light2.shadow.mapSize.width = 2048;
        light2.shadow.mapSize.height = 2048;
        light2.shadow.camera.left = -10;
        light2.shadow.camera.right = 10;
        light2.shadow.camera.top = 10;
        light2.shadow.camera.bottom = -10;
        light2.shadow.camera.near = 0.5;
        light2.shadow.camera.far = 50;
        light2.shadow.bias = -0.001;
        scene.add(light2);

        // Ambient Light für bessere Sichtbarkeit
        const ambientColor = getThreeColor("--text-muted");
        ambientLight = new THREE.AmbientLight(ambientColor.getHex(), 0.7);
        scene.add(ambientLight);

        // Animation basierend auf Section Scroll Progress (von prop)
        // 3 Phasen: 0-40% (Kugel kommt), 40-60% (Camera dreht), 60-100% (Kugel geht)
        let time = 0;
        let animationId: number;
        let isVisible = false;
        const sphereRadius = 2;

        // Phase 1: Kugel kommt von hinten-rechts nach vorne-mitte
        const phase1StartZ = -8;
        const phase1EndZ = 6;
        const phase1StartX = 3;
        const phase1EndX = 0;

        // Phase 3: Kugel rollt weiter weg
        const phase3EndZ = -12; // Weit weg in die Ferne
        const phase3EndX = -2; // Leicht links

        function animate() {
            if (!isVisible) return;
            animationId = requestAnimationFrame(animate);
            time += 0.01;

            // Phasen-Berechnung
            const phase1Progress = Math.min(scrollProgress / 0.4, 1); // 0-40%
            const phase2Progress = Math.max(
                0,
                Math.min((scrollProgress - 0.4) / 0.2, 1),
            ); // 40-60%
            const phase3Progress = Math.max(0, (scrollProgress - 0.6) / 0.4); // 60-100%

            // PHASE 2: Camera Rotation (180° Drehung)
            const targetRotationY = phase2Progress * Math.PI; // 0 -> PI (180°)
            camera.rotation.y = targetRotationY;

            // PHASE 1 & 3: Camera Position
            if (scrollProgress < 0.6) {
                // Phase 1: Normale Parallax-Bewegung
                camera.position.y = 2 - phase1Progress * 3;
                camera.position.z = 8 - phase1Progress * 2;
            } else {
                // Phase 3: Camera folgt leicht (weiter zurück für Übersicht)
                camera.position.y = -1 + phase3Progress * 2;
                camera.position.z = 6 + phase3Progress * 4;
            }

            // KUGEL POSITION
            if (scrollProgress < 0.4) {
                // Phase 1: Kugel rollt von hinten nach vorne
                sphere.position.x =
                    phase1StartX + (phase1EndX - phase1StartX) * phase1Progress;
                sphere.position.z =
                    phase1StartZ + (phase1EndZ - phase1StartZ) * phase1Progress;
            } else if (scrollProgress < 0.6) {
                // Phase 2: Kugel bleibt relativ stehen während Camera dreht
                sphere.position.x = phase1EndX;
                sphere.position.z = phase1EndZ;
            } else {
                // Phase 3: Kugel rollt weiter weg
                sphere.position.x =
                    phase1EndX + (phase3EndX - phase1EndX) * phase3Progress;
                sphere.position.z =
                    phase1EndZ + (phase3EndZ - phase1EndZ) * phase3Progress;
            }

            sphere.position.y = -3 + sphereRadius; // Immer auf Grid

            // KUGEL ROTATION (realistisches Rollen)
            const pathLength = Math.sqrt(
                Math.pow(sphere.position.x, 2) + Math.pow(sphere.position.z, 2),
            );
            sphere.rotation.x = -(pathLength / sphereRadius);

            // Rotation zur Bewegungsrichtung
            if (scrollProgress < 0.4) {
                sphere.rotation.z = Math.atan2(
                    phase1EndX - phase1StartX,
                    phase1EndZ - phase1StartZ,
                );
            } else if (scrollProgress > 0.6) {
                sphere.rotation.z = Math.atan2(
                    phase3EndX - phase1EndX,
                    phase3EndZ - phase1EndZ,
                );
            }

            // Light Animation (weiterhin zeitbasiert für Dynamik)
            light1.position.x = -5 + Math.sin(time * 0.5) * 2;
            light1.position.y = 5 + Math.cos(time * 0.7) * 1;

            light2.position.x = 5 + Math.cos(time * 0.6) * 2;
            light2.position.y = 3 + Math.sin(time * 0.8) * 1;

            renderer.render(scene, camera);
        }

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
        observer.observe(container);

        // Reactive Theme Updates via Svelte 5 Rune
        $effect(() => {
            // Subscribe to theme State changes
            themeState.theme;
            themeState.mode;

            // Apply new colors to Three.js objects
            updateColors();
        });

        // Resize Handler
        function handleResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            sphereGeometry.dispose();
            sphereMaterial.dispose();
            gridHelper.geometry.dispose();
            (gridHelper.material as THREE.Material).dispose();
            container.removeChild(renderer.domElement);
        };
    });
</script>

<div bind:this={container} class="absolute inset-0 z-0"></div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
