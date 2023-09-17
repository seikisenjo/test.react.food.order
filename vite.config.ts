import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const resolvedPath = (directory: string) => path.join(__dirname, directory);

export default ({ mode }: any) => {
  const processEnv = loadEnv(mode, process.cwd());

  return defineConfig({
  plugins: [react()],
  server: {
    port: processEnv.VITE_PORT ? parseInt(processEnv.VITE_PORT) : 8002,
  },
  base: processEnv.VITE_APP_BASENAME ?? '/',
  resolve: {
    alias: {
      '@assets': resolvedPath('./src/assets'),
      '@core': resolvedPath('./src/core'),
      '@components': resolvedPath('./src/components'),
      '@constant': resolvedPath('./src/constant'),
      '@locales': resolvedPath('./src/locales'),
      '@pages': resolvedPath('./src/pages'),
      '@reducers': resolvedPath('./src/reducers'),
    },
  },
})
}
