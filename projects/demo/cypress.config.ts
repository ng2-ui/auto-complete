import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200/auto-complete',
    supportFile: false,
    specPattern: 'projects/demo/**/*.cy.ts'
  }
});
