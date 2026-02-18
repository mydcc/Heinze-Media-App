---

title: "Interactive web app for analyzing candlestick patterns"
date: "Mon, 09 Jun 2025 10:37:16 +0000"
slug: "candlesticks"
published: true

---

# Candlestick Pattern Analysis

## Single-Page Application (SPA)<p>Development of an interactive Single-Page Application (SPA) as an educational tool for analyzing candlestick chart patterns.</p>

#### <strong>Project Overview</strong>

<p>Development of an interactive Single-Page Application (SPA) as an educational tool for analyzing candlestick chart patterns. The application was intentionally built without external frameworks or libraries, using Vanilla JavaScript (ES6+), HTML5, and CSS3 to ensure high performance and maintainability.</p>
#### <strong>Technical Core Components</strong>
<ul>
<li><strong>Custom Canvas Engine:</strong> A custom-built rendering engine dynamically draws chart patterns on an HTML5 <code><canvas></canvas></code> element. This allows for full control over presentation and interactivity.</li>
<li><strong>Declarative Highlighting:</strong> A unique feature is the visual highlighting of key characteristics (e.g., gaps, engulfing bodies, long wicks). These are not marked as static images but are procedurally drawn on the canvas by interpreting an instruction array within each pattern's data object.</li>
<li><strong>Data-Driven Architecture:</strong> The entire application, from the pattern list to the detail view, is dynamically generated from a central JavaScript data object. This makes the application easily scalable and extensible.</li>
<li><strong>Persistent User Preferences:</strong> A favorites system and a switchable dark/light theme use the browser's <code>localStorage</code> API to save user settings client-side.</li>
</ul>
#### <strong>Architecture & Stack</strong>
<ul>
<li><strong>Technology:</strong> Vanilla JavaScript (ES6+), HTML5, CSS3.</li>
<li><strong>Architecture:</strong> The SPA follows a clear, component-like structure with a focus on separating data, UI logic, and rendering. Reactive view updates are controlled by specific function calls.</li>
</ul>
#### <strong>Conclusion</strong>
<p>The project demonstrates the conception and implementation of a complex, data-driven front-end application using only standard web technologies. The focus is on a high-performance, custom canvas visualization and a clean, extensible architecture without the abstraction of external frameworks.</p>

<a href="/apps/candlesticks_en.html">Open Web App</a>
