<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    const { heightClass = "h-screen", viewMode = "full" } = $props();

    let container: HTMLDivElement;
    let galaxyMaterial: THREE.ShaderMaterial | null = null;
    let galaxyGeometry: THREE.BufferGeometry | null = null;

    const getVar = (name: string) =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();

    // Galaxy Parameters (anpassbar)
    let particleCount = 20000;
    let particleSize = 0.6;
    let galaxyRadius = 5.0;
    let galaxyBranches = 3;
    let spinSpeed = 0.5;
    let randomness = 1.0;
    let randomnessPower = 8.0;
    let concentrationPower = 1.5;

    onMount(() => {
        if (!browser || !container) return;

        // Camera configuration
        const cameraConfigs = {
            compact: {
                fov: 50,
                position: [2, 1, 3] as [number, number, number],
            },
            medium: {
                fov: 55,
                position: [3, 1.5, 4] as [number, number, number],
            },
            full: { fov: 50, position: [4, 2, 5] as [number, number, number] },
        };
        const config =
            cameraConfigs[viewMode as keyof typeof cameraConfigs] ||
            cameraConfigs.full;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            config.fov,
            window.innerWidth / window.innerHeight,
            0.1,
            100,
        );
        camera.position.set(...config.position);

        // Scene
        const scene = new THREE.Scene();
        const bg = getVar("--color-bg-body") || "#0a0e27";
        scene.background = new THREE.Color(bg);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Galaxy colors from theme
        let colorInside = new THREE.Color(
            getVar("--color-accent") || "#6366f1",
        );
        let colorOutside = new THREE.Color(
            getVar("--color-text-muted") || "#8b5cf6",
        );

        // Galaxy particle system
        const positions = new Float32Array(particleCount * 3);
        const randoms = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            randoms[i3] = (Math.random() - 0.5) * 2 * randomness;
            randoms[i3 + 1] = (Math.random() - 0.5) * 2 * randomness;
            randoms[i3 + 2] = (Math.random() - 0.5) * 2 * randomness;
            scales[i] = Math.random();
            positions[i3] = positions[i3 + 1] = positions[i3 + 2] = 0;
        }

        galaxyGeometry = new THREE.BufferGeometry();
        galaxyGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3),
        );
        galaxyGeometry.setAttribute(
            "aRandom",
            new THREE.BufferAttribute(randoms, 3),
        );
        galaxyGeometry.setAttribute(
            "aScale",
            new THREE.BufferAttribute(scales, 1),
        );

        // Shader material
        galaxyMaterial = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: particleSize },
                uPixelRatio: { value: renderer.getPixelRatio() },
                uColorInside: { value: colorInside },
                uColorOutside: { value: colorOutside },
                uRadius: { value: galaxyRadius },
                uBranches: { value: galaxyBranches },
                uSpinSpeed: { value: spinSpeed },
                uRandomnessPower: { value: randomnessPower },
                uConcentrationPower: { value: concentrationPower },
            },
            vertexShader: `
                uniform float uTime;
                uniform float uSize;
                uniform float uPixelRatio;
                uniform float uRadius;
                uniform float uBranches;
                uniform float uSpinSpeed;
                uniform float uRandomnessPower;
                uniform float uConcentrationPower;
                
                attribute vec3 aRandom;
                attribute float aScale;
                varying float vRadiusRatio;
                
                #define PI 3.14159265359
                
                void main() {
                    float particleId = float(gl_VertexID);
                    float radiusRatio = fract(particleId / ${particleCount}.0);
                    float radius = pow(radiusRatio, uConcentrationPower) * uRadius;
                    
                    float branchId = floor(mod(particleId, uBranches));
                    float branchAngle = branchId * (2.0 * PI / uBranches);
                    float spinAngle = uTime * (1.0 - radiusRatio) * uSpinSpeed;
                    float angle = branchAngle + spinAngle;
                    
                    vec3 particlePosition = vec3(cos(angle) * radius, 0.0, sin(angle) * radius);
                    vec3 randomOffset = aRandom * pow(radiusRatio + 0.2, uRandomnessPower);
                    particlePosition += randomOffset;
                    
                    vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
                    vec4 viewPosition = viewMatrix * modelPosition;
                    gl_Position = projectionMatrix * viewPosition;
                    
                    gl_PointSize = uSize * aScale * uPixelRatio * 100.0;
                    gl_PointSize *= (1.0 / -viewPosition.z);
                    
                    vRadiusRatio = radiusRatio;
                }
            `,
            fragmentShader: `
                uniform vec3 uColorInside;
                uniform vec3 uColorOutside;
                varying float vRadiusRatio;
                
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    float distanceToCenter = length(uv);
                    if (distanceToCenter > 0.5) discard;
                    
                    float mixStrength = pow(1.0 - vRadiusRatio, 2.0);
                    vec3 color = mix(uColorOutside, uColorInside, mixStrength);
                    
                    float alpha = 0.1 / distanceToCenter - 0.2;
                    alpha = clamp(alpha, 0.0, 1.0);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
        });

        const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
        scene.add(galaxyPoints);

        // OrbitControls (wie im Original)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.minDistance = 0.1;
        controls.maxDistance = 50;

        // Animation loop
        function animate() {
            const elapsedTime = performance.now() * 0.001;

            if (galaxyMaterial) {
                galaxyMaterial.uniforms.uTime.value = elapsedTime;
            }

            controls.update();
            renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);

        // Window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener("resize", onWindowResize);

        // Theme observer
        const themeObserver = new MutationObserver(() => {
            const accent = getVar("--color-accent") || "#6366f1";
            const highlight = getVar("--color-text-muted") || "#8b5cf6";
            scene.background = new THREE.Color(
                getVar("--color-bg-body") || "#0a0e27",
            );

            if (galaxyMaterial) {
                galaxyMaterial.uniforms.uColorInside.value = new THREE.Color(
                    accent,
                );
                galaxyMaterial.uniforms.uColorOutside.value = new THREE.Color(
                    highlight,
                );
            }
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-mode"],
        });

        // Cleanup
        return () => {
            window.removeEventListener("resize", onWindowResize);
            themeObserver.disconnect();
            renderer.setAnimationLoop(null);
            controls.dispose();
            renderer.dispose();
            if (galaxyGeometry) galaxyGeometry.dispose();
            if (galaxyMaterial) galaxyMaterial.dispose();
        };
    });
</script>

<div bind:this={container} class={`${heightClass} w-full`}></div>

<style>
    div {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    div :global(canvas) {
        cursor: grab;
    }
    div :global(canvas:active) {
        cursor: grabbing;
    }
</style>
