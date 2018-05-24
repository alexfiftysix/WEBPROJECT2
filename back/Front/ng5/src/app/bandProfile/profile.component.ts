import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EventsDataService} from '../front-view/suggestions/events.service';
import {Router, ActivatedRoute, NavigationEnd, Params} from '@angular/router';
import {BandsDataService} from '../front-view/suggestions/bands.service';
import {ChatBoxComponent} from './chat-box.component';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {Http, Response} from '@angular/http';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import {CreateNewBandComponent} from '../create-new-band/create-new-band.component';
import {ProfileDoesNotExistComponent} from "../profile-does-not-exist/profile-does-not-exist.component";
import {ProfileDeleteComponent} from "../profile-delete/profile-delete.component";
import {CreateEventComponent} from "../create-event/create-event.component";

>>>>>>> 18825f002b64b2b2f5fd3015d9a0f96ba9a8157f
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
  bandId: string;
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
  image: string;
  spotifyPlayerLink = 'https://open.spotify.com/embed?uri=spotify:artist:36QJpDe2go2KgaRleHCDTp';
  gigs = {};

  constructor(
    private bandService: BandsDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private eventService: EventsDataService,
    private http: Http,
    public dialog: MatDialog
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bandId = this.activatedRoute.snapshot.params['bandId'];
      this.getBand(this.bandId);
      this.getEvents('');
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
    });

  }

  /**
   * Gets all events by this artist into the events array
   */
  getEvents(query: string) {
    this.searching = true;
    let allEvents;
    return this.eventService.getEvents(query).subscribe(data => {
        allEvents = data.events;
      }, error => console.log(error),
      () => {
        this.searching = false;
        allEvents.forEach(event => {
          if (event['headlinerId'] == this.bandId) {
            this.events.push(event);
          }
        });
      });
  }

  toggleChatBox() {
    this.state = (this.state === 'normal' ? 'smaller' : 'normal');
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

<<<<<<< HEAD
  constructor(private bandService: BandsDataService,
      private activedRoute: ActivatedRoute,
      private router: Router,
      public authService: AuthService,
      private eventService: EventsDataService,
      private http: Http,
      private _HTTP: HttpClient
    ) {
=======
  sendPayment(eventId) {
    console.log(eventId);
    return this.http.post('http://52.40.161.160:3000/pay/' + eventId, '')
      .map(res => res.json());
>>>>>>> 18825f002b64b2b2f5fd3015d9a0f96ba9a8157f
  }

  buyTickets(eventId) {
    this.sendPayment(eventId).subscribe((payment) => {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          console.log(payment.links[i].href);
          window.location.href = payment.links[i].href;
        }
      }
    });
  }

  getBand(bandId) {
    this.bandService.getBandbyId(bandId).subscribe(data => {
        this.band = data;
      }, error => console.log(error),
      () => {
        this.searching = false;
        console.log('Band ' + bandId + ' fetch completed');
        this.image = this.sanitizeImageLink(this.band['image']);
        console.log(this.image);
        if (this.band['music'] != null && this.band['music'] != '') {
          this.spotifyPlayerLink = this.band['music'];
        }
      }
    );

<<<<<<< HEAD
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
=======
  }

  toggleContentGigs() {
    this.showContent = !this.showContent;
    this.showGigs = !this.showGigs;
>>>>>>> 18825f002b64b2b2f5fd3015d9a0f96ba9a8157f
  }

  createNew() {
    const dialogRef = this.dialog.open(CreateNewBandComponent);
  }

  noProfile() {
    this.dialog.open(ProfileDoesNotExistComponent, {
      data: {
        id: this.bandId
      }
    });
  }

  deleteProfile() {
    this.dialog.open(ProfileDeleteComponent, {
      data: {
        id: this.bandId,
        name: this.band['name'],
        url: 'http://52.40.161.160:3000/bands/' //todo: Get sensibly
      }
    })
  }

  /**
   * Replaces all '\' with '/' and ' ' with '%20' to allow image lookups with back-slashes and spaces
   */
  sanitizeImageLink(link: string) {
    return link.replace(/\\/g, '/').replace(/ /g, '%20');
  }

  createEvent() {
    this.dialog.open(CreateEventComponent, {
      data: {
        id: this.bandId
      }
    });
  }
}
