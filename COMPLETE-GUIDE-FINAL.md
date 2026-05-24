# 🎯 PANDUAN SUPER LENGKAP - Copy Paste Aja!

## ✅ Yang Kamu Perlu Lakukan (HANYA 3 STEP!)

### **STEP 1: Download File-File FINAL dari Output**

Download 5 file ini:
1. `layout-FINAL.tsx`
2. `supabase-FINAL.ts`
3. `dashboard-page-FINAL.tsx`
4. `.env.local`
5. `auth-context.tsx`
6. `login-page.tsx`
7. `protected-route.tsx`
8. `prompt-generator.ts`
9. `supabase-setup.sql`

---

### **STEP 2: Copy ke Folder Project - EKSAK Sesuai Di Bawah**

**Buka folder project kamu:**
```
C:\Users\lenovo\OneDrive\Desktop\FAKEINFLUENCER\ai-creator-pro\
```

**Copy file-file ini (REPLACE yang lama!):**

```
layout-FINAL.tsx 
  → RENAME jadi layout.tsx
  → COPY KE: app/layout.tsx
  ⚠️ HAPUS file layout.tsx yang lama dulu!

dashboard-page-FINAL.tsx 
  → RENAME jadi page.tsx
  → COPY KE: app/dashboard/page.tsx
  ⚠️ Buat folder 'dashboard' dulu kalau belum ada!

supabase-FINAL.ts
  → RENAME jadi supabase.ts
  → COPY KE: lib/supabase.ts
  ⚠️ REPLACE file supabase.ts yang lama!

.env.local
  → COPY KE: . (root folder - sebelah package.json)

auth-context.tsx
  → COPY KE: lib/auth-context.tsx
  ⚠️ Folder 'lib' harus sudah ada!

protected-route.tsx
  → COPY KE: lib/protected-route.tsx

prompt-generator.ts
  → COPY KE: lib/prompt-generator.ts
```

**Buat 2 file BARU ini (copy-paste kode di bawah):**

**File: `app/page.tsx` (BARU - ganti yang lama!)**
```tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [isLoggedIn, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-600"></div>
    </div>
  )
}
```

**File: `app/login/page.tsx` (BARU!)**
Gunakan file `login-page.tsx` yang sudah didownload, rename jadi `page.tsx`, copy ke `app/login/`

**File: `app/pricing/page.tsx` (BARU!)**
```tsx
'use client'

import { useAuth } from '@/lib/auth-context'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const { isAdmin } = useAuth()

  const plans = [
    {
      name: 'Starter',
      price: '199.000',
      credits: 100,
      features: [
        '50 Image Generation',
        '10 Motion Captures',
        '5 Characters',
        'Email Support',
      ],
    },
    {
      name: 'Premium',
      price: '499.000',
      credits: 300,
      features: [
        '200 Image Generation',
        '50 Motion Captures',
        '20 Characters',
        'Priority Support',
        'API Access',
      ],
    },
    {
      name: 'Enterprise',
      price: '999.000',
      credits: 1000,
      features: [
        '1000 Image Generation',
        '200 Motion Captures',
        '100 Characters',
        '24/7 Priority Support',
        'Full API Access',
        'Custom Integration',
      ],
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair text-gradient font-bold mb-4">
            Pricing Plans
          </h1>
          <p className="text-neutral-400">
            Pilih plan yang sesuai dengan kebutuhan kamu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-8 hover:border-purple-600/50 transition-all"
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Rp {plan.price}</span>
                <span className="text-neutral-400 text-sm">/month</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full btn-primary">
                {isAdmin ? 'Set as Default' : 'Subscribe Now'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

### **STEP 3: Setup Supabase + Deploy (Follow ini)**

**A. Setup Supabase (5 menit)**
1. Buka: https://supabase.com/dashboard
2. Pilih project: fjhqhpktgqomoeyfekcr
3. Klik: SQL Editor → New Query
4. Copy-paste isi file `supabase-setup.sql`
5. Klik: Run

**B. Test Locally (5 menit)**
```bash
cd C:\Users\lenovo\OneDrive\Desktop\FAKEINFLUENCER\ai-creator-pro

npm install
npm run dev
```

**C. Login Test**
- URL: http://localhost:3000
- Email: `admin`
- Password: `admin123`
- Klik Login → Harusnya masuk dashboard ✅

**D. Push ke GitHub (5 menit)**
```bash
git add .
git commit -m "complete: all features integrated and ready"
git push
```

**E. Setup Netlify Env (5 menit)**
1. https://app.netlify.com
2. Pilih site: phenomenal-narwhal-cbb368
3. Settings → Build & Deploy → Environment
4. Add semua variables dari `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL = https://fjhqhpktgqomoeyfekcr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
HUGGINGFACE_API_KEY = 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
NEXT_PUBLIC_ADMIN_PASSWORD = admin123
NEXT_PUBLIC_JWT_SECRET = your-super-secret-key-change-this
```

**F. Deploy! (2 menit)**
1. Klik: Trigger Deploy → Deploy site
2. Tunggu sampai "Published"
3. Buka: https://phenomenal-narwhal-cbb368.netlify.app

---

## 📁 Final Folder Structure (Setelah Selesai)

```
ai-creator-pro/
├── app/
│   ├── api/
│   │   ├── generate-image/route.ts          ✅ (sudah ada)
│   │   └── analyze-motion/route.ts          ✅ (sudah ada)
│   ├── login/
│   │   └── page.tsx                         ✨ NEW
│   ├── pricing/
│   │   └── page.tsx                         ✨ NEW
│   ├── dashboard/
│   │   └── page.tsx                         ✨ NEW (rename dari page.tsx)
│   ├── layout.tsx                           🔄 UPDATED
│   ├── page.tsx                             ✨ NEW (redirect page)
│   └── globals.css                          ✅ (sudah ada)
├── lib/
│   ├── supabase.ts                          🔄 UPDATED
│   ├── auth-context.tsx                     ✨ NEW
│   ├── protected-route.tsx                  ✨ NEW
│   └── prompt-generator.ts                  ✨ NEW
├── .env.local                               ✨ NEW
├── package.json                             ✅ (sudah ada)
├── tailwind.config.ts                       ✅ (sudah ada)
├── tsconfig.json                            ✅ (sudah ada)
├── next.config.js                           ✅ (sudah ada)
└── netlify.toml                             ✅ (sudah ada)
```

---

## ✅ Checklist Sebelum Deploy

- [ ] Folder `lib/` ada semua file: supabase.ts, auth-context.tsx, protected-route.tsx, prompt-generator.ts
- [ ] `.env.local` ada di root (sebelah package.json)
- [ ] `app/layout.tsx` sudah pake AuthProvider
- [ ] `app/page.tsx` adalah redirect page
- [ ] `app/dashboard/page.tsx` adalah dashboard utama
- [ ] `app/login/page.tsx` ada
- [ ] `app/pricing/page.tsx` ada
- [ ] `npm install` sudah jalan
- [ ] `npm run dev` bisa run
- [ ] Login dengan admin/admin123 bisa
- [ ] Git push sudah
- [ ] Env vars di Netlify sudah diset

---

## 🎯 Kalo Bingung

**Q: File mana yang di-replace?**
A: `app/layout.tsx` dan `lib/supabase.ts`

**Q: File mana yang baru?**
A: `app/page.tsx`, `app/login/page.tsx`, `app/pricing/page.tsx`, `lib/auth-context.tsx`, `lib/protected-route.tsx`, `lib/prompt-generator.ts`, `.env.local`

**Q: Folder mana yang perlu dibuat?**
A: `app/login/`, `app/pricing/`, `app/dashboard/`, `lib/`

**Q: Kapan setup Supabase?**
A: STEP 3.A (sebelum npm run dev)

---

## 🚀 Done! Website kamu siap!

✅ Admin login (admin/admin123)
✅ Image generation dengan HuggingFace
✅ Motion capture dari video
✅ Character studio dengan prompt generator
✅ Pricing page
✅ Beautiful UI dengan animations
✅ Supabase database integration
✅ Deployed ke Netlify

**Sekarang tinggal execute STEP 1, 2, 3! 💪**
