import { COLORS } from 'theme/colors'
import type { ParsedQuery, Post, Book, Page } from './types'

const renderPost = (post: Post) => (
  <div
    style={{ width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}
  >
    <h1 style={{ fontSize: 96, padding: 0, margin: 0 }}>{post.title}</h1>

    <h4 style={{ fontSize: 48, padding: 0, margin: 0, color: COLORS.textTertiary, marginTop: 36 }}>
      {post.oneliner}
    </h4>
  </div>
)

const renderBook = (book: Book) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
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
        style={{ fontSize: 56, color: COLORS.textTertiary, margin: 0, padding: 0, marginTop: 36 }}
      >
        by {book.author}
      </h3>
    </div>

    <div style={{ display: 'flex', height: 360, width: 'auto' }}>
      <img
        src={book.coverImageURL}
        style={{
          height: '100%',
          borderRadius: '4px',
          borderWidth: '4px',
          borderStyle: 'solid',
          borderColor: COLORS.border,
        }}
      />
    </div>
  </div>
)

const renderPage = (page: Page) => (
  <div style={{ display: 'flex', width: '100%' }}>
    <h1 style={{ fontSize: 96, padding: 0, margin: 0 }}>{page.title}</h1>
  </div>
)

export const OpenGraphImage: React.FC<{ query: ParsedQuery }> = ({ query }) => {
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
        height: '100%',
        width: '100%',
        display: 'flex',
        fontSize: 16,
        fontFamily: 'GT-America-Standard-Bold',
        fontWeight: 'bold',
        lineHeight: 1,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        WebkitTextSizeAdjust: 'none',
        letterSpacing: '0.015em',
        wordSpacing: '0.001em',
        color: COLORS.text,
        position: 'relative',
      }}
    >
      <img
        src="https://altay.wtf/images/meta-bg.png"
        style={{
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
      />

      <section
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: '100%',
          paddingTop: 36,
          paddingBottom: 36,
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="https://altay.wtf/images/avatar.png"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              border: `4px solid ${COLORS.border}`,
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

        <section style={{ width: '100%' }}>{renderContent(query)}</section>
      </section>
    </main>
  )
}
