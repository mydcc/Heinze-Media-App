<script lang="ts">
    let { type = 'studio', class: className = '' } = $props<{ type: 'studio' | 'logic', class?: string }>();
</script>

<div class="w-full h-full flex items-center justify-center bg-bg-surface/30 {className}">
    {#if type === 'studio'}
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full opacity-80">
            <!-- Background Grid -->
            <path d="M0 450L800 450M0 400L800 400M0 350L800 350M0 500L800 500M0 550L800 550" stroke="var(--color-accent)" stroke-width="1" stroke-opacity="0.1" />
            <path d="M400 0V600" stroke="var(--color-accent)" stroke-width="1" stroke-opacity="0.1" />
            
            <!-- Perspective Lines -->
            <path d="M400 300L0 600M400 300L800 600M400 300L200 600M400 300L600 600" stroke="var(--color-accent)" stroke-width="1" stroke-opacity="0.2" />
            
            <!-- Central Studio Element (Floating Octahedron) -->
            <g class="animate-pulse-slow">
                <path d="M400 150L450 250L400 350L350 250L400 150Z" fill="url(#grad1)" fill-opacity="0.2" stroke="var(--color-accent)" stroke-width="2" />
                <path d="M350 250L450 250" stroke="var(--color-accent)" stroke-width="1" stroke-dasharray="4 4" />
                <circle cx="400" cy="150" r="4" fill="var(--color-accent)" />
                <circle cx="450" cy="250" r="4" fill="var(--color-accent)" />
                <circle cx="400" cy="350" r="4" fill="var(--color-accent)" />
                <circle cx="350" cy="250" r="4" fill="var(--color-accent)" />
            </g>
            
            <!-- Data particles -->
            <circle cx="200" cy="450" r="2" fill="var(--color-accent)" class="animate-float-1" />
            <circle cx="600" cy="380" r="2" fill="var(--color-accent)" class="animate-float-2" />
            <circle cx="300" cy="200" r="3" fill="var(--color-accent)" class="animate-float-3" />
            
            <defs>
                <linearGradient id="grad1" x1="400" y1="150" x2="400" y2="350" gradientUnits="userSpaceOnUse">
                    <stop stop-color="var(--color-accent)" />
                    <stop offset="1" stop-color="var(--color-accent)" stop-opacity="0" />
                </linearGradient>
            </defs>
            
            <style>
                @keyframes float {
                    0%, 100% { transform: translateY(0); opacity: 0.3; }
                    50% { transform: translateY(-20px); opacity: 0.8; }
                }
                .animate-float-1 { animation: float 3s infinite ease-in-out; }
                .animate-float-2 { animation: float 4s infinite ease-in-out 1s; }
                .animate-float-3 { animation: float 5s infinite ease-in-out 2s; }
                .animate-pulse-slow { animation: pulse 6s infinite ease-in-out; }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); filter: blur(0px); }
                    50% { transform: scale(1.05); filter: blur(2px); }
                }
            </style>
        </svg>
    {:else}
        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full opacity-80">
            <!-- Connection Graph -->
            <g opacity="0.4">
                <line x1="200" y1="300" x2="400" y2="150" stroke="var(--color-accent)" stroke-width="2" />
                <line x1="200" y1="300" x2="400" y2="450" stroke="var(--color-accent)" stroke-width="2" />
                <line x1="400" y1="150" x2="600" y2="300" stroke="var(--color-accent)" stroke-width="2" />
                <line x1="400" y1="450" x2="600" y2="300" stroke="var(--color-accent)" stroke-width="2" />
                <line x1="400" y1="150" x2="400" y2="450" stroke="var(--color-accent)" stroke-width="2" stroke-dasharray="8 8" />
            </g>
            
            <!-- Nodes -->
            <g class="nodes">
                <circle cx="200" cy="300" r="12" fill="var(--color-bg-body)" stroke="var(--color-accent)" stroke-width="3" />
                <circle cx="400" cy="150" r="12" fill="var(--color-bg-body)" stroke="var(--color-accent)" stroke-width="3" />
                <circle cx="400" cy="450" r="12" fill="var(--color-bg-body)" stroke="var(--color-accent)" stroke-width="3" />
                <circle cx="600" cy="300" r="12" fill="var(--color-bg-body)" stroke="var(--color-accent)" stroke-width="3" />
                
                <!-- Active Inner Glows -->
                <circle cx="200" cy="300" r="6" fill="var(--color-accent)" class="animate-ping-slow" />
                <circle cx="400" cy="150" r="6" fill="var(--color-accent)" class="animate-ping-slow" style="animation-delay: 1s" />
                <circle cx="400" cy="450" r="6" fill="var(--color-accent)" class="animate-ping-slow" style="animation-delay: 2s" />
                <circle cx="600" cy="300" r="6" fill="var(--color-accent)" class="animate-ping-slow" style="animation-delay: 1.5s" />
            </g>
            
            <!-- Floating Logic Symbols -->
            <path d="M500 100L520 120M520 100L500 120" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.3" />
            <rect x="250" y="50" width="20" height="20" rx="4" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.3" />
            <circle cx="550" cy="500" r="10" stroke="var(--color-accent)" stroke-width="2" stroke-opacity="0.3" />
            
            <style>
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    70%, 100% { transform: scale(3); opacity: 0; }
                }
                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                    transform-origin: center;
                }
                .nodes circle { transform-origin: center; }
            </style>
        </svg>
    {/if}
</div>
