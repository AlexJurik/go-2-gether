import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard', pathMatch: 'full'
      }, {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'analytics',
        loadChildren: () => import('./components/analytics/analytics.module').then(m => m.AnalyticsPageModule)
      }, {
        path: 'bonuses',
        loadChildren: () => import('./components/bonuses/bonuses.module').then(m => m.BonusesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsPageModule)
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
