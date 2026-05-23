# AI Creator Studio Pro 🚀

Professional AI content creation platform dengan character consistency, image generation, dan motion capture.

## ✨ Features

### 🎭 Character Studio
- Upload & manage character references
- Body measurements tracking (bust, waist, hip, etc)
- Ethnicity & expression selection
- Generate optimized prompts for AI tools

### 🖼️ Image Generation
- Free AI models (Stable Diffusion, Flux, Leonardo AI)
- Real-time image preview
- Quality settings & resolution options
- One-click download

### 🎬 Motion Capture
- Upload video references
- Analyze motion & skeleton detection
- Extract motion data
- Generate motion-based prompts
- Apply motion to characters

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 + React 18 + TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Image Gen:** Hugging Face API (Stable Diffusion, Flux)
- **Deployment:** Netlify
- **Motion Analysis:** MediaPipe (JS)

## 📋 Prerequisites

1. **Netlify Account** (for hosting)
2. **Supabase Account** (for database)
3. **HuggingFace Account** (for free image generation)

All completely FREE! 🎉

## 🚀 Quick Start

### 1. Clone & Setup Locally

```bash
# Clone repo
git clone [your-repo-url]
cd ai-creator-pro

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

### 2. Get API Keys (All FREE!)

#### Supabase (Database)
1. Go to https://supabase.com
2. Sign up / Log in with GitHub
3. Create new project (FREE tier)
4. Go to Settings → API
5. Copy `Project URL` and `anon key`
6. Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

#### HuggingFace (Image Generation)
1. Go to https://huggingface.co
2. Sign up / Log in
3. Create new token: https://huggingface.co/settings/tokens
4. Copy token
5. Add to `.env.local`:
```
HUGGINGFACE_API_KEY=your_token
```

### 3. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000 🎉

## 🌐 Deploy to Netlify

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to https://netlify.com
3. Click "Import an existing project"
4. Connect GitHub & select your repo
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `HUGGINGFACE_API_KEY`
6. Click Deploy!
7. Auto-deploys on every push to main ✅

### Option 2: Netlify CLI

```bash
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --build
```

## 📁 Project Structure

```
ai-creator-pro/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   ├── globals.css         # Global styles
│   ├── api/
│   │   ├── generate-image/ # Image generation API
│   │   └── analyze-motion/ # Motion capture API
│
├── components/             # Reusable components
├── lib/                    # Utilities & clients
├── public/                 # Static assets
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔧 Configuration

### Supabase Database Schema

Create these tables in Supabase:

```sql
-- Users (auto-created by Supabase Auth)

-- Character Templates
CREATE TABLE character_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  name VARCHAR(255),
  character_ref_image_url TEXT,
  measurements JSONB,
  ethnicity TEXT,
  expression TEXT,
  hair_style TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated Images
CREATE TABLE generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  prompt TEXT,
  image_url TEXT,
  model VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Motion Captures
CREATE TABLE motion_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  video_url TEXT,
  motion_data JSONB,
  motion_prompt TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.ts` and `app/globals.css`

### Add New Features
1. Create new component in `components/`
2. Add API route in `app/api/`
3. Integrate with Supabase as needed

## 📚 API Routes

### POST `/api/generate-image`
Generate image from prompt
```json
{
  "prompt": "woman standing confidently...",
  "model": "stable-diffusion"
}
```

### POST `/api/analyze-motion`
Analyze video motion
```
multipart/form-data
- video: File
```

## 🆓 Free Tier Limits

| Service | Free Limit | Workaround |
|---------|-----------|-----------|
| Supabase | 500MB | Sufficient for most use cases |
| HuggingFace | Rate-limited | 30+ requests/hour usually enough |
| Netlify | 300 build minutes/month | Plenty for most projects |
| Next.js | Unlimited | Deploy on Netlify |

## 🐛 Troubleshooting

### "API Key not found"
- Check `.env.local` exists
- Verify all keys are correct
- Restart dev server: `npm run dev`

### "Supabase connection failed"
- Check SUPABASE_URL and ANON_KEY
- Ensure Supabase project is active
- Check network connectivity

### "Image generation too slow"
- HuggingFace free tier has rate limits
- Wait a few seconds between requests
- Consider upgrading to paid tier

## 📖 Documentation

- [Next.js Docs](https://nextjs.org)
- [Supabase Docs](https://supabase.com/docs)
- [HuggingFace API](https://huggingface.co/docs/api-inference)
- [Tailwind CSS](https://tailwindcss.com)

## 📝 License

MIT License - feel free to use commercially!

## 💬 Support

For issues or questions:
1. Check troubleshooting section
2. Review component code comments
3. Check API route implementations
4. Refer to framework documentation

## 🚀 Future Features

- [ ] Video generation (Runway, Pika)
- [ ] Advanced motion interpolation
- [ ] Template marketplace
- [ ] Batch generation
- [ ] Cloud storage optimization
- [ ] Analytics dashboard

---

**Made with ❤️ for content creators**
