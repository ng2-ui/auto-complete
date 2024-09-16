import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public links = [{name: 'Directive', url: '/directive-test'}, {name: 'Component', url: '/component-test'}];
  public activeLink: string = '/directive-test';

  constructor(public router: Router) {
  }

}
