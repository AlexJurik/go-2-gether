import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BonusesPage } from './bonuses-page.component';

const routes: Routes = [
  {
    path: '',
    component: BonusesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusesPageRoutingModule {
}
