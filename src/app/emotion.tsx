'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const RootStyleRegistry: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true
    return cache
  })

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ))

  return <CacheProvider value={cache}>{children}</CacheProvider>
}

export default RootStyleRegistry