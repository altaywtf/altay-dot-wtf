import { SxStyleProp } from 'rebass'

export const link: SxStyleProp = {
  color: 'inherit',
  textDecoration: 'none',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'textTertiary',
  '&:hover': {
    color: 'linkPrimary',
    borderBottomColor: 'linkPrimary',
  },
}

export const linkTitle: SxStyleProp = {
  display: 'inline-block',
  textDecoration: 'none',
  color: 'linkPrimary',
  paddingX: '0.15rem',
  marginX: '-0.15rem',
  fontSize: [1, 2],
  fontWeight: 'bold',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: ['transparent', 'linkPrimary'],
    color: ['linkHover', 'background'],
  },
}

export const linkSilent: SxStyleProp = {
  cursor: 'pointer',
  color: 'textTertiary',
  textDecoration: 'none',
  '&:hover': {
    color: 'linkHover',
  },
}

export const linkButton: SxStyleProp = {
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  paddingY: 2,
  paddingX: 3,
  backgroundColor: 'buttonBackground',
  color: 'text',
  fontWeight: 'bold',
  lineHeight: 1,
  border: '2px solid',
  borderColor: 'transparent',
  borderRadius: 4,
  '&:hover': {
    borderColor: 'buttonBorderHover',
  },
}
export const linkScale: SxStyleProp = {
  display: 'block',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'transform .2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}

export const linkHighlight: SxStyleProp = {
  cursor: 'pointer',
  display: 'block',
  textDecoration: 'none',
  border: '2px solid',
  borderColor: 'borderPrimary',
  borderRadius: 4,
  transition: 'transform .2s',
  '&:hover': {
    backgroundColor: 'linkHoverBackground',
    borderColor: 'backgroundSecondary',
    transform: 'scale(1.025)',
  },
}
