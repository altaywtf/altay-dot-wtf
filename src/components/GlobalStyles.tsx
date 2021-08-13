import { Global } from '@emotion/react'
import { createTypographyCSS } from 'theme/typography'

const GlobalStyles = () => (
  <Global
    styles={(theme) => `
      ${createTypographyCSS()}

      * {
        box-sizing: border-box;
      }

      html {
        padding: 0;
        margin: 0;
        overflow-y: scroll;
      }


      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
      }

      hr {
        border-color: ${theme.colors.borderHR};
        opacity: 0.2;
      }

      ul, ol {
        padding: 0;
        margin: 4px 0 4px 24px;
        color: ${theme.colors.textSecondary};
      }

      li {
        line-height: 1.4;
        margin: 4px 0;
      }
    `}
  />
)

export default GlobalStyles
