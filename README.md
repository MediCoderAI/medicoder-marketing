# MediCoder.AI Marketing Website

A modern, responsive marketing website for MediCoder.AI - automated medical coding for primary care clinics.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to GitHub Pages

### Initial Setup (One Time)

1. **Create a new GitHub repository**
   ```bash
   # In the project directory
   git init
   git add .
   git commit -m "Initial commit: MediCoder.AI marketing website"
   ```

2. **Push to GitHub**
   ```bash
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/medicoder-marketing.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions**
   - The workflow will automatically run on push to `main`

### Custom Domain Setup (medicoder.ai)

1. **Add CNAME file** (already included in public folder)
   ```
   medicoder.ai
   ```

2. **Configure DNS** at your domain registrar:
   
   For apex domain (medicoder.ai):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

   For www subdomain:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

3. **Enable custom domain in GitHub**
   - Go to **Settings** → **Pages**
   - Enter `medicoder.ai` in the Custom domain field
   - Check "Enforce HTTPS" (may take a few minutes to provision SSL)

## 📄 License

© 2025 MediCoder Technologies LLC. All rights reserved.
