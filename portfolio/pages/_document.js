import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  var console = {};
  console.log = function () { };
  return (
    <Html lang="en">
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
