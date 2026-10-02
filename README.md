# FM. — Digital Infrastructure

React, TypeScript, Vite, Tailwind CSS, GSAP ScrollTrigger ve Framer Motion ile hazırlanmış portföy.

## Çalıştırma

Node.js 22.12 veya üstü:

```sh
npm install
npm run dev
```

Üretim: `npm run build`. Çıktı `dist/` klasöründedir. Yerel kontrol: `npm run preview`.

## Düzenleme

- İletişim adresleri: `src/data/contact.ts`. Gerçek adresler eklenene kadar düğmeler devre dışıdır.
- Proje metinleri: `src/data/projects.ts`. Brief'teki örnek projeler kullanılmıştır; gerçek deneyimlerinize göre düzenleyin.
- Ana video: `public/videos/hero.mp4`.
- Video kapağı: `public/images/video-poster.jpg`.
- Proje görselleri: `public/projects/*.jpg`. Şimdilik gönderdiğiniz videodan alınan karelerdir; gerçek proje görselleriyle değiştirilebilir.
- Tasarım: `src/styles/globals.css`.

Video sessiz ve döngülü oynar. Başlıklar kaydırmaya bağlı değişir. Hareket azaltma tercihi açıkken animasyonlar devre dışıdır. Proje kartları klavye ile kullanılabilir ayrıntı pencerelerini açar; Escape kapatır.

## Aether project cover

Project 01 reuses `public/media/hero-scroll.mp4` from https://github.com/furkanmlkc/aether-website at commit `c8755f6f08399e0d5e33b4a16bc014c0f24f6f72`. The local asset at `public/projects/aether/hero-scroll.mp4` is an exact, hash-verified copy.

The source uses `GlobalScrollVideo.tsx` with GSAP ScrollTrigger to seek a paused video across the page. This portfolio uses `AetherProjectPreview.tsx` to play the same film on a native looping video timeline, preserving the source framing (55% desktop / 54% mobile). It does not import Aether's page, fixed background, navigation, global CSS, or scroll controller.

`usePreviewVisibility.ts` pauses playback outside the viewport proximity and when the tab is hidden. Reduced-motion preferences stop automatic playback. The preview has no controls, wheel/touch listeners, iframe or scrolling surface; its dimensions and corner clipping come from the existing card. Aether's standalone repository was read only and remains unchanged.
