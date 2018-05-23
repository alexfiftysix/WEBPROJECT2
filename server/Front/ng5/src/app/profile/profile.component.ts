import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import { EventsDataService } from '../front-view/suggestions/events.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  event;
  searching: Boolean = false;
  userOwnsThisProfile = true;
  editingBio = false;
  editingHeadInfo = false;
  isBand = true;
  isVenue = false;
  banner = 'url("../../assets/images/band.jpg") no-repeat center';
  bio = 'Street Pieces formed in 2012 and soon began playing across their home state. After cutting their teeth on the live circuit they ' +
    'released their first EP featuring ‘Run’, earning them a support slot for Wolfmother and the title of ‘best band in Brisbane’ from' +
    ' Ugly Phil of Triple M. Coming off the success of their first single and a string of blistering live shows Street Pieces entered the' +
    ' studio with Jeff Lovejoy (Powderfinger, Tex Perkins) and released ‘Sacrifice’ (2015) and ‘Bad Kind of Woman’ (2016) which soon had' +
    ' them back on the road with rock heavyweights Shihad (NZ), The Bellrays (US) and Richie Ramone (US). This year with new bassist Jon' +
    ' Mengede in the mix Street Pieces released \'Monster\', a frenzied psychedelic blues jam featured in Blunt Magazine and followed up' +
    ' with an unforgettable show as they officially released \'Everything You Ever Wanted\' at The Foundry.\n' + '\n' + 'Listen below...';
  rateDropDown = false;
  gigs = [
    // Order these by date please. Happens in the DB don't worry about it here
    {
      'name': 'The Best Gig Ever',
      'venue': 'Top Club',
      'city': 'Brisbane',
      'date': '12/05/2018',
      'thumbnail': '../../assets/images/band3.jpg'
    },
    {
      'name': 'Great Gig',
      'venue': 'Metal Town',
      'city': 'Sydney',
      'date': '20/05/2018',
      'thumbnail': '../../assets/images/band3.jpg'
    },
    {
      'name': 'Jazz gig in Jazz town',
      'venue': 'Jazz Club',
      'city': 'Melbourne',
      'date': '01/07/2018',
      'thumbnail': '../../assets/images/band3.jpg'
    }
  ];
  showContent = true;
  showGigs = false;

  rate() {
    // console.log('Rate');
    this.rateDropDown = !this.rateDropDown;
  }

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventsDataService) {}

  ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['eventId'];
    this.getEvent(eventId);
  }
  getEvent(eventId) {
    this.eventService.getEventById(eventId).subscribe(data => {
      this.event = data;
      console.log(this.event);
  }, error => console.log(error),
  () => {
    this.searching = false;
    console.log('Band' + eventId +  ' fetched completed');
  }
);
  }
  toggleContentGigs() {
    this.showContent = !this.showContent;
    this.showGigs = !this.showGigs;
  }

  showBioEditButton() {
    return this.userOwnsThisProfile && !this.editingBio;
  }

  enableEditBio() {
    this.editingBio = true;
  }

  submitBioEdit(value: string) {
    this.editingBio = false;
    this.bio = value;
  }

  showHeadEditButton() {
    return this.userOwnsThisProfile && !this.editingHeadInfo;
  }

  enableEditHead() {
    this.editingHeadInfo = true;
  }

  // submitHeadEdit(title: string, location: string, genre: string) {
  //   this.editingHeadInfo = false;
  //   this.title = title;
  //   this.location = location;
  //   this.genre = genre;
  // }
}
