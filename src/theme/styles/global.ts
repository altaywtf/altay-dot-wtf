import type { Theme } from '..'
import { createTypographyCSS } from '../typography'

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

  a[href="https://put.io"] {
    font-weight: bold;
    border-color: transparent;
    color: ${theme.colors.putio};
    &:hover {
      border-color: ${theme.colors.putio};
    }
  }

  a[href="https://amie.so"] {
    font-weight: bold;
    border-color: transparent;
    color: ${theme.colors.amie};
    &:hover {
      border-color: ${theme.colors.amie};
    };
  }

  a[href="https://klarna.com"] {
    font-weight: bold;
    border-color: transparent;
    color: ${theme.colors.klarna};
    &:hover {
      border-color: ${theme.colors.klarna};
    }
  }

  a[href="https://lisk.io"] {
    font-weight: bold;
    border-color: transparent;
    color: ${theme.colors.lisk};
    &:hover {
      border-color: ${theme.colors.lisk};
    }
  }
`
