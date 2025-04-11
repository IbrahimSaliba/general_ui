import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingPageRoutingModule } from './upcoming-routing.module';

import { UpcomingPage } from './upcoming.page';
import { EventTableComponent } from 'src/app/components/event-table/event-table.component';
import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingPageRoutingModule,
    SharedModule,

  ],
  declarations: [UpcomingPage, EventTableComponent, EventModalComponent],
})
export class UpcomingPageModule {}
