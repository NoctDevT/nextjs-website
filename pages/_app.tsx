import type { AppProps } from 'next/app'
import {ThemeProvider} from 'next-themes'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <ThemeProvider attribute="class">
    <Component {...pageProps} />
    </ThemeProvider>
  )
}
