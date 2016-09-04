// // The browser platform with a compiler
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//
// // The app module
// import { AppModule } from './app.module';
//
// // Compile and launch the module
// platformBrowserDynamic().bootstrapModule(AppModule);


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './test/app.module';

// depending on the env mode, enable prod mode or add debugging modules
if (typeof process !== 'undefined' && process.env.ENV === 'build') {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}