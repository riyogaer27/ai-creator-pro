-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  role VARCHAR(50) DEFAULT 'member',
  subscription VARCHAR(50) DEFAULT 'free',
  is_paid BOOLEAN DEFAULT FALSE,
  plan_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Character Templates
CREATE TABLE IF NOT EXISTS character_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  character_ref_image_url TEXT,
  measurements JSONB,
  ethnicity VARCHAR(100),
  expression VARCHAR(100),
  hair_style VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Generated Images
CREATE TABLE IF NOT EXISTS generated_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  character_template_id UUID REFERENCES character_templates(id) ON DELETE SET NULL,
  prompt TEXT,
  image_url TEXT,
  model VARCHAR(50),
  generation_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Motion Captures
CREATE TABLE IF NOT EXISTS motion_captures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_url TEXT,
  motion_data JSONB,
  motion_prompt TEXT,
  detected_motions TEXT[],
  key_points JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Usage tracking (untuk limit free tier)
CREATE TABLE IF NOT EXISTS usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100), -- 'image_generation', 'motion_capture', 'character_save'
  tokens_used INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pricing plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100),
  price DECIMAL(10, 2),
  credits INTEGER,
  features JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments/Transactions
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES pricing_plans(id),
  amount DECIMAL(10, 2),
  currency VARCHAR(10) DEFAULT 'IDR',
  status VARCHAR(50), -- 'pending', 'success', 'failed'
  payment_method VARCHAR(50), -- 'midtrans', 'stripe'
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Insert default pricing plans
INSERT INTO pricing_plans (name, price, credits, features) VALUES
('Starter', 199000, 100, '{"image_generation": 50, "motion_capture": 10, "characters": 5}'::jsonb),
('Premium', 499000, 300, '{"image_generation": 200, "motion_capture": 50, "characters": 20, "priority_support": true}'::jsonb),
('Enterprise', 999000, 1000, '{"image_generation": 1000, "motion_capture": 200, "characters": 100, "priority_support": true, "api_access": true}'::jsonb);

-- RLS Policies (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE motion_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Character templates - users see own + shared
CREATE POLICY "Users can view own characters" ON character_templates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own characters" ON character_templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own characters" ON character_templates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own characters" ON character_templates
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies untuk generated_images, motion_captures, usage_log, payments
