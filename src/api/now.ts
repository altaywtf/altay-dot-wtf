import { readNowJSON } from 'scripts/now/lib/nowJSON'
export type { NowJSON } from 'scripts/now/lib/types'

export const getNow = () => readNowJSON()
