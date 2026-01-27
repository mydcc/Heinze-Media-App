<script lang="ts">
    import Hero from "$lib/components/Hero.svelte";
    import Section from "$lib/components/Section.svelte";
    import Container from "$lib/components/Container.svelte";
    import Grid from "$lib/components/Grid.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import Badge from "$lib/components/Badge.svelte";
    import FeatureCard from "$lib/components/FeatureCard.svelte";
    import Tag from "$lib/components/Tag.svelte";
    import CTA from "$lib/components/CTA.svelte";
    import SEOHead from "$lib/components/SEOHead.svelte";
</script>

<SEOHead
    title="Component Library | Heinze Media"
    description="Svelte 5 Component Library mit modernen, responsiven UI-Komponenten nach Brand Guidelines"
    jsonLD={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Component Library",
        description: "Svelte 5 Runes-basierte UI-Komponenten",
    }}
/>

<Hero
    title="Component Library"
    subtitle="UI Components"
    description="Svelte 5 Runes-basierte Komponenten mit Tailwind CSS v4 und modernem Design"
    height="md"
/>

<Section
    title="Buttons"
    subtitle="Interactions"
    description="Verschiedene Button-Varianten und Größen"
>
    <Container size="md">
        <Grid cols={3} gap="md">
            <div>
                <h4 class="text-sm font-bold mb-4 text-white/70">Primary</h4>
                <Button variant="primary">Click me</Button>
            </div>
            <div>
                <h4 class="text-sm font-bold mb-4 text-white/70">Secondary</h4>
                <Button variant="secondary">Learn more</Button>
            </div>
            <div>
                <h4 class="text-sm font-bold mb-4 text-white/70">Outline</h4>
                <Button variant="outline">Explore</Button>
            </div>
        </Grid>
    </Container>
</Section>

<Section
    title="Cards"
    subtitle="Layouts"
    description="Card-Komponenten mit verschiedenen Größen und Stilen"
    background="surface"
>
    <Container size="md">
        <Grid cols={3}>
            <Card border="subtle">
                <h3 class="font-bold mb-2">Small Card</h3>
                <p class="text-white/70 text-sm">Subtler border style</p>
            </Card>
            <Card border="accent" size="md">
                <h3 class="font-bold mb-2">Medium Card</h3>
                <p class="text-white/70 text-sm">Accent border style</p>
            </Card>
            <Card border="accent" size="lg" interactive hover>
                <h3 class="font-bold mb-2">Large Card</h3>
                <p class="text-white/70 text-sm">Interactive and hoverable</p>
            </Card>
        </Grid>
    </Container>
</Section>

<Section title="Badges & Tags" subtitle="Labels">
    <Container size="md">
        <div class="space-y-8">
            <div>
                <h4 class="text-sm font-bold mb-4 text-white/70">Badges</h4>
                <div class="flex gap-2">
                    <Badge variant="primary" text="Svelte 5" />
                    <Badge variant="secondary" text="Tailwind" />
                    <Badge variant="success" text="Active" />
                    <Badge variant="warning" text="Beta" />
                    <Badge variant="error" text="Critical" />
                </div>
            </div>
            <div>
                <h4 class="text-sm font-bold mb-4 text-white/70">Tags</h4>
                <div class="flex gap-2">
                    <Tag label="Default" />
                    <Tag variant="accent" label="Featured" />
                    <Tag variant="success" label="Deployed" />
                    <Tag variant="warning" label="Review" />
                </div>
            </div>
        </div>
    </Container>
</Section>

<Section title="Feature Cards" subtitle="Content">
    <Container size="md">
        <Grid cols={3}>
            <FeatureCard
                icon="🎨"
                title="Design System"
                description="Konsistente Design-Language mit 4 Theme-Varianten"
            />
            <FeatureCard
                icon="⚡"
                title="High Performance"
                description="Optimiert für schnelle Ladezeiten und SEO"
                highlighted
            />
            <FeatureCard
                icon="📱"
                title="Responsive"
                description="Mobile-first Ansatz mit Tailwind CSS"
            />
        </Grid>
    </Container>
</Section>

<Section title="Call-to-Actions" subtitle="Engagement" background="gradient">
    <Container size="md" py="xl">
        <CTA
            title="Ready to build something amazing?"
            description="Alle Komponenten sind produktionsreif und können sofort verwendet werden."
            alignment="center"
            buttons={[
                { text: "View Docs", href: "#" },
                { text: "Get Started", href: "#", variant: "secondary" },
            ]}
        />
    </Container>
</Section>

<Section title="Design Tokens" subtitle="System" background="surface">
    <Container size="md">
        <div class="space-y-6">
            <div>
                <h3 class="text-xl font-bold mb-4">Colors</h3>
                <Grid cols={4} gap="md">
                    <div class="p-4 rounded bg-accent/20 border border-accent">
                        <div class="font-mono text-xs text-accent">Accent</div>
                    </div>
                    <div class="p-4 rounded bg-white/10 border border-white/20">
                        <div class="font-mono text-xs text-white/70">
                            Secondary
                        </div>
                    </div>
                    <div class="p-4 rounded bg-white/5 border border-white/10">
                        <div class="font-mono text-xs text-white/60">
                            Surface
                        </div>
                    </div>
                    <div
                        class="p-4 rounded bg-gradient-to-r from-accent/10 to-transparent"
                    >
                        <div class="font-mono text-xs text-accent">
                            Gradient
                        </div>
                    </div>
                </Grid>
            </div>
        </div>
    </Container>
</Section>

<style>
    :global(body) {
        padding-top: 4rem;
    }
</style>
