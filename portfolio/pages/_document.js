import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      
      <link href="https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <meta name='description' content={`Build portfolio website without coding anything ! You will get free domain with your username`} />
      <meta property="og:title" content={`Awesome Portfolio | Build free portfolio website`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://ph-files.imgix.net/26c548fe-7bfb-4319-ab61-660ef987b6f2.png" />
      <meta property="og:locale" content="en_US" />
      <meta property='og:site_name' content="Awesome Portfolio" />
      
      <meta property="og:url" content="https://mytechfolio.live/" />
      <link rel="icon" href="https://ph-files.imgix.net/26c548fe-7bfb-4319-ab61-660ef987b6f2.png" />
      <meta property="og:type" content="website" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}


// <!-- HTML Meta Tags -->
// <title>Free Portfolio Website Builder</title>
// <meta name="description" content="Generate portfolio website on the go. Free domain with your username, like username.mytechfolio.live.">

// <!-- Facebook Meta Tags -->
// <meta property="og:url" content="https://mytechfolio.live/">
// <meta property="og:type" content="website">
// <meta property="og:title" content="Free Portfolio Website Builder">
// <meta property="og:description" content="Generate portfolio website on the go. Free domain with your username, like username.mytechfolio.live.">
// <meta property="og:image" content="https://ph-files.imgix.net/6efb7f5a-4c0c-4475-a17c-90b7cc8998d1.png">

// <!-- Twitter Meta Tags -->
// <meta name="twitter:card" content="summary_large_image">
// <meta property="twitter:domain" content="mytechfolio.live">
// <meta property="twitter:url" content="https://mytechfolio.live/">
// <meta name="twitter:title" content="Free Portfolio Website Builder">
// <meta name="twitter:description" content="Generate portfolio website on the go. Free domain with your username, like username.mytechfolio.live.">
// <meta name="twitter:image" content="https://ph-files.imgix.net/6efb7f5a-4c0c-4475-a17c-90b7cc8998d1.png">

// <!-- Meta Tags Generated via https://www.opengraph.xyz -->
