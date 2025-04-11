import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[SideMenuComponent]
})
export class SharedModule { }
