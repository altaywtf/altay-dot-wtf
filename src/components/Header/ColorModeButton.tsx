import { useCallback } from 'react'
import { useColorMode } from 'theme-ui'
import { CgSun, CgMoon } from 'react-icons/cg'
import { Button } from 'theme-ui'

const ColorModeButton = () => {
  const [colorMode, setColorMode] = useColorMode()
  const handleClick = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }, [colorMode, setColorMode])

  return (
    <Button
      title="That's a button to switch between dark and light themes."
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        backgroundColor: 'background',
        color: 'textSecondary',
        fontSize: 0,
        borderRadius: 'default',
        padding: 0,
        width: 36,
        height: 28,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: 'backgroundSecondary',
          color: 'text',
        },
      }}
    >
      {colorMode === 'light' ? <CgSun /> : <CgMoon />}
    </Button>
  )
}

export default ColorModeButton