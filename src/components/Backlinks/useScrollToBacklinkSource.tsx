import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { BACKLINK_SOURCE_QUERY_PARAM } from './constants'

export const useScrollToBacklinkSource: VoidFunction = () => {
  const router = useRouter()
  const { query } = router
  const source = query[BACKLINK_SOURCE_QUERY_PARAM]

  useEffect(() => {
    if (source && typeof source === 'string') {
      const anchors = document.querySelectorAll(`a`)

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]

        if (anchor.href.includes(source)) {
          anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
          anchor.classList.add('scrolled-source-link')
          break
        }
      }
    }
  }, [source])
}
