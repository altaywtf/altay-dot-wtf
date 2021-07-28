import type { GetStaticProps, GetStaticPaths } from 'next'
import { Content, ContentType } from 'types'
import { getMarkdownFileNames } from './fs'
import { getContentDetails, getContentList } from './content'
import { getLinksToContent } from './backlinks'

export const getStaticPathsForContent =
  (contentType: ContentType): GetStaticPaths =>
  async () => {
    const data = await getContentList(contentType, { minify: true })

    return {
      paths: data.map(({ slug }) => ({ params: { slug } })),
      fallback: false,
    }
  }

type ContentDetailsProps<T> = { data: T; links: Content[] } | { data: undefined; links: undefined }

export const getStaticPropsForContentDetails =
  <T extends Content>(contentType: ContentType): GetStaticProps<ContentDetailsProps<T>> =>
  async ({ params }) => {
    const slug = getMarkdownFileNames(contentType).find((s) => s === params?.slug)

    if (!slug) {
      return {
        props: {
          data: undefined,
          links: undefined,
        },
      }
    }

    const data = await getContentDetails<T>(contentType, slug)
    const links = await getLinksToContent(data)

    return {
      props: {
        data,
        links,
      },
    }
  }

type ContentListProps<T> = { data: T[] }

export const getStaticPropsForContentList =
  <T extends Content>(contentType: ContentType): GetStaticProps<ContentListProps<T>> =>
  async () => {
    const data = await getContentList<T>(contentType, { minify: true })

    return {
      props: {
        data,
      },
    }
  }
