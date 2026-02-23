# 🚀 QUICK REFERENCE CARD

## 📍 Where to Add Gemini API Key

### Location: `backend/.env`

**File Path:**
```
c:\Users\kadit\OneDrive\Desktop\kodbank\backend\.env
```

**Current Content:**
```env
PORT=5000
JWT_SECRET=kodbank_super_secret_key_2024_banking_app
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

**Action:** Replace `your_gemini_api_key_here` with your actual key

---

## 🔑 How to Get API Key

**Step 1:** Open in browser:
```
https://aistudio.google.com/app/apikey
```

**Step 2:** Click "Create API Key"

**Step 3:** Copy the generated key

**Step 4:** Paste in `.env` file

**Example (REAL FORMAT):**
```env
GEMINI_API_KEY=AIzaSyDx-TBxrVmHvmJ5Q1p9MzWlBvJ_KdHf8Y0
```

---

## ✨ Changes Made

### 1. Sidebar (Collapsible)
- **File:** `frontend/src/index.css`
- **Change:** Sidebar now hides and shows on hover
- **Benefit:** Full screen space for content
- **How:** Move mouse to left edge → sidebar slides out

### 2. Chatbot (Gemini AI)
- **File:** `backend/server.js`
- **Change:** Uses Google Gemini 2.5 Pro API
- **Benefit:** Intelligent, natural responses
- **How:** API key in .env → Chatbot gets smart!

### 3. Dependencies
- **File:** `backend/package.json`
- **Change:** Added `@google/generative-ai`
- **Install:** `npm install` (automatic)

---

## 🎯 Complete Setup (8 minutes)

### Step 1: Get API Key (2 min)
```
https://aistudio.google.com/app/apikey
→ Create API Key
→ Copy key
```

### Step 2: Add Key to .env (1 min)
```
Open: backend/.env
Replace: your_gemini_api_key_here
With: Your actual key from Step 1
Save.
```

### Step 3: Install Dependencies (2 min)
```bash
cd backend
npm install
```

### Step 4: Start Backend (1 min)
```bash
node server.js
# Should show: ✓ Running on port 5000
```

### Step 5: Start Frontend (1 min)
**In a new terminal:**
```bash
cd frontend
npm start
# Opens http://localhost:3000
```

### Step 6: Test (1 min)
- Register → Login
- Click 💬 button
- Ask: "How do I transfer?"
- See AI response ✅

---

## 📋 Files Modified

| File | Change |
|------|--------|
| `backend/.env` | Added GEMINI_API_KEY |
| `backend/server.js` | Added Gemini initialization + endpoint |
| `backend/package.json` | Added @google/generative-ai |
| `frontend/src/index.css` | Made sidebar collapsible |

---

## ❌ Common Mistakes to Avoid

### ❌ DON'T:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
(Leave placeholder - chatbot won't work)

### ✅ DO:
```env
GEMINI_API_KEY=AIzaSyDx-TBxrVmHvmJ5Q1p9MzWlBvJ_KdHf8Y0
```
(Use actual key from aistudio.google.com)

---

### ❌ DON'T:
```bash
npm install
# (in wrong folder - frontend)
```

### ✅ DO:
```bash
cd backend
npm install
# (in backend folder)
```

---

### ❌ DON'T:
```
Leave .env file unchanged
```

### ✅ DO:
```
Update GEMINI_API_KEY with your key
Save the file
```

---

## 🎓 How It Works

```
User: "How do I open an account?"
         ↓
Chatbot sends to backend
         ↓
Backend checks .env for GEMINI_API_KEY
         ↓
If found:
  → Send to Gemini 2.5 Pro
  → Get intelligent response
  ↓
If not found:
  → Use simple fallback response
         ↓
Send response to user
         ↓
User: "Thanks!" ✅
```

---

## 🔒 Security Notes

- ✅ API key should be in `.env`
- ✅ `.env` is in `.gitignore` (won't leak)
- ✅ Keep API key private
- ✅ Never push `.env` to GitHub
- ✅ For production: Add key to hosting platform

---

## 🆘 Troubleshooting

| Problem | Fix |
|---------|-----|
| "Module not found" | `cd backend && npm install` |
| Chatbot doesn't respond | Check GEMINI_API_KEY in .env |
| "Invalid API key" | Get new key from aistudio.google.com |
| Sidebar won't slide | Refresh browser (Ctrl+F5) |
| Backend won't start | Check port 5000 is free |
| Can't connect frontend | Backend must be running |

---

## ⏱️ Estimated Time

| Task | Time |
|------|------|
| Get API key | 2 min |
| Update .env | 1 min |
| npm install | 2 min |
| Start backend | 1 min |
| Start frontend | 1 min |
| Test chatbot | 1 min |
| **TOTAL** | **~8 min** |

---

## 📞 Quick Links

- **Get API Key:** https://aistudio.google.com/app/apikey
- **Gemini Docs:** https://ai.google.dev/docs
- **API Pricing:** https://ai.google.dev/pricing
- **Setup Guide:** See GEMINI_API_SETUP.md

---

## ✅ Verification

After setup, check:
- [ ] `backend/.env` has GEMINI_API_KEY
- [ ] Backend started (`node server.js`)
- [ ] Frontend started (`npm start`)
- [ ] Chatbot button visible (💬)
- [ ] Can chat with bot
- [ ] Sidebar hides/shows on hover

---

## 🎉 Done!

Your KodBank now has:

✅ Collapsible sidebar (more space)
✅ Gemini 2.5 chatbot (smart responses)
✅ Full banking features (accounts, transfers, etc.)
✅ Beautiful design (glassmorphism UI)

**Happy banking! 🏦💰**

---

## 📚 Documentation Files

1. **SETUP_COMPLETE.md** ← Detailed checklist
2. **GEMINI_API_SETUP.md** ← Complete API guide
3. **VISUAL_UPDATES.md** ← See how it changed
4. **README.md** ← Full documentation
5. **QUICKSTART.md** ← 5-minute guide

---

**Keep this card handy! 📌**
