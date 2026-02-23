# 🤖 Gemini 2.5 API Integration Guide

## 📋 Overview

KodBank now integrated with **Google Gemini 2.5 Pro API** for intelligent banking chatbot responses. This guide walks you through getting and configuring the API key.

---

## 🔑 Step 1: Get Your Gemini API Key

### Option A: Get Free API Key (Recommended)

1. **Visit Google AI Studio**
   - Go to: https://aistudio.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Choose "Create API key in new project" OR existing project
   - Copy the generated API key
   - ✅ You now have a free API key!

### Option B: Setup with Google Cloud

If you need advanced features:
1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable "Generative Language API"
4. Create API key from credentials
5. Use the key in KodBank

---

## 🔧 Step 2: Add API Key to KodBank

### Location: `backend/.env` file

Open the file: `backend/.env`

```env
PORT=5000
JWT_SECRET=kodbank_super_secret_key_2024_banking_app
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

### Replace `your_gemini_api_key_here` with your actual API key:

```env
GEMINI_API_KEY=AIzaSyDx-abc123XyZ_your_actual_key_here
```

✅ **That's it!** Save the file.

---

## 📦 Step 3: Install Dependencies

The Gemini package needs to be installed:

```bash
cd backend
npm install
```

This will install `@google/generative-ai` package (already added to package.json)

---

## 🚀 Step 4: Start the Server

```bash
node server.js
```

You should see:
```
✓ Connected to KodBankAuth.db
✓ Connected to KodBank.db
✓ Database tables initialized
🏦 KodBank Backend Server
✓ Running on port 5000
```

---

## ✨ Step 5: Test the Chatbot

1. **Start frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Register and login**

3. **Click the 💬 chatbot button** (bottom right)

4. **Ask banking questions**:
   - "How do I create an account?"
   - "How do I transfer money?"
   - "Is KodBank secure?"
   - "What's my account balance?"

✅ The chatbot now uses **Gemini 2.5 Pro** for intelligent responses!

---

## 🤖 What the Chatbot Can Do

With Gemini 2.5 API integrated:

✅ **Smart Responses**
- Understands context
- Natural language processing
- Contextual banking advice
- Real conversations

✅ **Banking-Focused**
- Account management help
- Transfer guidance
- Security information
- Balance inquiries
- Feature explanations

✅ **Always Available**
- 24/7 assistance
- No response limits (within API usage)
- Professional tone
- Helpful suggestions

---

## 📊 API Usage & Pricing

### Free Tier (Gemini API)
- ✅ 15 requests per minute
- ✅ 1.5M tokens per day
- ✅ Perfect for personal/small projects
- ✅ No credit card required initially

### Paid Tier
- More requests per minute
- More tokens per day
- Pay only for what you use
- See https://ai.google.dev/pricing for details

---

## ⚙️ Configuration Details

### In `backend/.env`:
```env
GEMINI_API_KEY=your_key_here
```

### In `backend/server.js`:
The chatbot endpoint is configured to:
1. Check if API key is available
2. Use Gemini 2.5 Pro if key is configured
3. Fall back to simple responses if not

### Fallback Mode
If you **don't** add an API key:
- Chatbot still works
- Uses pre-programmed responses
- No AI, but functional

---

## 🔒 Security Notes

### Important!
- ✅ API key is in `.env` (not in git)
- ✅ `.gitignore` excludes `.env` file
- ✅ Never commit API key to GitHub
- ✅ Keep key private and secure

### .env file is ignored:
```
# backend/.gitignore includes:
.env
.env.local
.env.development
```

---

## 🐛 Troubleshooting

### "Gemini module not found"
```bash
cd backend
npm install @google/generative-ai
```

### "API key is invalid"
- Copy the **full** API key from aistudio.google.com
- Verify no spaces before/after
- Check you're using the correct key

### "Chatbot not responding"
- Check `.env` file exists in `backend/` folder
- Check `GEMINI_API_KEY=` has a value
- Check backend is running on port 5000
- Check CORS is allowed (frontend on 3000)

### "403 Forbidden Error"
- API key may be expired or invalid
- Generate a new one from aistudio.google.com
- Update `.env` with new key
- Restart backend server

### "Quota exceeded"
- Free tier has 15 requests/minute limit
- Wait a minute or upgrade to paid tier
- See https://ai.google.dev/pricing

---

## 📝 Quick Reference

| Item | Value |
|------|-------|
| **Model** | Gemini 2.5 Pro |
| **API Provider** | Google AI |
| **Config File** | `backend/.env` |
| **Key Variable** | `GEMINI_API_KEY` |
| **Get Key** | https://aistudio.google.com/app/apikey |
| **Endpoint** | `POST /api/chatbot` |
| **Free Limits** | 15 req/min, 1.5M tokens/day |

---

## 🎯 Frontend Chatbot Code (No Changes Needed)

The frontend chatbot component already calls the backend correctly:

```javascript
// frontend/src/components/Chatbot.js
const response = await axios.post(
  '/api/chatbot',
  { message: input },
  { withCredentials: true }
);
```

This automatically uses Gemini when API key is configured! ✅

---

## 🚀 Production Deployment

### When Deploying:

1. **Add environment variable** to your hosting platform:
   - Platform: Heroku, Railway, Vercel, DigitalOcean, etc.
   - Variable: `GEMINI_API_KEY`
   - Value: Your API key

2. **Example for Heroku**:
   ```bash
   heroku config:set GEMINI_API_KEY=your_key_here
   ```

3. **Example for Railway**:
   - Add variable in Railway dashboard
   - Key: `GEMINI_API_KEY`
   - Value: Your API key

4. **Example for DigitalOcean**:
   - Add to App Platform environment variables
   - Key: `GEMINI_API_KEY`
   - Value: Your API key

---

## ✅ Verification Checklist

- [ ] Google account created
- [ ] API key generated from aistudio.google.com
- [ ] API key copied
- [ ] `backend/.env` file updated with key
- [ ] `npm install` run in backend folder
- [ ] Backend server started with `node server.js`
- [ ] Frontend started with `npm start`
- [ ] Logged into KodBank
- [ ] Chatbot button clicked 💬
- [ ] Asked a question
- [ ] Received intelligent response ✅

---

## 📚 Additional Resources

- **Google AI Studio**: https://aistudio.google.com
- **Gemini API Docs**: https://ai.google.dev/docs
- **API Pricing**: https://ai.google.dev/pricing
- **System Prompts Doc**: https://ai.google.dev/docs/system-instructions

---

## 🎓 How It Works

```
User asks question
    ↓
Frontend sends to backend /api/chatbot
    ↓
Backend checks GEMINI_API_KEY in .env
    ↓
If key exists → Call Gemini 2.5 Pro API
    ↓
Gemini processes with system prompt:
"You are KodBank AI, a professional banking assistant..."
    ↓
Receive intelligent response
    ↓
Send response back to frontend
    ↓
Display in chatbot window
    ↓
User sees answer ✅
```

---

## 💡 Pro Tips

✅ **System Prompt Customization**
- Edit `backend/server.js` in the chatbot route
- Change the `systemPrompt` variable to customize behavior
- Add specific banking rules or guidelines

✅ **Rate Limiting**
- Free tier: 15 requests/minute
- Space out requests or upgrade plan
- Consider caching common questions

✅ **Error Handling**
- Chatbot falls back to simple mode on API error
- User never sees broken chatbot
- Backend logs errors for debugging

---

## 🎉 You're All Set!

Your KodBank chatbot now has:
- ✅ Google Gemini 2.5 Pro integration
- ✅ Intelligent, contextual responses
- ✅ Natural language understanding
- ✅ Professional banking assistance
- ✅ 24/7 availability

**Happy banking with Gemini AI! 🚀**

---

**Questions?** Check the docs or revisit this guide!
