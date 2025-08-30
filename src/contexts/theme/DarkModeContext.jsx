import { createContext, useContext, useEffect } from 'react'

import { useLocalStorageState } from '../../hooks/useLocalStorageState/useLocalStorageState'
import { LOCAL_STORAGE_KEY, THEME_TYPE } from '../../constants/config'

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    false,
    LOCAL_STORAGE_KEY.THEME
  )

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add(THEME_TYPE.DARK)
      document.documentElement.classList.remove(THEME_TYPE.LIGHT)
    } else {
      document.documentElement.classList.add(THEME_TYPE.LIGHT)
      document.documentElement.classList.remove(THEME_TYPE.DARK)
    }
  }, [isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider')

  return context
}

export { DarkModeProvider, useDarkMode }
