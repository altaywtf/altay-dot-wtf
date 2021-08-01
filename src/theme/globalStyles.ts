import type { Theme } from '.'
import { createTypographyCSS } from './typography'

export const createGlobalStyles = (theme: Theme) => `
  ${createTypographyCSS()}

  * {
    box-sizing: border-box;
  }

  html {
    padding: 0;
    margin: 0;
    overflow-y: scroll;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
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

  .border-radius {
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .image-markdown {
    background-color: ${theme.colors.background};
  }
`
