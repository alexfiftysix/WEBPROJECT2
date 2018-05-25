import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatSnackBarConfig} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {EventsDataService} from './front-view/suggestions/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public events;
  isSubmitActive = false;
  isLoginActive = false;
  isAccountChosen = false;
  accountType = '';
  title = 'app';

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    private eventService: EventsDataService
  ) {
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

  ngOnInit() {
    this.getEvents('');
  }
}
