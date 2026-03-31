export type TemplateId =
  | 'blog-cover'
  | 'product-launch'
  | 'podcast-episode'
  | 'event'
  | 'github-card'
  | 'generic'

export type OutputSize = 'og' | 'twitter' | 'instagram'

export const OUTPUT_SIZES: Record<OutputSize, { width: number; height: number }> = {
  og: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 675 },
  instagram: { width: 1080, height: 1080 },
}

// Per-template prop types
export interface BlogCoverProps {
  template: 'blog-cover'
  title: string
  subtitle?: string
  author?: string
  theme?: string
  font?: string
}

export interface ProductLaunchProps {
  template: 'product-launch'
  productName: string
  tagline?: string
  features?: string[]
  theme?: string
  font?: string
}

export interface PodcastEpisodeProps {
  template: 'podcast-episode'
  showName: string
  episodeTitle: string
  episodeNumber?: number
  theme?: string
  font?: string
}

export interface EventProps {
  template: 'event'
  eventName: string
  date?: string
  location?: string
  speaker?: string
  theme?: string
  font?: string
}

export interface GitHubCardProps {
  template: 'github-card'
  repoName: string
  description?: string
  stars?: number
  forks?: number
  language?: string
  theme?: string
  font?: string
}

export interface GenericProps {
  template: 'generic'
  title: string
  subtitle?: string
  theme?: string
  font?: string
}

export type TemplateProps =
  | BlogCoverProps
  | ProductLaunchProps
  | PodcastEpisodeProps
  | EventProps
  | GitHubCardProps
  | GenericProps

export interface RenderOptions {
  size?: OutputSize
  format?: 'png' | 'jpeg'
  quality?: number
}

export interface Template {
  id: TemplateId
  name: string
  description: string
}

export const TEMPLATES: Template[] = [
  { id: 'blog-cover', name: 'Blog Cover', description: 'Title, subtitle, author name, gradient background' },
  { id: 'product-launch', name: 'Product Launch', description: 'Product name, tagline, feature bullets, brand colors' },
  { id: 'podcast-episode', name: 'Podcast Episode', description: 'Show name, episode title, episode number, waveform decoration' },
  { id: 'event', name: 'Event', description: 'Event name, date, location, speaker name' },
  { id: 'github-card', name: 'GitHub Card', description: 'Repo name, description, stars/forks, language badge' },
  { id: 'generic', name: 'Generic', description: 'Title, subtitle, flexible layout' },
]
