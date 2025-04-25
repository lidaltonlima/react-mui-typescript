import { Box, ThemeProvider } from '@mui/material'
import { DarkTheme, LightTheme } from '../../themes'
import { useCallback, useMemo, useState } from 'react'
import { ThemeContext } from './ThemeContext'

interface IThemeProvider {
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === 'light' ? 'dark' : 'light'
    )
  }, [])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme
    return DarkTheme
  }, [themeName])

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ themeName, toggleTheme }}>
        <Box
          width={'100vw'}
          height={'100vh'}
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}
