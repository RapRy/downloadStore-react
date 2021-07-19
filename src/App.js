import React, { lazy, Suspense } from 'react'
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core'

const Auth = lazy(() => import('./components/Auth/Auth'))

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(69, 217, 226, 1)',
      light: 'rgba(142, 255, 102, 1)',
      dark: 'rgba(32, 124, 232, 1)',
    },
    secondary: {
      main: 'rgba(226, 69, 69, 1)',
      light: 'rgba(255, 102, 102)'
    },
    neutrals: {
      main: 'rgba(224, 224, 224, 1)',
      light: 'rgba(242, 242, 242, 1)',
      dark: 'rgba(64, 58, 58, 1)',
      contrastText: 'rgba(0, 0, 0, 1)'
    }
  },
  shadows: [
    'none',
    '0px 0px 10px rgba(0, 0, 0, .25)',
    '2px 2px 4px rgba(142, 255, 102,.25)',
    '2px 2px 4px rgba(32, 124, 232,.25)'
  ],
  shape: {
    borderRadiusFive: 5,
    borderRadiusTen: 10
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={`<p>loading...</p>`}>
          <Auth />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
