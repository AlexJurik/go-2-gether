import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BonusesPageRoutingModule } from './bonuses-routing.module';
import { BonusesPage } from './bonuses-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BonusesPageRoutingModule
  ],
  declarations: [BonusesPage]
})
export class BonusesPageModule {
}
