import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylelint from 'vite-plugin-stylelint';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  }), stylelint({
    fix: true,
  }), eslint()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/variables.scss";`
      }
    }
  }
})
