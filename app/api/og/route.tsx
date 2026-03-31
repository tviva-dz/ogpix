import { NextRequest, NextResponse } from 'next/server'
import { renderImage } from '@/lib/render'
import { TemplateProps, OutputSize, RenderOptions } from '@/lib/types'

export const runtime = 'nodejs'

function parseFeatures(raw: string | null): string[] | undefined {
  if (!raw) return undefined
  return raw.split('|').map((s) => s.trim()).filter(Boolean)
}

function buildTemplateProps(params: URLSearchParams): TemplateProps {
  const template = params.get('template') ?? 'generic'

  switch (template) {
    case 'blog-cover':
      return {
        template: 'blog-cover',
        title: params.get('title') ?? 'Untitled',
        subtitle: params.get('subtitle') ?? undefined,
        author: params.get('author') ?? undefined,
        theme: params.get('theme') ?? undefined,
      }
    case 'product-launch':
      return {
        template: 'product-launch',
        productName: params.get('productName') ?? params.get('title') ?? 'Product',
        tagline: params.get('tagline') ?? params.get('subtitle') ?? undefined,
        features: parseFeatures(params.get('features')),
        theme: params.get('theme') ?? undefined,
      }
    case 'podcast-episode':
      return {
        template: 'podcast-episode',
        showName: params.get('showName') ?? params.get('title') ?? 'My Podcast',
        episodeTitle: params.get('episodeTitle') ?? params.get('subtitle') ?? 'Episode',
        episodeNumber: params.get('episodeNumber') ? Number(params.get('episodeNumber')) : undefined,
        theme: params.get('theme') ?? undefined,
      }
    case 'event':
      return {
        template: 'event',
        eventName: params.get('eventName') ?? params.get('title') ?? 'Event',
        date: params.get('date') ?? undefined,
        location: params.get('location') ?? undefined,
        speaker: params.get('speaker') ?? undefined,
        theme: params.get('theme') ?? undefined,
      }
    case 'github-card':
      return {
        template: 'github-card',
        repoName: params.get('repoName') ?? params.get('title') ?? 'repo',
        description: params.get('description') ?? params.get('subtitle') ?? undefined,
        stars: params.get('stars') ? Number(params.get('stars')) : undefined,
        forks: params.get('forks') ? Number(params.get('forks')) : undefined,
        language: params.get('language') ?? undefined,
        theme: params.get('theme') ?? undefined,
      }
    default:
      return {
        template: 'generic',
        title: params.get('title') ?? 'Hello World',
        subtitle: params.get('subtitle') ?? undefined,
        theme: params.get('theme') ?? undefined,
      }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const templateProps = buildTemplateProps(searchParams)
  const size = (searchParams.get('size') ?? 'og') as OutputSize
  const format = (searchParams.get('format') ?? 'png') as 'png' | 'jpeg'

  const options: RenderOptions = { size, format, quality: 90 }

  try {
    const buffer = await renderImage(templateProps, options)
    const contentType = format === 'jpeg' ? 'image/jpeg' : 'image/png'

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch (err) {
    console.error('OG render error:', err)
    return NextResponse.json({ error: 'Failed to render image' }, { status: 500 })
  }
}
