import { Routes } from '@angular/router';
import { DirectiveTestComponent } from './directive-test/directive-test.component';
import { ComponentTestComponent } from './component-test/component-test.component';

export const routes: Routes = [
  { path: '', redirectTo: 'directive-test', pathMatch: 'full' },
  { path: 'directive-test', component: DirectiveTestComponent },
  { path: 'component-test', component: ComponentTestComponent }
];
