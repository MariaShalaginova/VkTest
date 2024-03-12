import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider>
    <AdaptivityProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AdaptivityProvider>
  </ConfigProvider>,
)
