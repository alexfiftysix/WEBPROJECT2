import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventsDataService} from "./suggestions/events.service";

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.scss']
})
export class FrontViewComponent implements OnInit {
  public events;

  constructor(
    public router: Router,
    private eventService: EventsDataService
  ) {
  }

  ngOnInit() {
    this.events = null;
    this.getEvents('');
  }

  redirectToEventProfile(eventId) {
    this.router.navigate(['/eventDetails', eventId]);
  }

  getEvents(query: string) {
    return this.eventService.getEvents(query).subscribe(data => {
        this.events = data.events;
        console.log(data);
      }, error => console.log(error),
      () => {
        console.log('Events fetched completed');
      });
  }

}
