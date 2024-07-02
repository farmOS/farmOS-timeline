import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [eslint()],
    build: {
        lib: {
            entry: './src/index.js',
            name: 'farmOS-timeline',
            formats: ['cjs'],
            fileName: 'farmOS-timeline',
        }
    }
});