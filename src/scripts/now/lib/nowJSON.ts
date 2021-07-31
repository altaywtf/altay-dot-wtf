import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'
import { NowJSON } from './types'

const NOW_JSON_PATH = `${DATA_FOLDER_PATH}/now.json`

export const readNowJSON = () => {
  const file = fs.readFileSync(NOW_JSON_PATH)
  return JSON.parse(file.toString()) as NowJSON
}

export const writeNowJSON = (nowJSON: NowJSON) => {
  fs.writeFileSync(NOW_JSON_PATH, JSON.stringify({}, null, 2))
  const contents = JSON.stringify(nowJSON, null, 2)
  fs.writeFileSync(NOW_JSON_PATH, contents)
}
