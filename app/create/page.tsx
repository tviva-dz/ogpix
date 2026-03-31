'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { TEMPLATES, TemplateId, OutputSize } from '@/lib/types'
import { THEMES } from '@/lib/themes'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Params {
  title?: string
  subtitle?: string
  author?: string
  productName?: string
  tagline?: string
  features?: string
  showName?: string
  episodeTitle?: string
  episodeNumber?: string
  eventName?: string
  date?: string
  location?: string
  speaker?: string
  repoName?: string
  description?: string
  stars?: string
  forks?: string
  language?: string
  theme?: string
}

const SIZE_LABELS: Record<OutputSize, string> = {
  og: 'OG — 1200×630',
  twitter: 'Twitter — 1200×675',
  instagram: 'Square — 1080×1080',
}

const SIZE_ASPECT: Record<OutputSize, string> = {
  og: 'aspect-[1200/630]',
  twitter: 'aspect-[1200/675]',
  instagram: 'aspect-square',
}

// ─── URL builder ─────────────────────────────────────────────────────────────

function buildOgUrl(template: TemplateId, params: Params, size: OutputSize): string {
  const sp = new URLSearchParams({ template, size })
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') sp.set(k, v)
  }
  return `/api/og?${sp.toString()}`
}

// ─── Template fields config ───────────────────────────────────────────────────

function useTemplateDefaults(template: TemplateId): Params {
  switch (template) {
    case 'blog-cover':
      return { title: 'How I Built a Side Project in 72 Hours', subtitle: 'A practical guide to shipping fast', author: 'Alex Morgan' }
    case 'product-launch':
      return { productName: 'SuperApp 2.0', tagline: 'The productivity tool you\'ve been waiting for', features: 'Lightning fast|Zero config|Open source|10x cheaper' }
    case 'podcast-episode':
      return { showName: 'Dev & Coffee', episodeTitle: 'Building in Public: The Real Story', episodeNumber: '42' }
    case 'event':
      return { eventName: 'React Conf 2025', date: 'June 12–14, 2025', location: 'San Francisco, CA', speaker: 'Dan Abramov' }
    case 'github-card':
      return { repoName: 'vercel/next.js', description: 'The React Framework for the Web', stars: '120000', forks: '26000', language: 'TypeScript' }
    case 'generic':
    default:
      return { title: 'Hello, World!', subtitle: 'Built with OGPix' }
  }
}

// ─── Field components ─────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{children}</label>
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
  )
}

function NumberInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
    />
  )
}

// ─── Template-specific fields ─────────────────────────────────────────────────

function TemplateFields({
  template,
  params,
  onChange,
}: {
  template: TemplateId
  params: Params
  onChange: (key: keyof Params, value: string) => void
}) {
  const f = (key: keyof Params) => params[key] ?? ''
  const set = (key: keyof Params) => (v: string) => onChange(key, v)

  switch (template) {
    case 'blog-cover':
      return (
        <div className="space-y-4">
          <div><Label>Title</Label><Input value={f('title')} onChange={set('title')} placeholder="Post title" /></div>
          <div><Label>Subtitle</Label><Input value={f('subtitle')} onChange={set('subtitle')} placeholder="Optional subtitle" /></div>
          <div><Label>Author</Label><Input value={f('author')} onChange={set('author')} placeholder="Author name" /></div>
        </div>
      )
    case 'product-launch':
      return (
        <div className="space-y-4">
          <div><Label>Product Name</Label><Input value={f('productName')} onChange={set('productName')} placeholder="My Product" /></div>
          <div><Label>Tagline</Label><Input value={f('tagline')} onChange={set('tagline')} placeholder="Short tagline" /></div>
          <div>
            <Label>Features (pipe-separated)</Label>
            <Textarea value={f('features')} onChange={set('features')} placeholder="Feature 1|Feature 2|Feature 3" rows={2} />
          </div>
        </div>
      )
    case 'podcast-episode':
      return (
        <div className="space-y-4">
          <div><Label>Show Name</Label><Input value={f('showName')} onChange={set('showName')} placeholder="My Podcast" /></div>
          <div><Label>Episode Title</Label><Input value={f('episodeTitle')} onChange={set('episodeTitle')} placeholder="Episode title" /></div>
          <div><Label>Episode Number</Label><NumberInput value={f('episodeNumber')} onChange={set('episodeNumber')} placeholder="42" /></div>
        </div>
      )
    case 'event':
      return (
        <div className="space-y-4">
          <div><Label>Event Name</Label><Input value={f('eventName')} onChange={set('eventName')} placeholder="My Conference" /></div>
          <div><Label>Date</Label><Input value={f('date')} onChange={set('date')} placeholder="June 12–14, 2025" /></div>
          <div><Label>Location</Label><Input value={f('location')} onChange={set('location')} placeholder="San Francisco, CA" /></div>
          <div><Label>Speaker</Label><Input value={f('speaker')} onChange={set('speaker')} placeholder="Speaker name" /></div>
        </div>
      )
    case 'github-card':
      return (
        <div className="space-y-4">
          <div><Label>Repo Name</Label><Input value={f('repoName')} onChange={set('repoName')} placeholder="owner/repo" /></div>
          <div><Label>Description</Label><Input value={f('description')} onChange={set('description')} placeholder="Repo description" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Stars</Label><NumberInput value={f('stars')} onChange={set('stars')} placeholder="1000" /></div>
            <div><Label>Forks</Label><NumberInput value={f('forks')} onChange={set('forks')} placeholder="200" /></div>
          </div>
          <div><Label>Language</Label><Input value={f('language')} onChange={set('language')} placeholder="TypeScript" /></div>
        </div>
      )
    case 'generic':
    default:
      return (
        <div className="space-y-4">
          <div><Label>Title</Label><Input value={f('title')} onChange={set('title')} placeholder="Title" /></div>
          <div><Label>Subtitle</Label><Input value={f('subtitle')} onChange={set('subtitle')} placeholder="Subtitle" /></div>
        </div>
      )
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CreatePage() {
  const [template, setTemplate] = useState<TemplateId>('blog-cover')
  const [params, setParams] = useState<Params>(useTemplateDefaults('blog-cover'))
  const [size, setSize] = useState<OutputSize>('og')
  const [previewUrl, setPreviewUrl] = useState('')
  const [copying, setCopying] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced preview update
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setPreviewUrl(buildOgUrl(template, params, size))
    }, 200)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [template, params, size])

  const handleTemplateChange = useCallback((id: TemplateId) => {
    setTemplate(id)
    // Reset to defaults for that template
    const defaults: Record<TemplateId, Params> = {
      'blog-cover': { title: 'How I Built a Side Project in 72 Hours', subtitle: 'A practical guide to shipping fast', author: 'Alex Morgan' },
      'product-launch': { productName: 'SuperApp 2.0', tagline: "The productivity tool you've been waiting for", features: 'Lightning fast|Zero config|Open source|10x cheaper' },
      'podcast-episode': { showName: 'Dev & Coffee', episodeTitle: 'Building in Public: The Real Story', episodeNumber: '42' },
      'event': { eventName: 'React Conf 2025', date: 'June 12–14, 2025', location: 'San Francisco, CA', speaker: 'Dan Abramov' },
      'github-card': { repoName: 'vercel/next.js', description: 'The React Framework for the Web', stars: '120000', forks: '26000', language: 'TypeScript' },
      'generic': { title: 'Hello, World!', subtitle: 'Built with OGPix' },
    }
    setParams(defaults[id])
  }, [])

  const handleParamChange = useCallback((key: keyof Params, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }, [])

  const fullApiUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${buildOgUrl(template, params, size)}`
    : buildOgUrl(template, params, size)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullApiUrl)
    setCopying(true)
    setTimeout(() => setCopying(false), 1500)
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const res = await fetch(previewUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ogpix-${template}-${size}.png`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4 flex-shrink-0">
        <a href="/" className="text-lg font-bold text-white">OGPix</a>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400 text-sm">Create</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Template picker */}
        <aside className="w-56 border-r border-gray-800 p-4 flex-shrink-0 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Templates</p>
          <div className="space-y-1">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTemplateChange(t.id)}
                className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                  template === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-snug">{t.description}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Center: Preview */}
        <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto bg-gray-900/50">
          <div className={`w-full max-w-3xl ${SIZE_ASPECT[size]} bg-gray-800 rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-700`}>
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="OG image preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                Loading preview…
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-gray-600">{SIZE_LABELS[size]}</p>
        </main>

        {/* Right: Controls */}
        <aside className="w-72 border-l border-gray-800 p-5 flex-shrink-0 overflow-y-auto flex flex-col gap-6">
          {/* Template fields */}
          <section>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Content</p>
            <TemplateFields template={template} params={params} onChange={handleParamChange} />
          </section>

          {/* Theme */}
          <section>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleParamChange('theme', t.id)}
                  title={t.name}
                  className={`rounded-lg p-2 text-xs font-medium border transition-all ${
                    (params.theme ?? 'dark') === t.id
                      ? 'border-indigo-500 ring-1 ring-indigo-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{ background: t.background, color: t.text }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </section>

          {/* Size */}
          <section>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Output Size</p>
            <div className="space-y-1.5">
              {(Object.keys(SIZE_LABELS) as OutputSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition-colors ${
                    size === s
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {SIZE_LABELS[s]}
                </button>
              ))}
            </div>
          </section>

          {/* Actions */}
          <section className="mt-auto space-y-2">
            <button
              onClick={handleDownload}
              disabled={downloading || !previewUrl}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg px-4 py-2.5 transition-colors"
            >
              {downloading ? 'Downloading…' : 'Download PNG'}
            </button>
            <button
              onClick={handleCopy}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-sm rounded-lg px-4 py-2.5 transition-colors border border-gray-700"
            >
              {copying ? 'Copied!' : 'Copy API URL'}
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}
