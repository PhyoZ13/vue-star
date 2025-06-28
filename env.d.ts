/// <reference types="vite/client" />
/// <reference types="jest" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_GAMES_API_URL: string
  readonly VITE_APP_JACKPOTS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
