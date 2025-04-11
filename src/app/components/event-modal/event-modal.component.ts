import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Event {
  title: string;
  description: string;
  photo: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent  {

  @Input() event: any;
  @Output() save = new EventEmitter<any>();
  @Output() purge = new EventEmitter<any>();

  constructor(private modalController: ModalController) {}


  saveEvent() {
    this.save.emit(this.event);
    console.log(this.event);
    this.modalController.dismiss();
  }
  purgeEvent() {
    this.purge.emit(this.event);
  }
 

}
