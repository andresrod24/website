# Andrés Rodríguez G. - Portfolio Website

Personal portfolio website for Andrés Rodríguez G., UX/UI Creative Designer.

## Overview

This is a static website showcasing my work as a UX/UI Creative Designer, including case studies, portfolio projects, and professional references.

## Project Structure

```
website/
├── index.html              # Home/About Me page
├── portfolio.html          # Portfolio showcase
├── references.html         # Professional references
├── styles.css              # Main stylesheet
├── assets/                 # Images, videos, and other assets
└── *.js                    # JavaScript modules
```

## Case Studies

- **CIBC MVP Rewards Hub** - `cibcmvprewardshub.html`
- **CN Railway Shipment Tracking** - `shipmentrackuseradoption.html`
- **TO Live Website Redesign** - `toliveredesign.html`
- **MLSE Maple Leafs NFT Platform** - `mlsetradenfs.html`

## Setup

This is a static website that can be served using any web server.

### Local Development

```bash
# Using Python
cd website
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server website -p 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

This site is configured for deployment on Vercel, pointing to the domain `andresrodriguez.net`.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the root directory to `website`
3. Configure your custom domain `andresrodriguez.net`
4. Deploy

## Google Analytics

To enable Google Analytics tracking:

1. Get your Google Analytics Measurement ID (format: `G-XXXXXXXXXX`)
2. Replace `GA_MEASUREMENT_ID` in all HTML files with your actual Measurement ID
3. Search and replace across all files:
   - Find: `GA_MEASUREMENT_ID`
   - Replace: `G-XXXXXXXXXX` (your actual ID)

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- No build process required

## License

© 2025 Andrés Rodríguez G. All Rights Reserved.

