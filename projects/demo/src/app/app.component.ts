import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BUILD_INFO } from './build-info';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  public links = [{name: 'Directive', url: '/directive-test'}, {name: 'Component', url: '/component-test'}];
  public activeLink: string = '/directive-test';
  public readonly buildTime = BUILD_INFO.timestamp;

  constructor(public router: Router) {
  }

}
