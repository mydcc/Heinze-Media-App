---
title: "[EN Copy] Feature Showcase"
description: "A demonstration of the new CMS capabilities: 3D, Dynamic Branding, and Interactive Components."
date: "2024-05-24"
published: true
brandColor: "#ff0080"
accentColor: "#00ffff"
---


# The New Heinze Media CMS

This page demonstrates the power of our refactored architecture.

## 1. Dynamic Branding
Notice the colors on this page?
- **Brand Color:** Neon Pink (`#ff0080`)
- **Accent Color:** Cyan (`#00ffff`)

These are defined purely in the **Frontmatter** of this Markdown file, overriding the global theme.

## 2. 3D Integration
We can now embed interactive 3D models directly into the content stream.

<Model3D src="/models/test.glb" scale={2} height="400px" />

## 3. Interactive Svelte Components
Thanks to `mdsvex`, we can use our design system components right here.

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
    <Card title="Interactive Card" description="This is a Svelte component rendered inside Markdown.">
        <Button variant="primary">Click Me</Button>
    </Card>

    <Card title="Another Component" description="Layouts and grids work seamlessly.">
        <Button variant="secondary">Secondary Action</Button>
    </Card>
</div>

## 4. Rich Typography
Standard Markdown still works perfectly, but now it respects the dynamic branding for links and highlights.

[Test Link (Should be Cyan)](https://heinze.media)
