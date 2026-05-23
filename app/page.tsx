'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Video, Image as ImageIcon } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('character')

  const tabs = [
    { id: 'character', label: '🎭 Character Studio', icon: '✨' },
    { id: 'image', label: '🖼️ Image Generation', icon: '🎨' },
    { id: 'motion', label: '🎬 Motion Capture', icon: '🎥' },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-neutral-800 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-playfair text-gradient font-bold mb-2">
                  AI Creator Studio
                </h1>
                <p className="text-neutral-400 text-sm tracking-widest uppercase">
                  Professional Content Generation Platform
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-neutral-400">Connected</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-800 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
                whileHover={{ y: -2 }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'character' && <CharacterStudio />}
        {activeTab === 'image' && <ImageGeneration />}
        {activeTab === 'motion' && <MotionCapture />}
      </main>
    </div>
  )
}

function CharacterStudio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-3 gap-8"
    >
      {/* Left: Input Section */}
      <div className="col-span-2 space-y-8">
        <div className="card p-8">
          <div className="section-title">Character Reference</div>
          <div className="border-2 border-dashed border-neutral-700 rounded-lg p-12 text-center hover:border-purple-600/50 transition-colors cursor-pointer">
            <div className="text-5xl mb-4">🎭</div>
            <p className="text-neutral-400 text-sm mb-2">Drag & drop character reference photo</p>
            <p className="text-neutral-500 text-xs">PNG, JPG up to 10MB</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="section-title">Ethnicity</div>
            <div className="space-y-2">
              {['🇮🇩 Indonesian', '🇰🇷 Korean', '🇹🇭 Thai', '🇪🇺 European'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 rounded hover:bg-neutral-800/50 cursor-pointer transition">
                  <input type="radio" name="ethnicity" className="w-4 h-4" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="section-title">Expression</div>
            <div className="space-y-2">
              {['😏 Confident', '😌 Serene', '😊 Playful', '😍 Sultry'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 rounded hover:bg-neutral-800/50 cursor-pointer transition">
                  <input type="radio" name="expression" className="w-4 h-4" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="section-title">Body Measurements</div>
          <div className="grid grid-cols-3 gap-4">
            {['Bust', 'Waist', 'Hip'].map((item) => (
              <div key={item}>
                <label className="text-xs text-neutral-400 mb-2 block">{item}</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="80" className="input-base flex-1 text-sm" />
                  <select className="input-base w-16 text-sm">
                    <option>cm</option>
                    <option>in</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Preview Section */}
      <div className="space-y-6">
        <div className="card-dark p-8">
          <div className="w-full aspect-square bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg flex items-center justify-center mb-6">
            <div className="text-6xl">✨</div>
          </div>
          <div className="space-y-3">
            <div className="bg-neutral-800/50 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">Details</p>
              <p className="text-sm text-neutral-300">0 configured</p>
            </div>
            <button className="w-full btn-primary text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Generate Prompt
            </button>
          </div>
        </div>

        <div className="card-dark p-6">
          <div className="section-title">Prompt Preview</div>
          <div className="bg-neutral-950 rounded p-4 text-xs text-neutral-400 h-40 overflow-y-auto">
            <p>Your prompt will appear here...</p>
          </div>
          <button className="w-full btn-secondary text-xs mt-3">Copy to Clipboard</button>
        </div>
      </div>
    </motion.div>
  )
}

function ImageGeneration() {
  const [generating, setGenerating] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Settings */}
        <div className="col-span-2 space-y-6">
          <div className="card p-8">
            <div className="section-title">AI Model Selection</div>
            <div className="space-y-3">
              {[
                { name: 'Stable Diffusion', status: 'Free', speed: 'Fast' },
                { name: 'Flux', status: 'Free', speed: 'Very Fast' },
                { name: 'Leonardo AI', status: 'Free Tier', speed: 'Medium' },
              ].map((model) => (
                <label key={model.name} className="flex items-center gap-4 p-4 border border-neutral-800 rounded-lg hover:border-purple-600/50 cursor-pointer transition">
                  <input type="radio" name="model" defaultChecked={model.name === 'Stable Diffusion'} className="w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{model.name}</p>
                    <p className="text-xs text-neutral-500">{model.status} • {model.speed}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-8">
            <div className="section-title">Quality Settings</div>
            <div className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Resolution</label>
                <select className="input-base w-full">
                  <option>1024x1024 (Standard)</option>
                  <option>1024x1536 (Portrait)</option>
                  <option>1536x1024 (Landscape)</option>
                </select>
              </div>
              <div>
                <label className="text-sm mb-2 block">Steps (Quality)</label>
                <input type="range" min="20" max="50" defaultValue="30" className="w-full" />
                <p className="text-xs text-neutral-500 mt-1">Higher = better quality, slower</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card-dark p-8 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-6 flex items-center justify-center min-h-80">
            <div className="text-center">
              <div className="text-5xl mb-3">🎨</div>
              <p className="text-sm text-neutral-500">Generated image will appear here</p>
            </div>
          </div>
          <button
            onClick={() => setGenerating(!generating)}
            className={`w-full btn-primary flex items-center justify-center gap-2 ${generating ? 'opacity-75' : ''}`}
            disabled={generating}
          >
            <Zap className="w-4 h-4" />
            {generating ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function MotionCapture() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Upload & Settings */}
        <div className="col-span-2 space-y-6">
          <div className="card p-8">
            <div className="section-title">Upload Video Reference</div>
            <div className="border-2 border-dashed border-neutral-700 rounded-lg p-12 text-center hover:border-purple-600/50 transition-colors cursor-pointer">
              <div className="text-5xl mb-4">🎬</div>
              <p className="text-neutral-400 text-sm mb-2">Drag & drop your video reference</p>
              <p className="text-neutral-500 text-xs">MP4, WebM up to 100MB • Min 1 second, Max 30 seconds</p>
            </div>
          </div>

          <div className="card p-8">
            <div className="section-title">Motion Analysis</div>
            <div className="bg-neutral-950 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-900/50 rounded">
                <span className="text-sm text-neutral-400">Skeleton Detection</span>
                <span className="text-xs text-purple-400">Ready</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-900/50 rounded">
                <span className="text-sm text-neutral-400">Motion Tracking</span>
                <span className="text-xs text-neutral-500">Upload video first</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-900/50 rounded">
                <span className="text-sm text-neutral-400">Frame Count</span>
                <span className="text-xs text-neutral-500">-</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="card-dark p-8 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-6 flex items-center justify-center min-h-80">
            <div className="text-center">
              <Video className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">Video preview</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <Video className="w-4 h-4" />
              Analyze Motion
            </button>
            <button className="w-full btn-secondary text-sm">
              Generate Motion Video
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
