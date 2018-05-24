import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { EventsDataService} from '../../app/front-view/suggestions/events.service';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { BandsDataService } from '../front-view/suggestions/bands.service';
import {ChatBoxComponent} from '../bandProfile/chat-box.component';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {Http, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('resizeProfile', [
      state('normal', style({
        width: '100%'
      })),
      state('smaller', style({
        width: '60vw'
      })),

      transition('normal <=> smaller', animate('300ms ease-in'))
    ]),
  ]
})

export class BandProfileComponent implements OnInit {
  bandCampLink = 'https://bandcamp.com/EmbeddedPlayer/album=77046358/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/';
  band;
  events = [];
  searching: Boolean = false;
  isBand = true;
  isVenue = false;
  rateDropDown = false;
  showContent = true;
  showGigs = false;
  isChatBoxActive = false;
  state = 'normal';
  toogleChatBox() {
    this.state = (this.state === 'normal' ? 'smaller' : 'normal' );
    if (this.isChatBoxActive) {
      setTimeout(() => {
        this.isChatBoxActive = !this.isChatBoxActive;
      }, 300);
    } else {
      this.isChatBoxActive = !this.isChatBoxActive;
    }

  }
  rate() {
    // console.log('Rate');
    this.rateDropDown = !this.rateDropDown;
  }

  constructor(private bandService: BandsDataService,
      private activedRoute: ActivatedRoute,
      private router: Router,
      public authService: AuthService,
      private eventService: EventsDataService,
      private http: Http,
      private _HTTP: HttpClient
    ) {
  }

  public ngOnInit() {
    const bandId = this.activedRoute.snapshot.params['bandId'];
    this.getBand(bandId);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
}
getEvents(query: string) {
  this.searching = true;
  return this.eventService.getEvents(query).subscribe(data => {
    this.events = data.events;
    console.log( this.events);
}, error => console.log(error),
() => {
  console.log('Events fetched completed');
});
}

generatePDF() {
  const name = 'Maciej';
  const description = 'alsla';
  const headers: any = new HttpHeaders({
    'Content-Type': 'application/json' }),
      options: any = { name : name, description : description },
      url: any = 'http://localhost:3000/pdf/';

  this._HTTP
  .get(url, { responseType: 'arraybuffer' })
  .subscribe((data: any) => {
     // If the request was successful notify the user
    //  this.displayNotification(name + ' was successfully created');
    window.open(URL.createObjectURL(
        new Blob([data], {type: 'application/pdf'})));
    console.log('succes');
  },
  (error: any) => {
     console.dir(error);
  });
}

sendPayment(eventId) {
  console.log(eventId);
  return this.http.post('http://localhost:3000/pay/' + eventId, '')
    .map(res => res.json());
  }

  buyTickets(eventId) {
  this.sendPayment(eventId).subscribe((payment) => {
   for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                  window.location.href = payment.links[i].href;
                }
            }
   });
  }
getBand(bandId) {
  this.bandService.getBandbyId(bandId).subscribe(data => {
    this.band =  data;
}, error => console.log(error),
() => {
  this.searching = false;
  console.log('Band' + bandId +  ' fetched completed');
}
);

}

toggleContentGigs() {
  this.showContent = !this.showContent;
  this.showGigs = !this.showGigs;
}



}
