import { GenericProps } from '../types'
import { getTheme } from '../themes'

export function GenericTemplate({ title, subtitle, theme: themeId }: GenericProps) {
  const theme = getTheme(themeId)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: `linear-gradient(160deg, ${theme.background} 0%, ${theme.backgroundSecondary} 100%)`,
        padding: '80px',
        fontFamily: 'sans-serif',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* Corner accents */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '32px',
          left: '32px',
          width: '48px',
          height: '48px',
          borderTop: `4px solid ${theme.accent}`,
          borderLeft: `4px solid ${theme.accent}`,
        }}
      />
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          width: '48px',
          height: '48px',
          borderBottom: `4px solid ${theme.accent}`,
          borderRight: `4px solid ${theme.accent}`,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '900px' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 800,
            color: theme.text,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            textAlign: 'center',
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: theme.textMuted,
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            {subtitle}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            width: '60px',
            height: '4px',
            background: theme.accent,
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  )
}
