import { ThemeUIStyleObject } from 'theme-ui'

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
