import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DirectiveTestComponent } from './directive-test.component';
import { ComponentTestComponent } from './component-test.component';

export const routes: Routes = [
  { path: 'directive-test', component: DirectiveTestComponent },
  { path: 'component-test', component: ComponentTestComponent },
  { path: '',  redirectTo: '/directive-test', pathMatch: 'full' },
];

export const APP_ROUTER_PROVIDERS: ModuleWithProviders = RouterModule.forRoot(routes);
export const APP_ROUTER_COMPONENTS = [
  DirectiveTestComponent,
  ComponentTestComponent
];

