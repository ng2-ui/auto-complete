import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <a href="" routerLink="/directive-test">Directive</a>
    <a href="" routerLink="/component-test">Component</a>
    <router-outlet></router-outlet>`
})
export class AppComponent {
}
