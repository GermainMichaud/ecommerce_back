import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/utils/setupTests.ts'],
    watch: false,
    reporters: ['verbose'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.{test,spec}.ts',
        'src/utils/setupTests.ts',
        'src/utils/swagger.ts',
      ],
      provider: 'c8',
      all: true,
    },
  },
});
