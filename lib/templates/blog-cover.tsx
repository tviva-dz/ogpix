import { BlogCoverProps } from '../types'
import { getTheme } from '../themes'

export function BlogCoverTemplate({ title, subtitle, author, theme: themeId }: BlogCoverProps) {
  const theme = getTheme(themeId)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${theme.background}, ${theme.backgroundSecondary})`,
        padding: '64px',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          display: 'flex',
          width: '80px',
          height: '6px',
          background: theme.accent,
          borderRadius: '3px',
          marginBottom: '40px',
        }}
      />

      {/* Title */}
      <div
        style={{
          display: 'flex',
          fontSize: 68,
          fontWeight: 800,
          color: theme.text,
          lineHeight: 1.1,
          marginBottom: '28px',
          maxWidth: '900px',
          letterSpacing: '-1px',
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: theme.textMuted,
            lineHeight: 1.5,
            maxWidth: '800px',
            marginBottom: 'auto',
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Author */}
      {author && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: theme.accent,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: theme.accentText,
            }}
          >
            {author.charAt(0).toUpperCase()}
          </div>
          <div style={{ display: 'flex', fontSize: 20, color: theme.textMuted, fontWeight: 500 }}>
            {author}
          </div>
        </div>
      )}
    </div>
  )
}
