import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectiveTestComponent } from './directive-test/directive-test.component';
import { ComponentTestComponent } from './component-test/component-test.component';

const routes: Routes = [
  {
    path: 'directive-test', component: DirectiveTestComponent
  }, {
    path: 'component-test', component: ComponentTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
