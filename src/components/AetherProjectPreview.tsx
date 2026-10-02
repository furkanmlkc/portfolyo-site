import { useEffect, useRef, useState } from 'react';
import { usePreviewVisibility } from './usePreviewVisibility';

/** Aether's original scroll film, played as an isolated looping cover. */
export default function AetherProjectPreview() {
  const { containerRef, shouldPlay } = usePreviewVisibility();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => {
      if (shouldPlay) void video.play().catch(() => {
        // A blocked autoplay request must not affect navigation or scrolling.
      });
    };
    if (shouldPlay) play();
    else video.pause();
    video.addEventListener('canplay', play);
    return () => { video.removeEventListener('canplay', play); video.pause(); };
  }, [shouldPlay]);

  return <div ref={containerRef} className="aether-project-preview" aria-hidden="true">
    <video ref={videoRef} src="/projects/aether/hero-scroll.mp4" muted loop playsInline preload="metadata" disablePictureInPicture disableRemotePlayback onError={() => setFailed(true)}/>
    {failed && <span className="aether-preview-error">Aether film unavailable</span>}
  </div>;
}
