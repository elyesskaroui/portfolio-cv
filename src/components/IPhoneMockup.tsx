/**
 * A pure-CSS iPhone (titanium frame, Dynamic Island, side buttons, glass
 * glare) holding a flat screenshot. Tilted in 3D through the CSS variables
 * --ry / --rx / --lift set by the parent; straightens up on hover or focus.
 */
export const IPhoneMockup = ({ src, alt }: { src: string; alt: string }) => (
  <div className="iphone" tabIndex={0}>
    <span className="iphone-btn iphone-btn--action" aria-hidden="true" />
    <span className="iphone-btn iphone-btn--vol-up" aria-hidden="true" />
    <span className="iphone-btn iphone-btn--vol-down" aria-hidden="true" />
    <span className="iphone-btn iphone-btn--power" aria-hidden="true" />
    <div className="iphone-screen">
      {/* Status bar strip, so the Dynamic Island never covers the app's own
          title bar (the screenshots have no status bar of their own). */}
      <div className="iphone-status" aria-hidden="true">
        <span>9:41</span>
        <span className="iphone-status-icons">
          <svg viewBox="0 0 18 12" width="15" height="10"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
          <svg viewBox="0 0 26 12" width="21" height="10"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".5" /><rect x="2.5" y="2.5" width="15" height="7" rx="1.5" /><rect x="24" y="4" width="1.6" height="4" rx=".8" opacity=".5" /></svg>
        </span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <span className="iphone-island" aria-hidden="true" />
    </div>
  </div>
);
