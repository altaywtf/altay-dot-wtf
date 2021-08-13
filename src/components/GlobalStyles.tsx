import { Global } from '@emotion/react'
import { createTypographyCSS } from 'theme/typography'

const GlobalStyles = () => (
  <Global
    styles={() => `
      ${createTypographyCSS()}

      ul, ol {
        padding: 0;
        margin: 4px 0 4px 24px;
      }

      li {
        line-height: 1.4;
        margin: 4px 0;
      }
    `}
  />
)

export default GlobalStyles
