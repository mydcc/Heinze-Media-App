# Phase 5: Lighthouse Optimization Plan

**Date:** January 25, 2026  
**Target:** 95-100 Lighthouse Score (All Metrics)  
**Estimated Duration:** 1-2 days  
**Current Build Time:** 11.62s

---

## 📊 Build Analysis

### Bundle Sizes Identified

**Problem Areas (Pre-Optimization):**

| Asset | Size | Impact | Priority |
|-------|------|--------|----------|
| `_layout.css` | 75.14 kB | Large unused CSS | 🔴 HIGH |
| Blog page bundle | 493.02 kB (126.96 kB gzip) | Huge for single route | 🔴 HIGH |
| Three.js library | Included in app | WebGL not critical | 🟡 MEDIUM |
| Montserrat fonts | ~200 kB total | Full subset included | 🟡 MEDIUM |
| SEOHead component | 9.99 kB | All pages load | 🟢 LOW |

### 404 Warnings (Should Fix)

- ❌ `/favicon.svg` - Missing favicon
- ❌ `/apple-touch-icon.png` - Missing Apple icon  
- ❌ `/assets/projects/partners-showcase.jpg` - Missing image
- ❌ `/e-learning/` route - Link to non-existent route

---

## ✅ Phase 5 Implementation Tasks

### Task 1: Fix Missing Assets (Priority: HIGH)

- [ ] Create favicon.svg in `/static/`
- [ ] Create apple-touch-icon.png in `/static/`
- [ ] Update HTML head with favicon links
- [ ] Remove broken /e-learning/ link from navigation
- **Impact:** +5-10 Lighthouse score (accessibility)

### Task 2: Optimize CSS (Priority: HIGH)

- [ ] Analyze _layout.css for unused styles
- [ ] Remove unused Tailwind utilities
- [ ] Implement CSS purging
- [ ] Extract critical CSS
- **Expected Reduction:** 20-30% CSS size
- **Impact:** +10-15 Lighthouse score (performance)

### Task 3: Font Optimization (Priority: HIGH)

- [ ] Use font-display: swap for better LCP
- [ ] Subset fonts to essential scripts only (Latin-only)
- [ ] Defer non-critical font weights
- [ ] Use system fonts as fallback
- **Expected Reduction:** 40-50% font size
- **Impact:** +10 Lighthouse score (CLS, LCP)

### Task 4: Image Optimization (Priority: MEDIUM)

- [ ] Convert PNG/JPG to WebP with fallbacks
- [ ] Add AVIF support for modern browsers
- [ ] Implement lazy loading on images
- [ ] Generate responsive image sizes
- **Expected Reduction:** 50-70% image size
- **Impact:** +15-20 Lighthouse score (performance)

### Task 5: Code Splitting (Priority: MEDIUM)

- [ ] Separate Three.js to dynamic import
- [ ] Lazy load non-critical routes
- [ ] Split blog post content dynamically
- [ ] Optimize route chunk sizes
- **Expected Impact:** -2s initial load time
- **Impact:** +20 Lighthouse score (performance)

### Task 6: Critical CSS Extraction (Priority: MEDIUM)

- [ ] Extract above-fold CSS
- [ ] Inline critical styles in HTML head
- [ ] Defer non-critical CSS
- [ ] Implement preload for critical fonts
- **Expected LCP:** <2.5s
- **Impact:** +15 Lighthouse score (LCP metric)

### Task 7: Preload & Prefetch (Priority: LOW)

- [ ] Preload critical JavaScript chunks
- [ ] Preload theme-specific CSS
- [ ] Prefetch route data
- [ ] DNS-prefetch external resources
- **Impact:** +5 Lighthouse score

### Task 8: Caching Strategy (Priority: LOW)

- [ ] Set proper Cache-Control headers
- [ ] Configure service worker for offline
- [ ] Implement HTTP/2 push
- [ ] Add expires headers for static assets
- **Impact:** +10 Lighthouse score

---

## 🎯 Optimization Strategy

### Phase 5.1: Quick Wins (30 min)

1. ✅ Fix missing assets (favicon, icons)
2. ✅ Remove broken links
3. ✅ Update HTML head metadata

### Phase 5.2: CSS & Fonts (1 hour)

1. ✅ Purge unused CSS
2. ✅ Optimize font loading
3. ✅ Extract critical CSS

### Phase 5.3: Code Splitting (1-2 hours)

1. ✅ Dynamic import Three.js
2. ✅ Lazy load route bundles
3. ✅ Optimize blog chunk

### Phase 5.4: Images & Loading (1 hour)

1. ✅ Convert images to WebP
2. ✅ Implement lazy loading
3. ✅ Add responsive sizes

### Phase 5.5: Testing & Validation (30 min)

1. ✅ Run Lighthouse audit
2. ✅ Verify no regressions
3. ✅ Document improvements

---

## 📈 Expected Results

### Before Optimization

```
Performance:  65-75 (needs improvement)
Accessibility: 85-90 (good)
Best Practices: 75-85 (good)
SEO: 95-100 (excellent)
```

### After Optimization

```
Performance:  95-100 ⭐ (+25-35 points)
Accessibility: 95-100 ⭐ (+5-10 points)
Best Practices: 95-100 ⭐ (+10-15 points)
SEO: 95-100 ✅ (maintained)
```

---

## 🛠️ Implementation Files

### Files to Create/Modify

**Create:**

- `/static/favicon.svg` - SVG favicon
- `/static/apple-touch-icon.png` - Apple icon
- `/src/lib/utils/preload.ts` - Preload strategy
- `/src/lib/utils/image-optimizer.ts` - Image handling

**Modify:**

- `/src/app.html` - Add favicon links
- `/src/app.css` - Optimize CSS
- `/src/lib/state/fonts.svelte.ts` - Font loading strategy
- `/src/routes/+layout.svelte` - Implement preloading
- `/src/routes/+page.svelte` - Dynamic Three.js import

---

## ⏱️ Timeline

| Phase | Task | Duration | Status |
|-------|------|----------|--------|
| 5.1 | Quick Wins | 30 min | ⏳ TODO |
| 5.2 | CSS & Fonts | 1 hour | ⏳ TODO |
| 5.3 | Code Splitting | 1-2 hours | ⏳ TODO |
| 5.4 | Images & Loading | 1 hour | ⏳ TODO |
| 5.5 | Testing | 30 min | ⏳ TODO |
| **Total** | **Phase 5** | **~1.5 days** | ⏳ TODO |

---

## ✨ Key Metrics to Monitor

- **FCP** (First Contentful Paint): <1.8s
- **LCP** (Largest Contentful Paint): <2.5s
- **CLS** (Cumulative Layout Shift): <0.1
- **TTFB** (Time to First Byte): <0.6s
- **Bundle Size**: <150 kB gzipped
- **CSS Size**: <30 kB after purge
- **Fonts**: <80 kB total

---

## 📋 Checklist

### Quick Wins

- [ ] Create favicon.svg
- [ ] Create apple-touch-icon.png
- [ ] Fix broken links
- [ ] Verify HTML metadata

### CSS Optimization

- [ ] Purge unused classes
- [ ] Optimize @theme declarations
- [ ] Extract critical CSS
- [ ] Test no visual regressions

### Font Optimization

- [ ] Set font-display: swap
- [ ] Subset to Latin only
- [ ] Defer secondary fonts
- [ ] Test fallback fonts

### Code Splitting

- [ ] Dynamic import Three.js
- [ ] Lazy load routes
- [ ] Optimize bundle sizes
- [ ] Test no functionality loss

### Image Optimization

- [ ] Convert to WebP
- [ ] Generate AVIF versions
- [ ] Implement lazy loading
- [ ] Add responsive sizes

### Final Testing

- [ ] Run Lighthouse audit
- [ ] Check all metrics 95+
- [ ] Manual testing on mobile
- [ ] Test on 4G throttling

---

**Status:** Phase 5 Ready to Begin  
**Build:** ✅ 11.62s (stable)  
**Next:** Start with Task 1 (Quick Wins)
