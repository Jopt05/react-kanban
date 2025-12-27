import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routers/AppRouter.tsx'
import { AuthProvider } from './context/auth.context.tsx'
import { BoardProvider } from './context/board.context.tsx'
import { ModalProvider } from './context/modal.context.tsx'
import LoaderComponent from './components/shared/Loader.component.tsx'
import { LoaderProvider } from './context/loader.context.tsx'

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <LoaderProvider>
        <BoardProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </BoardProvider>
      </LoaderProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AppState>
        <LoaderComponent />
        <AppRouter />
      </AppState>
    </BrowserRouter>
)