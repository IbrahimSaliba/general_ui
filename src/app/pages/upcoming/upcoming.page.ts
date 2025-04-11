import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
interface Event {
  title: string;
  description: string;
  photo: string;
  date: string;
  status: string;
}
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  user: any;
  events: Event[] = [];

  @Input() eventss: Event[] = [];

  filteredEvents: Event[] = [];
  searchTerm = '';
  selectedStatus = '';
  selectedEvent: Event | null = null;
  isModalOpen = false;

  constructor(private http : HttpClient) { }

  ngOnInit() {

    this.http.post("http://localhost:8080/api/upcomingEventsController/listEvents", null).subscribe((res: any) => {
      this.events = res;
      console.log(this.events);

    });
    this.filteredEvents = this.eventss;

  }
  onUserDetailsLoaded(data: any) {
    this.user = data;
  }

  filterEvents() {
    const term = this.searchTerm.toLowerCase();
    const status = this.selectedStatus;
    this.filteredEvents = this.eventss.filter(event =>
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
    this.eventss = this.eventss.filter(e => e !== event);
    this.filteredEvents = this.filteredEvents.filter(e => e !== event);
    this.isModalOpen = false;
  }
}
