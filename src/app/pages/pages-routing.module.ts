import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ComodoComponent } from './comodo/comodo.component';
import { ComodoDetailComponent } from './comodo/detail/detail.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'casa',
      component: ComodoComponent,
    },
    {
      path: 'casa/comodo/create',
      component: ComodoDetailComponent,
    },
    {
      path: 'casa/comodo/:id',
      component: ComodoDetailComponent,
    },
    {
      path: '',
      redirectTo: 'casa',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
