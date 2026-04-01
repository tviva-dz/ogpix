import satori from 'satori'
import sharp from 'sharp'
import { createElement } from 'react'
import { readFileSync } from 'fs'
import { join } from 'path'
import { TemplateProps, RenderOptions, OUTPUT_SIZES } from './types'
import { BlogCoverTemplate } from './templates/blog-cover'
import { ProductLaunchTemplate } from './templates/product-launch'
import { PodcastEpisodeTemplate } from './templates/podcast-episode'
import { EventTemplate } from './templates/event'
import { GitHubCardTemplate } from './templates/github-card'
import { GenericTemplate } from './templates/generic'

// Load Inter font from local files (avoids runtime network fetch failures on Vercel)
function loadInterFont() {
  const regular = readFileSync(join(process.cwd(), 'assets/fonts/Inter-Regular.woff'))
  const bold = readFileSync(join(process.cwd(), 'assets/fonts/Inter-Bold.woff'))
  return [
    { name: 'Inter', data: regular.buffer.slice(regular.byteOffset, regular.byteOffset + regular.byteLength), weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: bold.buffer.slice(bold.byteOffset, bold.byteOffset + bold.byteLength), weight: 700 as const, style: 'normal' as const },
  ]
}

function resolveTemplate(props: TemplateProps) {
  switch (props.template) {
    case 'blog-cover':
      return createElement(BlogCoverTemplate, props)
    case 'product-launch':
      return createElement(ProductLaunchTemplate, props)
    case 'podcast-episode':
      return createElement(PodcastEpisodeTemplate, props)
    case 'event':
      return createElement(EventTemplate, props)
    case 'github-card':
      return createElement(GitHubCardTemplate, props)
    case 'generic':
      return createElement(GenericTemplate, props)
  }
}

/**
 * Render a template to a PNG or JPEG buffer using Satori + sharp.
 * This runs in Node.js (not edge runtime).
 */
export async function renderImage(
  props: TemplateProps,
  options: RenderOptions = {}
): Promise<Buffer> {
  const { size = 'og', format = 'png', quality = 90 } = options
  const { width, height } = OUTPUT_SIZES[size]

  const fonts = loadInterFont()

  const svg = await satori(resolveTemplate(props), {
    width,
    height,
    fonts,
  })

  const image = sharp(Buffer.from(svg))

  if (format === 'jpeg') {
    return image.jpeg({ quality }).toBuffer()
  }
  return image.png({ compressionLevel: 6 }).toBuffer()
}
