import { EventProps } from '../types'
import { getTheme } from '../themes'

export function EventTemplate({ eventName, date, location, speaker, theme: themeId }: EventProps) {
  const theme = getTheme(themeId)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: theme.background,
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '-180px',
          right: '-180px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: theme.accent,
          opacity: 0.08,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '64px',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Event label */}
        <div
          style={{
            display: 'flex',
            border: `2px solid ${theme.accent}`,
            color: theme.accent,
            fontSize: 14,
            fontWeight: 700,
            padding: '6px 18px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            alignSelf: 'flex-start',
            marginBottom: '40px',
          }}
        >
          Event
        </div>

        {/* Event name */}
        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 800,
            color: theme.text,
            lineHeight: 1.05,
            maxWidth: '900px',
            letterSpacing: '-1px',
            flex: 1,
          }}
        >
          {eventName}
        </div>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: 'auto',
          }}
        >
          {date && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', fontSize: 13, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Date
              </div>
              <div style={{ display: 'flex', fontSize: 22, color: theme.text, fontWeight: 600 }}>
                {date}
              </div>
            </div>
          )}
          {location && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', fontSize: 13, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Location
              </div>
              <div style={{ display: 'flex', fontSize: 22, color: theme.text, fontWeight: 600 }}>
                {location}
              </div>
            </div>
          )}
          {speaker && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', fontSize: 13, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Speaker
              </div>
              <div style={{ display: 'flex', fontSize: 22, color: theme.text, fontWeight: 600 }}>
                {speaker}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
