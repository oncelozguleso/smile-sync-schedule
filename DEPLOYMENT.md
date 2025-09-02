# Dental Content Schedule - DigitalOcean Deployment Guide

## Prerequisites
- DigitalOcean account
- GitHub account (recommended)

## Deployment Steps

### Option 1: GitHub + DigitalOcean App Platform (Recommended)

#### Step 1: Push to GitHub
1. Create a new repository on GitHub called `smile-sync-schedule`
2. Run these commands in your terminal:
```bash
git remote add origin https://github.com/YOUR_USERNAME/smile-sync-schedule.git
git push -u origin main
```

#### Step 2: Deploy on DigitalOcean
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Choose "GitHub" as source
4. Select your `smile-sync-schedule` repository
5. Choose `main` branch
6. DigitalOcean will auto-detect it's a Node.js app
7. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Run Command**: Leave empty (static site)
8. Choose your plan (Basic $5/month is sufficient)
9. Click "Create Resources"

### Option 2: Manual Upload
1. Run `npm run build` locally
2. Go to DigitalOcean App Platform
3. Choose "Upload from computer"
4. Upload the entire project folder
5. Configure as above

## App Configuration
- **Name**: dental-content-schedule
- **Type**: Static Site
- **Build Command**: npm run build
- **Output Directory**: dist
- **Node Version**: 18.x

## Features Included
- ✅ Dental video content schedule (19 videos)
- ✅ Excel export functionality
- ✅ Responsive design
- ✅ Interactive dashboard
- ✅ B-roll shot guidance
- ✅ Progress tracking

## Post-Deployment
After deployment, you'll get a URL like:
`https://dental-content-schedule-xxxxx.ondigitalocean.app`

You can also configure a custom domain in the DigitalOcean dashboard.

## Estimated Cost
- Basic Plan: $5/month
- Includes SSL certificate
- Custom domain support
- Automatic deployments from GitHub

## Support
The app will automatically rebuild and deploy when you push changes to the main branch of your GitHub repository.
