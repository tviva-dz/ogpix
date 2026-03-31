import { ProductLaunchProps } from '../types'
import { getTheme } from '../themes'

export function ProductLaunchTemplate({ productName, tagline, features, theme: themeId }: ProductLaunchProps) {
  const theme = getTheme(themeId)
  const featureList = features?.slice(0, 4) ?? []
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        background: theme.background,
        fontFamily: 'sans-serif',
      }}
    >
      {/* Left panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          padding: '64px 48px',
          background: `linear-gradient(160deg, ${theme.background}, ${theme.backgroundSecondary})`,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'flex',
            background: theme.accent,
            color: theme.accentText,
            fontSize: 14,
            fontWeight: 700,
            padding: '6px 16px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            width: 'fit-content',
            marginBottom: '24px',
          }}
        >
          New Launch
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 800,
            color: theme.text,
            lineHeight: 1.05,
            marginBottom: '20px',
            letterSpacing: '-1px',
          }}
        >
          {productName}
        </div>

        {tagline && (
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: theme.textMuted,
              lineHeight: 1.5,
              maxWidth: '480px',
            }}
          >
            {tagline}
          </div>
        )}
      </div>

      {/* Right panel — feature list */}
      {featureList.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '380px',
            padding: '64px 48px',
            background: theme.backgroundSecondary,
            gap: '20px',
          }}
        >
          {featureList.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: theme.accent,
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.accentText,
                }}
              >
                ✓
              </div>
              <div style={{ display: 'flex', fontSize: 20, color: theme.text, lineHeight: 1.3 }}>
                {f}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
