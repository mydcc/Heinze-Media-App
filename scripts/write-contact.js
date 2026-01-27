const fs = require('fs');
const content = `---
title: "Kontakt"
description: "Sprechen Sie mit uns über XR, Metaverse und 3D Web Apps. Wir antworten schnell und strukturiert."
date: "2026-01-25"
slug: "contact"
published: true
---

Bitte nutzen Sie das Kontaktformular oder schreiben Sie uns direkt per E-Mail an <a href="mailto:contact@heinze-media.com">contact@heinze-media.com</a>.
`;
fs.writeFileSync('src/content/pages/contact.md', content, 'utf8');
console.log('written');
