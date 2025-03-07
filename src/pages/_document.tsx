import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add crossorigin attribute to help with CORS */}
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
        
        {/* Add preconnect for resource domains */}
        <link rel="preconnect" href="https://jdfilms.netlify.app" />
        
        {/* Add preload for video assets */}
        <link 
          rel="preload" 
          href="/assets/videos/Mp4 Fallback/hero-video.mp4" 
          as="video"
          type="video/mp4"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 