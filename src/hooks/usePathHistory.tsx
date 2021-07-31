import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const usePathHistoryListener = () => {
  const router = useRouter()

  useEffect(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    storage.setItem('PATH_HISTORY', router.asPath)
  }, [router.asPath])
}

export const usePathHistory = () => {
  const storage = globalThis?.sessionStorage
  if (!storage) return
  return storage.getItem('PATH_HISTORY')
}
