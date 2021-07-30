import type { Note, Content, ContentType } from 'types'
import readingTime from 'reading-time'

const getNoteMeta = async ({
  meta,
  content,
}: {
  meta: Note['meta']
  content: Note['markdown']
}): Promise<Note['meta']> => {
  return {
    ...meta,
    readingTime: readingTime(content).text,
  }
}

export const getMeta = async <T extends Content>({
  type,
  meta,
  content,
}: {
  type: ContentType
  slug: string
  meta: Record<string, unknown>
  content: string
}): Promise<T['meta']> => {
  switch (type) {
    case 'note':
      return getNoteMeta({ content, meta: meta as Note['meta'] })

    default:
      return meta as T['meta']
  }
}
