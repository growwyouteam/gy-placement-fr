# Frontend Deployment Checklist ✅

## Before Deploying - IMPORTANT!

### ⚠️ Step 1: Update Backend URL (MUST DO FIRST!)

Open `js/api.js` and change line 7:

**BEFORE (Local Development):**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**AFTER (Production):**
```javascript
const API_BASE_URL = 'https://YOUR-BACKEND-URL.onrender.com/api';
```

Replace `YOUR-BACKEND-URL` with your actual Render backend URL!

---

## Deploy to Netlify

### Method 1: Drag & Drop (Easiest - 2 minutes)

1. Go to: https://app.netlify.com/
2. Sign up/Login (free)
3. Click "Add new site" → "Deploy manually"
4. Drag the entire `frontend` folder and drop it
5. Wait 30 seconds
6. Done! Your site is live 🎉

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy (run from frontend folder)
netlify deploy --prod
```

### Method 3: GitHub (Auto-deploy on push)

1. Netlify → "Add new site" → "Import from Git"
2. Connect GitHub
3. Select repository
4. Base directory: `frontend`
5. Publish directory: `.`
6. Deploy!

---

## After Deployment

### Update Backend CORS

1. Go to Render Dashboard
2. Open your backend service
3. Environment → Add variable:
   ```
   FRONTEND_URL=https://your-site.netlify.app
   ```
4. Save (backend will redeploy)

---

## Files Included for Deployment

✅ `netlify.toml` - Netlify configuration
✅ `_redirects` - SPA routing support
✅ `.gitignore` - Ignore unnecessary files

---

## Testing Your Deployment

1. Visit your Netlify URL
2. Open browser console (F12)
3. Check for errors
4. Test:
   - User registration
   - Login
   - View jobs
   - Apply for job

---

## Common Issues

### API calls failing?
- Check `js/api.js` has correct backend URL
- Ensure URL ends with `/api`
- Check backend is running (visit backend URL)

### CORS errors?
- Update `FRONTEND_URL` in Render
- Match your Netlify URL exactly
- No trailing slash

### 404 on page refresh?
- Ensure `netlify.toml` exists
- Check `_redirects` file exists

---

## Your URLs

After deployment, you'll have:
- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://your-backend.onrender.com`

Save these URLs!

---

## Re-deploying

**Drag & Drop**: Upload folder again
**CLI**: Run `netlify deploy --prod`
**GitHub**: Push changes, auto-deploys

---

Good luck! 🚀
