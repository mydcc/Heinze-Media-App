<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { GLTF, OrbitControls, Environment } from '@threlte/extras';
  import { T } from '@threlte/core';

  // Svelte 5 Props
  const {
      src,
      scale = 1,
      height = '400px',
      autoRotate = true,
      position = [0, 0, 0]
  } = $props<{
      src: string;
      scale?: number;
      height?: string;
      autoRotate?: boolean;
      position?: [number, number, number];
  }>();

  let fallback = $state(false);

  // Error handling for model loading is handled by Threlte's GLTF component events internally,
  // but we can provide a fallback UI if needed via slot or simple boolean state.
</script>

<div class="model-viewer-container w-full rounded-xl overflow-hidden bg-bg-surface border border-white/5 relative" style="height: {height}">
  {#if !fallback}
      <Canvas>
          <T.PerspectiveCamera
              makeDefault
              position={[5, 2, 5]}
              fov={50}
          >
              <OrbitControls
                  enableDamping
                  autoRotate={autoRotate}
                  enableZoom={false}
              />
          </T.PerspectiveCamera>

          <T.AmbientLight intensity={0.5} />
          <T.DirectionalLight position={[10, 10, 5]} intensity={1.5} />

          <!-- Environment for realistic reflections -->
          <Environment path="/hdr/" files="studio.hdr" isBackground={false} />

          <GLTF
              url={src}
              scale={scale}
              position={position}
              onerror={() => { console.error("Failed to load 3D model:", src); fallback = true; }}
          />
      </Canvas>
  {:else}
      <div class="absolute inset-0 flex items-center justify-center text-text-muted">
          <p>Model could not be loaded.</p>
      </div>
  {/if}

  <!-- Loading Indicator could be added here using Threlte's useLoader state -->
</div>
