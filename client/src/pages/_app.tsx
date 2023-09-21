import { Notify } from '@/common/notify'
import Header from '@/components/app-layout/header'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Notify />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
