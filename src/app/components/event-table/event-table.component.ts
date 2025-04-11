import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { HttpClient } from '@angular/common/http';
interface Event {
  title: string;
  description: string;
  photo: string;
  date: string;
  status: string;
}
@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss'],
})
export class EventTableComponent implements OnInit {


  filteredEvents: Event[] = [];
  searchTerm = '';
  selectedStatus = '';
  selectedEvent: Event | null = null;
  isModalOpen = false;

  @Input() events: Event[] = [];

  constructor(private modalController: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.filteredEvents = this.events;
    
  }

  filterEvents() {
    const term = this.searchTerm.toLowerCase();
    const status = this.selectedStatus;
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(term) &&
      (status === '' || event.status === status)
    );
  }

  async editEvent(event: Event) {
    this.selectedEvent = event;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateEvent(updatedEvent: Event) {
    // Update the event in your list
    this.isModalOpen = false;
  }

  purgeEvent(event: Event) {
    this.events = this.events.filter(e => e !== event);
    this.filteredEvents = this.filteredEvents.filter(e => e !== event);
    this.isModalOpen = false;
  }
}