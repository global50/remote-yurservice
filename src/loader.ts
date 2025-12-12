export interface YurServiceMicrofrontendConfig {
  url?: string
  supabaseUrl?: string
  supabaseAnonKey?: string
}

let microfrontendModule: any = null
let loadingPromise: Promise<any> | null = null

export async function loadYurServiceMicrofrontend(
  config: YurServiceMicrofrontendConfig = {}
): Promise<any> {
  if (microfrontendModule) {
    return microfrontendModule
  }

  if (loadingPromise) {
    return loadingPromise
  }

  loadingPromise = (async () => {
    try {
      const url = config.url || 'http://localhost:3001'
      
      if (config.supabaseUrl) {
        (window as any).__YURSERVICE_SUPABASE_URL__ = config.supabaseUrl
      }
      if (config.supabaseAnonKey) {
        (window as any).__YURSERVICE_SUPABASE_ANON_KEY__ = config.supabaseAnonKey
      }

      const script = document.createElement('script')
      script.type = 'module'
      script.src = `${url}/src/main.tsx`
      
      if (import.meta.env.PROD) {
        script.src = `${url}/dist/yurservice-microfrontend.js`
      }

      document.head.appendChild(script)

      return new Promise((resolve, reject) => {
        script.onload = () => {
          const module = (window as any).YurServiceMicrofrontend
          if (module) {
            microfrontendModule = module
            resolve(module)
          } else {
            reject(new Error('Microfrontend module not found'))
          }
        }
        script.onerror = () => {
          reject(new Error('Failed to load microfrontend'))
        }
      })
    } catch (error) {
      loadingPromise = null
      throw error
    }
  })()

  return loadingPromise
}

