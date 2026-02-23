# 🚀 Complete Guide: Host KodBank on Vercel

---

## **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Step 1: Prepare Your Project](#step-1-prepare-your-project)
3. [Step 2: Create GitHub Repository](#step-2-create-github-repository)
4. [Step 3: Push Code to GitHub](#step-3-push-code-to-github)
5. [Step 4: Create Vercel Account](#step-4-create-vercel-account)
6. [Step 5: Deploy Frontend to Vercel](#step-5-deploy-frontend-to-vercel)
7. [Step 6: Deploy Backend to Vercel](#step-6-deploy-backend-to-vercel)
8. [Step 7: Configure Environment Variables](#step-7-configure-environment-variables)
9. [Step 8: Update API URLs](#step-8-update-api-urls)
10. [Step 9: Test Your Application](#step-9-test-your-application)
11. [Troubleshooting](#troubleshooting)

---

## **Prerequisites**

Before starting, you need:

1. **GitHub Account** (Free) - [github.com](https://github.com)
   - Sign up if you don't have one
   
2. **Vercel Account** (Free) - [vercel.com](https://vercel.com)
   - Sign up using GitHub (easier)

3. **Git Installed** on your computer
   - Download from [git-scm.com](https://git-scm.com)
   - Verify: Open PowerShell and run `git --version`

4. **Your KodBank folder** at `c:\Users\kadit\OneDrive\Desktop\kodbank`

---

## **Step 1: Prepare Your Project**

### 1.1: Restructure for Vercel

Vercel handles **frontend and backend separately**. We need to reorganize:

**Current Structure:**
```
kodbank/
├── backend/
├── frontend/
└── database/
```

**We'll keep this structure** but configure each separately on Vercel.

### 1.2: Update Backend for Vercel

Open `backend/server.js` and find line ~40 where CORS is configured:

**Find this:**
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Replace with:**
```javascript
// Allow requests from Vercel domains and localhost
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000'
];

// Add your Vercel frontend domain here after deployment
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

**Save the file.**

### 1.3: Create Vercel Configuration File

Create a file called `vercel.json` in the **root** of `kodbank` folder:

**Path:** `c:\Users\kadit\OneDrive\Desktop\kodbank\vercel.json`

**Content:**
```json
{
  "version": 2,
  "buildCommand": "echo 'Build complete'",
  "public": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.js"
    }
  ]
}
```

### 1.4: Create Backend API Configuration

Create a file `backend/vercel.json`:

**Content:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "PORT": "5000"
  }
}
```

### 1.5: Create Frontend Configuration

Create a file `frontend/vercel.json`:

**Content:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "react"
}
```

---

## **Step 2: Create GitHub Repository**

### 2.1: Create a GitHub Repo

1. Go to [github.com](https://github.com)
2. Click **"+"** (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `kodbank`
   - **Description:** "KodBank - Full Stack Banking Application"
   - **Visibility:** Public
   - **Initialize:** Do NOT check "Add README" (we have one)
4. Click **"Create repository"**

### 2.2: Copy the Repository URL

You'll see a page with:
```
https://github.com/YOUR_USERNAME/kodbank.git
```

**Copy this URL** - you'll need it in the next step.

---

## **Step 3: Push Code to GitHub**

### 3.1: Open PowerShell

1. Press **Windows + R**
2. Type `powershell`
3. Press **Enter**

### 3.2: Navigate to Your Project

```powershell
cd "c:\Users\kadit\OneDrive\Desktop\kodbank"
```

### 3.3: Initialize Git

```powershell
git init
```

### 3.4: Add All Files

```powershell
git add .
```

### 3.5: Create First Commit

```powershell
git commit -m "Initial commit: KodBank full stack banking application"
```

### 3.6: Add Remote Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/kodbank.git
```

**Example:**
```powershell
git remote add origin https://github.com/johndoe/kodbank.git
```

### 3.7: Push to GitHub

```powershell
git branch -M main
git push -u origin main
```

**When prompted for credentials:**
- Username: Your GitHub username
- Password: Your GitHub personal access token (or password)

**If you don't have a personal access token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` and `user` scope
3. Copy and paste as password

**Wait for upload to complete.** You should see:
```
Enumerating objects: X, done.
...
To https://github.com/YOUR_USERNAME/kodbank.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from origin.
```

---

## **Step 4: Create Vercel Account**

### 4.1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (top right)
3. Click **"Continue with GitHub"** (easiest)
4. Authorize Vercel to access your GitHub
5. Complete signup

### 4.2: Dashboard Access

You'll be taken to Vercel Dashboard. You should see:
- **"New Project"** button
- Your GitHub repos listed

---

## **Step 5: Deploy Frontend to Vercel**

### 5.1: Create Frontend Project

1. In Vercel Dashboard, click **"Add New..."** → **"Project"**
2. You should see your `kodbank` repository
3. Click **"Import"** on the kodbank repo

### 5.2: Configure Project

You'll see configuration page:

**Framework Preset:** React ✓  
**Root Directory:** `./frontend` ← **IMPORTANT** (use dropdown)  
**Build Command:** `npm run build` ✓  
**Output Directory:** `build` ✓  
**Install Command:** `npm install` ✓

Click **"Deploy"**

**Wait 3-5 minutes for build to complete.**

### 5.3: Frontend URL

After deployment, you'll see:
```
✅ Production
https://kodbank-xxxxx.vercel.app
```

**Copy this URL** - you'll need it for the backend.

---

## **Step 6: Deploy Backend to Vercel**

### 6.1: Create Backend Project

1. Go back to Vercel Dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** on kodbank repo again
4. This time, configure for backend:

**Root Directory:** `./backend` ← **SELECT THIS**  
**Framework Preset:** "Other" or "Node.js"  
**Build Command:** `npm install` (or leave empty)  
**Install Command:** `npm install`

### 6.2: Keep Default Settings

Don't change anything else. Click **"Deploy"**

**Wait 2-3 minutes for deployment.**

### 6.3: Backend URL

After deployment, you'll see:
```
✅ Production
https://kodbank-backend-xxxxx.vercel.app
```

**Copy this URL** - you'll need it for environment variables.

---

## **Step 7: Configure Environment Variables**

### 7.1: Backend Environment Variables

1. In Vercel Dashboard, go to your **Backend Project**
2. Click **"Settings"** (top navigation)
3. Click **"Environment Variables"** (left sidebar)
4. Add the following:

**Variable 1:**
- Name: `GEMINI_API_KEY`
- Value: `AIzaSyB9zAMxl0yKe6Mtmwv_H9DMht_JZBb_7HI`
- Environments: Production, Preview, Development
- Click **"Add"**

**Variable 2:**
- Name: `JWT_SECRET`
- Value: `kodbank_super_secret_key_2024_banking_app`
- Environments: Production, Preview, Development
- Click **"Add"**

**Variable 3:**
- Name: `FRONTEND_URL`
- Value: `https://kodbank-xxxxx.vercel.app` (your frontend URL from Step 5.3)
- Environments: Production, Preview, Development
- Click **"Add"**

**Variable 4:**
- Name: `PORT`
- Value: `5000`
- Environments: Production, Preview, Development
- Click **"Add"**

### 7.2: Frontend Environment Variables

1. Go to your **Frontend Project** in Vercel
2. Click **"Settings"**
3. Click **"Environment Variables"**
4. Add one variable:

**Variable:**
- Name: `REACT_APP_API_URL`
- Value: `https://kodbank-backend-xxxxx.vercel.app` (your backend URL from Step 6.3)
- Environments: Production, Preview, Development
- Click **"Add"**

---

## **Step 8: Update API URLs**

### 8.1: Update Frontend Code

Open `frontend/package.json`:

**Find the proxy line and update it:**

**Change from:**
```json
"proxy": "http://localhost:5000",
```

**To:**
```json
"proxy": "http://localhost:5000",
"homepage": "./",
```

### 8.2: Update Axios Calls (Optional)

Open `frontend/src/components/Chatbot.js` and any other files that make API calls.

**Find lines like:**
```javascript
const response = await axios.post(
  '/api/chatbot',
  { message: input },
  { withCredentials: true }
);
```

**These are fine as-is because of the proxy in package.json.**

But for extra safety, you can use environment variable:

```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const response = await axios.post(
  `${API_BASE}/api/chatbot`,
  { message: input },
  { withCredentials: true }
);
```

### 8.3: Redeploy Frontend

1. After making changes, go to PowerShell:

```powershell
cd "c:\Users\kadit\OneDrive\Desktop\kodbank"
git add .
git commit -m "Update API URLs for Vercel deployment"
git push origin main
```

2. Vercel will **automatically redeploy** your frontend in 1-2 minutes.

---

## **Step 9: Test Your Application**

### 9.1: Visit Your Website

1. Open your browser
2. Go to: `https://kodbank-xxxxx.vercel.app` (your frontend URL)
3. You should see the **KodBank login page**

### 9.2: Register Account

1. Click **"Register"**
2. Enter email: `test@example.com`
3. Enter password: `Test123!@#`
4. Click **"Create Account"**

**Wait 2-3 seconds for response from Vercel backend.**

### 9.3: Login

1. Use your credentials to login
2. You should see the **Dashboard**

### 9.4: Test Chatbot

1. Click **💬** button (bottom right)
2. Ask: "What's a checking account?"
3. Wait for Gemini AI response

**If chatbot responds with intelligent answer** ✅ **Everything is working!**

### 9.5: Test Other Features

- **Create account** → Add Account page
- **Transfer money** → Transfer page
- **View transactions** → Transactions page
- **Check balance** → Balance page

All should work!

---

## **Troubleshooting**

### **Issue 1: "Cannot POST /api/chatbot"**

**Cause:** API URL not configured correctly

**Fix:**
1. Go to Vercel → Backend Project → Settings → Environment Variables
2. Make sure `FRONTEND_URL` has your correct frontend domain
3. Click "Redeploy" button on Backend project

### **Issue 2: "CORS Error"**

**Cause:** Origin not whitelisted in backend

**Fix:**
1. Edit `backend/server.js`
2. Add your Vercel frontend URL to `allowedOrigins` array
3. Push to GitHub - Vercel auto-redeploys

### **Issue 3: "Database not found"**

**Cause:** SQLite databases created in `/tmp` (ephemeral in Vercel)

**Fix:** This is expected. For production, you'd need:
- PostgreSQL database (Vercel has free tier)
- Or use MongoDB Atlas (free tier)

For now, databases are created on first run and last for that session.

### **Issue 4: "Chatbot not responding"**

**Cause:** Gemini API key invalid or rate limited

**Fix:**
1. Verify API key in Vercel Environment Variables
2. Check Vercel Backend logs: **Settings → Function Logs**
3. Look for API errors
4. Get a new API key from [aistudio.google.com](https://aistudio.google.com)

### **Issue 5: "502 Bad Gateway"**

**Cause:** Backend is down or timing out

**Fix:**
1. Go to Vercel Dashboard → Backend Project
2. Click **"Deployments"**
3. Check if latest deployment shows green checkmark ✅
4. If red ❌, click to see build logs
5. Fix any errors and push changes

### **Issue 6: "Build failed"**

**Cause:** Missing dependencies or syntax errors

**How to see error:**
1. Vercel Dashboard → Project → Deployments
2. Click the red ❌ deployment
3. Scroll down to see error message
4. Fix the error locally
5. Push to GitHub

---

## **Useful Vercel Commands**

### **Redeploy Manually**

If you need to redeploy without code changes:

1. Vercel Dashboard → Project → Deployments
2. Click "..." on the latest deployment
3. Click **"Redeploy"**

### **View Logs**

To see what's happening on your live app:

1. Vercel Dashboard → Project → Settings
2. Click **"Function Logs"** (for backend)
3. Or check browser console (F12) for frontend errors

### **Check Environment Variables**

1. Vercel Dashboard → Project → Settings
2. Click **"Environment Variables"**
3. Verify all variables are set correctly

---

## **What You Now Have**

After completing this guide:

✅ **Live Frontend:** https://kodbank-xxxxx.vercel.app  
✅ **Live Backend API:** https://kodbank-backend-xxxxx.vercel.app  
✅ **Automatic Deployments:** Every git push auto-deploys  
✅ **Free Hosting:** Both frontend and backend on Vercel free tier  
✅ **Custom Domain:** (Optional - can add later in Vercel settings)  
✅ **AI Chatbot:** Working with Gemini 2.5 API  
✅ **Full Stack:** Banking app accessible worldwide  

---

## **Next Steps (Optional)**

### **Add Custom Domain** (Optional - requires paid domain)
1. Vercel Dashboard → Project Settings → Domains
2. Add your domain (e.g., `mybank.com`)
3. Update DNS records with Vercel

### **Use Real Database** (Optional - for persistent data)
1. Create PostgreSQL database on Vercel
2. Update backend to use PostgreSQL instead of SQLite
3. Redeploy

### **Add SSL Certificate** (Automatic)
Vercel automatically adds HTTPS to your domain!

---

## **Summary**

You now have your complete KodBank application running live on the internet! 🎉

**Share your URL:** `https://kodbank-xxxxx.vercel.app`

Anyone in the world can now:
- Register accounts
- Create bank accounts
- Transfer money
- Chat with AI banking assistant
- View transactions

**Total time to deploy:** 20-30 minutes

---

## **Need Help?**

If you get stuck:
1. Check the **Troubleshooting** section above
2. Check **Vercel Logs** (Settings → Function Logs)
3. Check **Browser Console** (F12 → Console tab)
4. Look for error messages and search online

---

**Congratulations! Your KodBank is now live!** 🏦💰🚀
