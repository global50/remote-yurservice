import React from 'react'
import ReactDOM from 'react-dom/client'
import { YurServicePage } from './components/yurservice/YurServicePage'
import { Toaster } from '@shared/components/ui/toaster'
import './index.css'

if (import.meta.env.DEV) {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <div className="min-h-screen bg-background p-4">
          <YurServicePage />
        </div>
        <Toaster />
      </React.StrictMode>
    )
  }
}

export { YurServicePage } from './components/yurservice/YurServicePage'
export type { YurServiceResource, Region } from './types/database'
export type { Resource } from './types/resource'

