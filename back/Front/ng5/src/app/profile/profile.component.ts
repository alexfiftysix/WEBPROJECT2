import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EventsDataService} from '../front-view/suggestions/events.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';

import {ProfileDoesNotExistComponent} from "../profile-does-not-exist/profile-does-not-exist.component";
import {ProfileDeleteComponent} from "../profile-delete/profile-delete.component";

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
  baseUrl = 'http://ec2-54-191-122-200.us-west-2.compute.amazonaws.com:3000/bands/';
  bandName: string;

  id = '';
  title = '';
  genre = '';
  location = '';
  spotifyPlayerLink = '';
  banner = '';
  bio = '';
  price: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private eventService: EventsDataService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    // const eventId = this.activatedRoute.snapshot.params['eventId'];
    // this.getEvent(eventId);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['eventId'];
      console.log(this.id);

      this.setDataFromDB();
    });
  }

  setDataFromDB() {
    const url = 'http://' + '52.40.161.160' + ":3000/events/" + this.id;
    console.log(url);

    this.httpClient.get(url)
      .subscribe((data) => {
        console.log(data);
        this.title = data['name'];
        this.location = data['location']['city'];
        this.bio = data['description'];
        this.price = data['price'];
        this.banner = 'http://52.40.161.160:3000/' + this.sanitizeImageLink(data['image']);
        console.log(this.banner);
        this.spotifyPlayerLink = data['spotifyPlayerLink'];

        let headlinerId = data['headlinerId'];
        let bandUrl = 'http://52.40.161.160:3000/bands/' + headlinerId;
        this.httpClient.get(bandUrl).subscribe(data => {
          console.log(data);
          this.spotifyPlayerLink = data['music'];
          this.bandName = data['name'];
        })

      }, error1 => {
        console.log("There was an error!!!");
        this.dialog.open(ProfileDoesNotExistComponent, {
          data: {
            id: this.id
          }
        })
      });
  }

  deleteProfile() {
    const dialogRef = this.dialog.open(ProfileDeleteComponent, {
      data: {
        id: this.id,
        name: this.title,
        url: 'http://52.40.161.160:3000/events/'
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
