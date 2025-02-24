import { APP_URL } from "@/config/constants";
import colors from "tailwindcss/dist/colors";

import type { Book, Page, ParsedQuery, Post } from "../lib/og/types";

const H1 = (props: React.ComponentProps<"h1">) => (
  <h1
    style={{
      fontSize: "5rem",
      margin: 0,
      padding: 0,
    }}
    {...props}
  />
);

const H2 = (props: React.ComponentProps<"h2">) => (
  <h2
    style={{
      color: colors.neutral[400],
      fontSize: "4rem",
      margin: 0,
      padding: 0,
    }}
    {...props}
  />
);

const renderPost = (post: Post) => (
  <div
    style={{
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      gap: "2.5rem",
      width: "100%",
    }}
  >
    <H1>{post.title}</H1>
    <H2>{post.oneliner}</H2>
  </div>
);

const renderBook = (book: Book) => (
  <div
    style={{
      alignItems: "flex-end",
      display: "flex",
      gap: "2.5rem",
      justifyContent: "space-between",
      width: "100%",
    }}
  >
    <div
      style={{
        alignItems: "flex-start",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: "2.5rem",
      }}
    >
      <H1>{book.title}</H1>
      <H2>by {book.author}</H2>
    </div>

    <div
      style={{
        display: "flex",
        height: "25rem",
        width: "auto",
      }}
    >
      <img
        alt="cover-image"
        src={APP_URL + book.coverImagePath}
        style={{
          borderColor: colors.neutral[700],
          borderRadius: "4px",
          borderStyle: "solid",
          borderWidth: "2px",
          height: "100%",
        }}
      />
    </div>
  </div>
);

const renderPage = (page: Page) => (
  <div
    style={{
      display: "flex",
      width: "100%",
    }}
  >
    <H1>{page.title}</H1>
  </div>
);

export const OpenGraphImage: React.FC<{
  query: ParsedQuery;
}> = ({ query }) => {
  const renderContent = (query: ParsedQuery) => {
    switch (query.type) {
      case "post":
        return renderPost(query);

      case "book":
        return renderBook(query);

      case "page":
        return renderPage(query);
    }
  };

  return (
    <main
      style={{
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        WebkitTextSizeAdjust: "none",
        color: colors.neutral[200],
        display: "flex",
        fontFamily: "Inter-Bold",
        height: "100%",
        letterSpacing: "0.012em",
        lineHeight: 1,
        position: "relative",
        width: "100%",
        wordSpacing: "0.001em",
      }}
    >
      <img
        alt="meta-bg"
        src={`${APP_URL}/images/meta-bg.png`}
        style={{
          height: "100%",
          position: "absolute",
          width: "100%",
        }}
      />

      <section
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          paddingBottom: "2.5rem",
          paddingLeft: "3rem",
          paddingRight: "3rem",
          paddingTop: "2.5rem",
        }}
      >
        <header
          style={{
            alignItems: "center",
            display: "flex",
            gap: "1.5rem",
          }}
        >
          <img
            alt="avatar"
            src={`${APP_URL}/images/avatar.png`}
            style={{
              border: `2px solid ${colors.neutral[600]}`,
              borderRadius: 120,
              height: 120,
              width: 120,
            }}
          />

          <span
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
            }}
          >
            altay.wtf
          </span>
        </header>

        <section
          style={{
            width: "100%",
          }}
        >
          {renderContent(query)}
        </section>
      </section>
    </main>
  );
};
