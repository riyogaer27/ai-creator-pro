'use client'

import { useState, useRef, useCallback } from 'react'
import { Sparkles, Zap, Video } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('character')
  const { user, logout, isAdmin } = useAuth()
  const router = useRouter()

  const tabs = [
    { id: 'character', label: '🎭 Character Studio', icon: '✨' },
    { id: 'image', label: '🖼️ Image Generation', icon: '🎨' },
    { id: 'motion', label: '🎬 Motion Capture', icon: '🎥' },
  ]

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-playfair text-gradient font-bold mb-2">
                AI Creator Studio
              </h1>
              <p className="text-neutral-400 text-sm tracking-widest uppercase">
                Professional Content Generation Platform
              </p>
            </div>
            <div className="text-right space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-neutral-400">Connected</span>
              </div>
              <div className="flex gap-2">
                {isAdmin && (
                  <button onClick={() => router.push('/pricing')} className="btn-secondary text-xs">
                    Pricing
                  </button>
                )}
                <button onClick={handleLogout} className="btn-secondary text-xs">
                  Logout ({user?.email})
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{ cursor: 'pointer' }}
                className={`px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-400'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'character' && <CharacterStudio />}
        {activeTab === 'image' && <ImageGeneration />}
        {activeTab === 'motion' && <MotionCapture />}
      </main>
    </div>
  )
}

function CharacterStudio() {
  const [ethnicity, setEthnicity] = useState('')
  const [expression, setExpression] = useState('')
  const [bust, setBust] = useState('')
  const [waist, setWaist] = useState('')
  const [hip, setHip] = useState('')
  const [prompt, setPrompt] = useState('')
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => setReferenceImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const generatePrompt = () => {
    const parts: string[] = []
    if (ethnicity) parts.push(ethnicity)
    if (expression) parts.push(expression)
    if (bust && waist && hip) parts.push(`measurements: ${bust}-${waist}-${hip}cm`)
    const generated = parts.length > 0
      ? `Beautiful woman, ${parts.join(', ')}, professional photo, 4k, detailed`
      : 'Beautiful woman, professional photo, 4k'
    setPrompt(generated)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt)
    alert('Prompt copied to clipboard!')
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-8">
        <div className="card p-8">
          <div className="section-title">Character Reference</div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-purple-500 bg-purple-600/10' : 'border-neutral-700 hover:border-purple-600/50'
            }`}
          >
            {referenceImage ? (
              <img src={referenceImage} alt="Reference" className="max-h-48 mx-auto rounded-lg object-cover" />
            ) : (
              <>
                <div className="text-5xl mb-4">🎭</div>
                <p className="text-neutral-400 text-sm mb-2">
                  {isDragging ? 'Drop image here!' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-neutral-500 text-xs">PNG, JPG up to 10MB</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
          {referenceImage && (
            <button onClick={() => setReferenceImage(null)} className="mt-3 text-xs text-neutral-500 hover:text-red-400 transition-colors">
              Remove image
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="section-title">Ethnicity</div>
            <div className="space-y-2">
              {['Indonesian', 'Korean', 'Thai', 'European'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 rounded hover:bg-neutral-800/50 cursor-pointer transition">
                  <input type="radio" name="ethnicity" value={item} checked={ethnicity === item} onChange={(e) => setEthnicity(e.target.value)} className="w-4 h-4" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="section-title">Expression</div>
            <div className="space-y-2">
              {['Confident', 'Serene', 'Playful', 'Sultry'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 rounded hover:bg-neutral-800/50 cursor-pointer transition">
                  <input type="radio" name="expression" value={item} checked={expression === item} onChange={(e) => setExpression(e.target.value)} className="w-4 h-4" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="section-title">Body Measurements</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Bust', value: bust, setValue: setBust },
              { label: 'Waist', value: waist, setValue: setWaist },
              { label: 'Hip', value: hip, setValue: setHip },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-xs text-neutral-400 mb-2 block">{item.label}</label>
                <input type="number" placeholder="80" value={item.value} onChange={(e) => item.setValue(e.target.value)} className="input-base w-full text-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card-dark p-8">
          <div className="w-full aspect-square bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg flex items-center justify-center mb-6">
            <div className="text-6xl">✨</div>
          </div>
          <div className="space-y-3">
            <div className="bg-neutral-800/50 rounded p-3">
              <p className="text-xs text-neutral-500 mb-1">Details</p>
              <p className="text-sm text-neutral-300">{[ethnicity, expression].filter(Boolean).length} configured</p>
            </div>
            <button type="button" onClick={generatePrompt} className="w-full btn-primary text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Prompt
            </button>
          </div>
        </div>

        <div className="card-dark p-6">
          <div className="section-title">Prompt Preview</div>
          <div className="bg-neutral-950 rounded p-4 text-xs text-neutral-400 h-40 overflow-y-auto">
            <p>{prompt || 'Your prompt will appear here...'}</p>
          </div>
          <button type="button" onClick={copyToClipboard} disabled={!prompt} className="w-full btn-secondary text-xs mt-3 disabled:opacity-50">
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  )
}

function ImageGeneration() {
  const [generating, setGenerating] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('stable-diffusion')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) { setError('Please enter a prompt'); return }
    setGenerating(true)
    setError('')
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate image')
      setGeneratedImage(data.image)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="card p-8">
            <div className="section-title">AI Model Selection</div>
            <div className="space-y-3">
              {[
                { name: 'Stable Diffusion', id: 'stable-diffusion', status: 'Free', speed: 'Fast' },
                { name: 'Flux', id: 'flux', status: 'Free', speed: 'Very Fast' },
                { name: 'Leonardo AI', id: 'leonardo-ai', status: 'Free Tier', speed: 'Medium' },
              ].map((m) => (
                <label key={m.id} className="flex items-center gap-4 p-4 border border-neutral-800 rounded-lg hover:border-purple-600/50 cursor-pointer transition">
                  <input type="radio" name="model" value={m.id} checked={model === m.id} onChange={(e) => setModel(e.target.value)} className="w-4 h-4" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-neutral-500">{m.status} • {m.speed}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-8">
            <div className="section-title">Your Prompt</div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the image you want to generate..." className="input-base w-full h-32 resize-none" />
            {error && <p className="text-sm text-red-400 mt-2">❌ {error}</p>}
          </div>
        </div>

        <div className="card-dark p-8 flex flex-col">
          {generatedImage ? (
            <>
              <img src={generatedImage} alt="Generated" className="w-full rounded-lg mb-6 max-h-80 object-cover" />
              <a href={generatedImage} download="generated-image.png" className="w-full btn-secondary text-sm mb-2 text-center block">⬇️ Download Image</a>
            </>
          ) : (
            <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-6 flex items-center justify-center min-h-80">
              <div className="text-center">
                <div className="text-5xl mb-3">🎨</div>
                <p className="text-sm text-neutral-500">{generating ? 'Generating...' : 'Generated image will appear here'}</p>
              </div>
            </div>
          )}
          <button type="button" onClick={handleGenerate} disabled={generating} className={`w-full btn-primary flex items-center justify-center gap-2 ${generating ? 'opacity-75' : ''}`}>
            <Zap className="w-4 h-4" />
            {generating ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
      </div>
    </div>
  )
}

function MotionCapture() {
  const [analyzing, setAnalyzing] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [motionData, setMotionData] = useState<any>(null)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('video/')) { setError('Please select a video file'); return }
    setVideoFile(file)
    setError('')
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const handleAnalyze = async () => {
    if (!videoFile) { setError('Please select a video file'); return }
    setAnalyzing(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('video', videoFile)
      const response = await fetch('/api/analyze-motion', { method: 'POST', body: formData })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to analyze motion')
      setMotionData(data.motion)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="card p-8">
            <div className="section-title">Upload Video Reference</div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-purple-500 bg-purple-600/10' : 'border-neutral-700 hover:border-purple-600/50'
              }`}
            >
              <div className="text-5xl mb-4">🎬</div>
              <p className="text-neutral-400 text-sm mb-2">{isDragging ? 'Drop video here!' : 'Click to select or drag & drop your video'}</p>
              <p className="text-neutral-500 text-xs">MP4, WebM up to 100MB</p>
              <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
            {videoFile && <p className="text-sm text-green-400 mt-4">✅ Selected: {videoFile.name}</p>}
            {error && <p className="text-sm text-red-400 mt-4">❌ {error}</p>}
          </div>

          {motionData && (
            <div className="card p-8">
              <div className="section-title">Motion Analysis Results</div>
              <div className="bg-neutral-950 rounded-lg p-6 space-y-4">
                {motionData.detectedMotions?.map((motion: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-neutral-900/50 rounded">
                    <span className="text-sm text-neutral-400">{motion}</span>
                    <span className="text-xs text-purple-400">Detected</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card-dark p-8 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg mb-6 flex items-center justify-center min-h-80">
            <div className="text-center">
              <Video className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">{videoFile ? `📹 ${videoFile.name}` : 'Video preview'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <button type="button" onClick={handleAnalyze} disabled={analyzing || !videoFile} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
              <Video className="w-4 h-4" />
              {analyzing ? 'Analyzing...' : 'Analyze Motion'}
            </button>
            <button type="button" className="w-full btn-secondary text-sm">Generate Motion Video</button>
          </div>
        </div>
      </div>
    </div>
  )
}
