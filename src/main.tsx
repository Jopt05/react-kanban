import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routers/AppRouter.tsx'
import { AuthProvider } from './context/auth.context.tsx'
import { BoardProvider } from './context/board.context.tsx'
import { ModalProvider } from './context/modal.context.tsx'

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <BoardProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </BoardProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AppState>
        <AppRouter />
      </AppState>
    </BrowserRouter>
)