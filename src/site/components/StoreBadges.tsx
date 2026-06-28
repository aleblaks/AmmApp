interface BadgeProps {
  href: string
  style?: React.CSSProperties
}

export function AppStoreBadge({ href, style }: BadgeProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={style} aria-label="Download on the App Store">
      <svg width="135" height="40" viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="135" height="40" rx="7" fill="#000"/>
        <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" stroke="#A6A6A6"/>
        {/* Apple logo */}
        <path d="M24.77 20.3c-.03-3.26 2.67-4.84 2.79-4.91-1.52-2.22-3.88-2.52-4.72-2.55-2-.2-3.92 1.18-4.93 1.18-1.02 0-2.58-1.16-4.25-1.12-2.17.03-4.18 1.26-5.3 3.18-2.27 3.93-.58 9.74 1.62 12.93 1.08 1.56 2.36 3.3 4.04 3.24 1.63-.07 2.24-1.05 4.2-1.05 1.96 0 2.52 1.05 4.24 1.01 1.75-.03 2.85-1.58 3.91-3.15 1.24-1.8 1.75-3.56 1.77-3.65-.04-.02-3.38-1.3-3.37-5.11z" fill="#fff"/>
        <path d="M21.54 11.17c.9-1.09 1.5-2.6 1.33-4.12-1.29.05-2.85.86-3.77 1.93-.83.95-1.55 2.48-1.36 3.94 1.44.11 2.91-.73 3.8-1.75z" fill="#fff"/>
        {/* Text */}
        <text x="38" y="13.5" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="8" fill="#fff" letterSpacing="0.1">Download on the</text>
        <text x="37" y="28" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="15" fontWeight="600" fill="#fff" letterSpacing="-0.3">App Store</text>
      </svg>
    </a>
  )
}

export function GooglePlayBadge({ href, style }: BadgeProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={style} aria-label="Get it on Google Play">
      <svg width="135" height="40" viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="135" height="40" rx="7" fill="#000"/>
        <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" stroke="#A6A6A6"/>
        {/* Play icon triangles */}
        <path d="M10.44 7.3c-.3.32-.48.82-.48 1.46v22.48c0 .64.18 1.14.48 1.46l.08.07 12.59-12.59v-.3L10.52 7.23l-.08.07z" fill="url(#a)"/>
        <path d="M27.31 24.13l-4.2-4.2v-.3l4.2-4.19.1.05 4.97 2.82c1.42.81 1.42 2.13 0 2.94l-4.97 2.82-.1.06z" fill="url(#b)"/>
        <path d="M27.41 24.07L23.11 19.8 10.44 32.47c.47.5 1.24.56 2.12.06l14.85-8.46" fill="url(#c)"/>
        <path d="M27.41 15.53L12.56 7.07c-.88-.5-1.65-.44-2.12.06L23.11 19.8l4.3-4.27z" fill="url(#d)"/>
        <defs>
          <linearGradient id="a" x1="21.8" y1="8.58" x2="5.02" y2="25.36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00A0FF"/>
            <stop offset="1" stopColor="#00A0FF" stopOpacity="0"/>
            <stop offset="1" stopColor="#00A0FF"/>
          </linearGradient>
          <linearGradient id="b" x1="33.83" y1="19.8" x2="9.64" y2="19.8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE000"/>
            <stop offset=".41" stopColor="#FFBD00"/>
            <stop offset=".78" stopColor="#FFA500"/>
            <stop offset="1" stopColor="#FF9C00"/>
          </linearGradient>
          <linearGradient id="c" x1="25.23" y1="22.13" x2="1.58" y2="45.78" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3A44"/>
            <stop offset="1" stopColor="#C31162"/>
          </linearGradient>
          <linearGradient id="d" x1="7.3" y1=".18" x2="17.46" y2="10.34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#32A071"/>
            <stop offset=".07" stopColor="#2DA771"/>
            <stop offset=".48" stopColor="#15CF74"/>
            <stop offset=".8" stopColor="#06E775"/>
            <stop offset="1" stopColor="#00F076"/>
          </linearGradient>
        </defs>
        {/* Text */}
        <text x="38" y="13.5" fontFamily="Helvetica, Arial, sans-serif" fontSize="8" fill="#fff" letterSpacing="0.1">GET IT ON</text>
        <text x="37" y="28" fontFamily="Helvetica, Arial, sans-serif" fontSize="15" fontWeight="600" fill="#fff" letterSpacing="-0.3">Google Play</text>
      </svg>
    </a>
  )
}
