import { PodcastEpisodeProps } from '../types'
import { getTheme } from '../themes'

export function PodcastEpisodeTemplate({ showName, episodeTitle, episodeNumber, theme: themeId }: PodcastEpisodeProps) {
  const theme = getTheme(themeId)

  // Decorative waveform bars (static decoration)
  const bars = [18, 32, 48, 28, 56, 40, 64, 36, 52, 24, 44, 60, 32, 48, 20, 56, 40, 28, 52, 36]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(145deg, ${theme.background} 0%, ${theme.backgroundSecondary} 100%)`,
        padding: '56px 64px',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Show name */}
      <div
        style={{
          display: 'flex',
          fontSize: 18,
          fontWeight: 700,
          color: theme.accent,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '16px',
        }}
      >
        {showName}
      </div>

      {/* Episode number */}
      {episodeNumber !== undefined && (
        <div
          style={{
            display: 'flex',
            fontSize: 16,
            fontWeight: 500,
            color: theme.textMuted,
            marginBottom: '24px',
          }}
        >
          Episode {episodeNumber}
        </div>
      )}

      {/* Episode title */}
      <div
        style={{
          display: 'flex',
          fontSize: 62,
          fontWeight: 800,
          color: theme.text,
          lineHeight: 1.1,
          maxWidth: '900px',
          letterSpacing: '-1px',
          flex: 1,
          alignItems: 'center',
        }}
      >
        {episodeTitle}
      </div>

      {/* Waveform decoration */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          height: '72px',
          marginTop: '32px',
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              width: '8px',
              height: `${h}px`,
              borderRadius: '4px',
              background: i < 12 ? theme.accent : theme.border,
              opacity: i < 12 ? 0.9 : 0.3,
            }}
          />
        ))}
        {/* Play indicator dot */}
        <div
          style={{
            display: 'flex',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: theme.accent,
            marginLeft: '4px',
          }}
        />
      </div>
    </div>
  )
}
