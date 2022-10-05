import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/utils/setupTests.ts'],
    watch: false,
    reporters: ['verbose'],
    include: ['src/**/*.test.ts'],
    exclude: ['src/utils/seeder.ts', 'node_modules'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.{test,spec}.ts',
        'src/utils/setupTests.ts',
        'src/utils/swagger.ts',
        'src/utils/seeder.ts',
      ],
      provider: 'c8',
      all: true,
    },
  },
});
