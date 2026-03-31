import { GitHubCardProps } from '../types'
import { getTheme, LANGUAGE_COLORS } from '../themes'

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function GitHubCardTemplate({ repoName, description, stars, forks, language, theme: themeId }: GitHubCardProps) {
  const theme = getTheme(themeId)
  const langColor = language ? (LANGUAGE_COLORS[language] ?? '#888888') : null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: theme.background,
        fontFamily: 'monospace',
        padding: '64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid lines decoration */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${theme.border}22 1px, transparent 1px), linear-gradient(90deg, ${theme.border}22 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, height: '100%' }}>
        {/* GitHub mark */}
        <div
          style={{
            display: 'flex',
            fontSize: 16,
            color: theme.textMuted,
            marginBottom: '32px',
            fontWeight: 600,
            letterSpacing: '1px',
          }}
        >
          github.com
        </div>

        {/* Repo name */}
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 800,
            color: theme.accent,
            lineHeight: 1.1,
            marginBottom: '20px',
            maxWidth: '1000px',
          }}
        >
          {repoName}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: theme.textMuted,
              lineHeight: 1.5,
              maxWidth: '820px',
              flex: 1,
            }}
          >
            {description}
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginTop: 'auto' }}>
          {language && langColor && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: langColor,
                }}
              />
              <div style={{ display: 'flex', fontSize: 20, color: theme.text, fontWeight: 600 }}>
                {language}
              </div>
            </div>
          )}
          {stars !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', fontSize: 22, color: '#f59e0b' }}>★</div>
              <div style={{ display: 'flex', fontSize: 20, color: theme.text, fontWeight: 600 }}>
                {formatCount(stars)}
              </div>
            </div>
          )}
          {forks !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', fontSize: 18, color: theme.textMuted }}>⑂</div>
              <div style={{ display: 'flex', fontSize: 20, color: theme.text, fontWeight: 600 }}>
                {formatCount(forks)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
