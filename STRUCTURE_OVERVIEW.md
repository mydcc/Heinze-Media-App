# 📂 Heinze Media - Content Structure Overview

This document provides a complete map of the current content structure and its translation status.

## 📊 Summary
- **Total Unique Items:** 36
- **Translation Progress:** 3 / 36 (8.3%) Translated
- **Identical (Untranslated):** 31 / 36
- **Empty Files:** 2 / 36
- **Total Files:** 72 (Consistent file structure)

---

## 📝 1. Pages (`src/content/[lang]/pages/`)
*General website pages and interactive service landing pages.*

| Slug | Translation Status | Notes |
| :--- | :---: | :--- |
| `about` | ✅ Translated | |
| `blog` | 🌑 Empty | |
| `cachy-professional-risk-management-trading-journal` | ⚠️ Identical | **Duplicate** (also in Work) |
| `candlesticks` | ⚠️ Identical | **Duplicate** (also in Work) |
| `chart-pattern` | ⚠️ Identical | **Duplicate** (also in Work) |
| `chess-game` | ⚠️ Identical | **Duplicate** (also in Work) |
| `contact` | ⚠️ Identical | |
| `guide` | ✅ Translated | |
| `home` | ⚠️ Identical | |
| `imprint` | ⚠️ Identical | |
| `metaverse` | ⚠️ Identical | |
| `pat-man` | ⚠️ Identical | **Duplicate** (also in Work) |
| `preise` | ⚠️ Identical | |
| `privacy-policy` | ⚠️ Identical | (Legal text matches) |
| `products` | ⚠️ Identical | |
| `showcase` | ⚠️ Identical | |
| `sitemaps` | ⚠️ Identical | |
| `solutions` | ⚠️ Identical | |
| `terms-and-conditions` | ⚠️ Identical | |
| `websites` | ⚠️ Identical | |
| `work` | ⚠️ Identical | |
| `xr-studio` | ⚠️ Identical | |

---

## 🚀 2. Work / Portfolio (`src/content/[lang]/work/`)
*Case studies and detailed project descriptions.*

| Slug | Translation Status | Notes |
| :--- | :---: | :--- |
| `cachy-professional-risk-management-trading-journal` | ⚠️ Identical | **Duplicate** (also in Pages) |
| `candlesticks` | ⚠️ Identical | **Duplicate** (also in Pages) |
| `chart-pattern` | ⚠️ Identical | **Duplicate** (also in Pages) |
| `chess-game` | ✅ Translated | **Duplicate** (also in Pages) |
| `lifeforge` | ⚠️ Identical | |
| `nightlio` | ⚠️ Identical | |
| `pat-man` | ⚠️ Identical | **Duplicate** (also in Pages) |
| `post-32284` | ⚠️ Identical | |
| `qrev` | ⚠️ Identical | |
| `wingfit` | ⚠️ Identical | |

---

## ✍️ 3. Blog (`src/content/[lang]/blog/`)
*Articles and insights.*

| Slug | Translation Status | Notes |
| :--- | :---: | :--- |
| `aktuellen-stand-und-den-zukunftigen-moglichkeiten-von-xr-und-metaverse` | ⚠️ Identical | |
| `metaverse-for-business` | ⚠️ Identical | |
| `n8n-nodes-und-postiz` | ⚠️ Identical | |
| `physics` | 🌑 Empty | |

---

## 🛠️ Management Strategy
1. **Consolidation:** Move duplicated content from `pages` to `work` where it's a project/app, and use `pages` only for high-level landing pages.
2. **Translation:** Prioritize translating the "Identical" files using source material.
3. **SEO Check:** Use `scripts/check_content_duplication.js` before commits to ensure new content is properly translated.

**Last Updated:** 2026-02-09