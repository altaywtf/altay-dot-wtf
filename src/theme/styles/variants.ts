import { ThemeUIStyleObject } from 'theme-ui'

export const link: ThemeUIStyleObject = {
  color: 'inherit',
  textDecoration: 'none',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'buttonBorderHover',
  '&:hover': {
    borderBottomColor: 'textTertiary',
  },
}

export const linkTitle: ThemeUIStyleObject = {
  ...link,
  color: 'linkPrimary',
  fontSize: [1, 2],
  fontWeight: 'bold',
  borderBottomColor: 'transparent',
  '&:hover': {
    borderBottomColor: 'linkPrimary',
  },
}

export const linkSilent: ThemeUIStyleObject = {
  cursor: 'pointer',
  color: 'textTertiary',
  textDecoration: 'none',
  '&:hover': {
    color: 'linkHover',
  },
}

export const linkButton: ThemeUIStyleObject = {
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
  borderRadius: 'default',
  '&:hover': {
    borderColor: 'buttonBorderHover',
  },
}
export const linkScale: ThemeUIStyleObject = {
  display: 'block',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'transform .2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}

export const linkHighlight: ThemeUIStyleObject = {
  cursor: 'pointer',
  display: 'block',
  textDecoration: 'none',
  border: '2px solid',
  borderColor: 'borderPrimary',
  borderRadius: 'default',
  transition: 'transform .2s',
  '&:hover': {
    backgroundColor: 'linkHoverBackground',
    borderColor: 'backgroundSecondary',
    transform: 'scale(1.025)',
  },
}
