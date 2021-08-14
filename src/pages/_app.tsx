import '../theme/style.css'
import type { AppProps } from 'next/app'
import { SEO, HOSTNAME } from 'config'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'theme-ui'
import PlausibleProvider from 'next-plausible'
import { theme } from 'theme'
import { useMounted } from 'hooks/useMounted'
import { usePathHistoryListener } from 'hooks/usePathHistory'
import Layout from 'components/Layout'

const Providers: React.FC = ({ children }) => {
  const mounted = useMounted()

  const renderBody = () => (
    <PlausibleProvider domain={HOSTNAME}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PlausibleProvider>
  )

  return mounted ? renderBody() : <div style={{ visibility: 'hidden' }}>{renderBody()}</div>
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePathHistoryListener()

  return (
    <Providers>
      <Head>
        <meta name="theme-color" content="#111111" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <DefaultSeo {...SEO} />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default App
