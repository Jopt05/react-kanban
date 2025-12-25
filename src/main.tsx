import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routers/AppRouter.tsx'
import { AuthProvider } from './context/auth.context.tsx'
import { BoardProvider } from './context/board.context.tsx'

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <BoardProvider>
        {children}
      </BoardProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppState>
        <AppRouter />
      </AppState>
    </BrowserRouter>
  </StrictMode>,
)