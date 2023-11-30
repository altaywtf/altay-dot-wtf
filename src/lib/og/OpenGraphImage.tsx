/* eslint-disable @next/next/no-img-element */

import { SITE_URL } from 'config'
import colors from 'tailwindcss/colors'

import type { Book, Page, ParsedQuery, Post } from './types'

const renderPost = (post: Post) => (
  <div
    style={{
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
  >
    <h1
      style={{
        fontSize: 96,
        margin: 0,
        padding: 0,
      }}
    >
      {post.title}
    </h1>

    <h4
      style={{
        color: colors.neutral[400],
        fontSize: 48,
        margin: 0,
        marginTop: 36,
        padding: 0,
      }}
    >
      {post.oneliner}
    </h4>
  </div>
)

const renderBook = (book: Book) => (
  <div
    style={{
      alignItems: 'flex-end',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    }}
  >
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontSize: 72,
          margin: 0,
          padding: 0,
        }}
      >
        {book.title}
      </h2>

      <h3
        style={{
          color: colors.neutral[400],
          fontSize: 56,
          margin: 0,
          marginTop: 36,
          padding: 0,
        }}
      >
        by {book.author}
      </h3>
    </div>

    <div
      style={{
        display: 'flex',
        height: 360,
        width: 'auto',
      }}
    >
      <img
        alt="cover-image"
        src={SITE_URL + book.coverImagePath}
        style={{
          borderColor: colors.neutral[700],
          borderRadius: '4px',
          borderStyle: 'solid',
          borderWidth: '4px',
          height: '100%',
        }}
      />
    </div>
  </div>
)

const renderPage = (page: Page) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
    }}
  >
    <h1
      style={{
        fontSize: 96,
        margin: 0,
        padding: 0,
      }}
    >
      {page.title}
    </h1>
  </div>
)

export const OpenGraphImage: React.FC<{
  avatarImage: any
  backgroundImage: any
  query: ParsedQuery
}> = ({ avatarImage, backgroundImage, query }) => {
  const renderContent = (query: ParsedQuery) => {
    switch (query.type) {
      case 'post':
        return renderPost(query)

      case 'book':
        return renderBook(query)

      case 'page':
        return renderPage(query)
    }
  }

  return (
    <main
      style={{
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        WebkitTextSizeAdjust: 'none',
        color: colors.neutral[200],
        display: 'flex',
        fontFamily: 'GT-America-Standard-Bold',
        fontSize: 16,
        fontWeight: 'bold',
        height: '100%',
        letterSpacing: '0.015em',
        lineHeight: 1,
        position: 'relative',
        width: '100%',
        wordSpacing: '0.001em',
      }}
    >
      <img
        alt="meta-bg"
        src={backgroundImage}
        style={{
          height: '100%',
          position: 'absolute',
          width: '100%',
          zIndex: -1,
        }}
      />

      <section
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          paddingBottom: 36,
          paddingLeft: 48,
          paddingRight: 48,
          paddingTop: 36,
        }}
      >
        <header
          style={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <img
            alt="avatar"
            src={avatarImage}
            style={{
              border: `4px solid ${colors.neutral[600]}`,
              borderRadius: 100,
              height: 100,
              width: 100,
            }}
          />

          <span
            style={{
              fontSize: 48,
              marginLeft: 24,
            }}
          >
            altay.wtf
          </span>
        </header>

        <section
          style={{
            width: '100%',
          }}
        >
          {renderContent(query)}
        </section>
      </section>
    </main>
  )
}
