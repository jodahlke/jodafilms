# Cloudinary Video Integration Troubleshooting Log

## Problem Summary
- Website: JD Films Portfolio (jodafilms.netlify.app)
- Issue: Videos not playing after deployment to Netlify
- Components affected: Hero video section and Portfolio video gallery
- Host: Netlify (Static export from Next.js)
- Video hosting: Cloudinary

## Initial Investigation

### Observed Issues
- Local development: Videos played correctly
- Production (Netlify): Videos not playing
- Error messages: None visible on the frontend
- Console errors: CORS and video loading failures

### Environment Configuration
- Next.js application using static export (`output: 'export'`)
- Videos originally stored locally in `/assets/videos/` directory
- Netlify deployment with `netlify.toml` configuration
- Cloudinary account for video hosting

## Solutions Attempted

### Solution 1: Adding videos to Cloudinary
- Uploaded videos to Cloudinary account under the `jdfilms` folder
- Generated Cloudinary URLs for each video
- Added URL construction logic to convert local paths to Cloudinary URLs

### Solution 2: Creating Test Pages
We created multiple test pages to isolate the issue:
- `/simple-test/index.html`: Testing basic video embedding
- `/hero-test/index.html`: Direct hero video test
- `/iframe-test/index.html`: Using Cloudinary's iframe player
- `/proxy-test/index.html`: Using Netlify proxy
- `/comprehensive-test/index.html`: All approaches in one page

### Solution 3: Netlify Configuration Updates
- Added CORS headers in `netlify.toml`:
  ```toml
  # Global headers for all files to ensure proper CORS
  [[headers]]
    for = "/*"
    [headers.values]
      Access-Control-Allow-Origin = "*"
      Access-Control-Allow-Methods = "GET, OPTIONS"
      Access-Control-Allow-Headers = "Content-Type"
  ```
- Added a proxy for Cloudinary URLs:
  ```toml
  # Proxy for Cloudinary URLs
  [[redirects]]
    from = "/cloudinary-proxy/*"
    to = "https://res.cloudinary.com/dk5tdyhcd/:splat"
    status = 200
    force = true
    headers = {Access-Control-Allow-Origin = "*"}
  ```

### Solution 4: Advanced Video Loading Techniques
- Blob URL approach: Using `fetch()` and `URL.createObjectURL()`
- Cloudinary Player iframe embedding
- Direct URL approach: Using Cloudinary URLs directly

## Test Results
Based on our comprehensive test page:
- ✅ Direct Cloudinary URLs worked consistently
- ✅ Cloudinary Player iframe worked
- ❌ Netlify proxy approach did not work
- ❌ Fetch API + Blob URL approach not necessary

## Root Cause
1. **Hero Video**: The `VideoBackground.tsx` component was using paths relative to the project, which don't work in production
2. **Portfolio Videos**: The `portfolioItems` array in `PortfolioSection.tsx` was still using local file paths, not the Cloudinary URLs

## Final Solution Implementation

### 1. Updated Hero Video Component:
```typescript
// Function to get proper video URL
const getVideoUrl = (relativePath: string) => {
  // If it's an absolute URL, return as is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // For production environment - use direct Cloudinary URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Return the specific hero video URL that we know works
    if (relativePath.includes('hero-video')) {
      return "https://res.cloudinary.com/dk5tdyhcd/video/upload/v1741424087/hero-video_lv7684.mp4";
    }
  }
  
  // Fallback to original path
  return relativePath;
};
```

### 2. Updated Portfolio Items Array:
```typescript
const portfolioItems = [
  {
    id: 1,
    title: "Kasa Kundavi",
    category: "Commercial",
    thumbnail: "/assets/videos/thumbnails/kasakundavi.jpg",
    videoSrc: "https://res.cloudinary.com/dk5tdyhcd/video/upload/v1741424066/Kasa_Kundavi_doniyt.mp4",
    // ...
  },
  // ... other items with Cloudinary URLs
]
```

### 3. Simplified Video URL Function:
```typescript
const getVideoUrl = useCallback((relativePath: string) => {
  // If it's an absolute URL (which all Cloudinary URLs are), return as is
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // All videos now use direct Cloudinary URLs stored in the videoSrc property
  const portfolioItem = portfolioItems.find(item => item.videoSrc === relativePath);
  if (portfolioItem) {
    // Return the videoSrc directly
    return portfolioItem.videoSrc;
  }
  
  // Fallback: return the path as is
  return relativePath;
}, []);
```

## Key Lessons & Best Practices

### 1. Static Assets in Next.js Static Export
When using Next.js with `output: 'export'` mode, local file paths to assets can be problematic in production. Always use CDNs (like Cloudinary) for media files.

### 2. Testing Approaches
- Create isolated test cases for troubleshooting
- Test multiple approaches in parallel
- Check direct URLs before implementing complex solutions

### 3. Cloudinary Integration
- Direct Cloudinary URLs work best for video content
- Unique IDs in URLs are important (e.g., `hero-video_lv7684.mp4`)
- Version numbers in URLs ensure cache consistency (e.g., `v1741424087`)

### 4. CORS Handling
- Netlify proxies are not always reliable
- Direct URLs from Cloudinary work best if Cloudinary is properly configured
- Adding CORS headers in `netlify.toml` is helpful but not sufficient alone

## Final Testing
- Hero video: Working with direct Cloudinary URL
- Portfolio videos: Working with direct Cloudinary URLs
- URL Format: `https://res.cloudinary.com/dk5tdyhcd/video/upload/v1741424087/hero-video_lv7684.mp4`

## Future Improvements
1. Consider using Cloudinary's Next.js integration package for better control
2. Implement responsive video delivery using Cloudinary's transformation options
3. Consider a more robust CMS solution for managing video content

---

Date: March 8, 2025  
Project: JD Films Portfolio  
Developers: Jonas Dahlke & Claude 3.7 Sonnet 