import {Component, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EventsDataService} from '../front-view/suggestions/events.service';
import {Router, ActivatedRoute, NavigationEnd, Params} from '@angular/router';
import {BandsDataService} from '../front-view/suggestions/bands.service';
import {ChatBoxComponent} from './chat-box.component';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import {Http, Response} from '@angular/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

import {CreateNewBandComponent} from '../create-new-band/create-new-band.component';
import {ProfileDoesNotExistComponent} from "../profile-does-not-exist/profile-does-not-exist.component";
import {ProfileDeleteComponent} from "../profile-delete/profile-delete.component";

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

  getEvents(query: string) {
    this.searching = true;
    let allEvents;
    return this.eventService.getEvents(query).subscribe(data => {
        allEvents = data.events;
        console.log(data);
      }, error => console.log(error),
      () => {
        this.searching = false;
        console.log('Events fetched completed');
        allEvents.forEach(event => {
          console.log(event);
          console.log(event['_id']);
          console.log(event['headlinerId']);
          if (event['headlinerId'] == this.bandId){
            this.events.push(event);
          }
        });
        console.log(this.events);
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

  sendPayment(eventId) {
    console.log(eventId);
    return this.http.post('http://52.40.161.160:3000/pay/' + eventId, '')
      .map(res => res.json());
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

  }

  toggleContentGigs() {
    this.showContent = !this.showContent;
    this.showGigs = !this.showGigs;
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
}
