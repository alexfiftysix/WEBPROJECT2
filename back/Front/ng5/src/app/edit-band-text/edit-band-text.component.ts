import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-band-text',
  templateUrl: './edit-band-text.component.html',
  styleUrls: ['./edit-band-text.component.scss']
})
export class EditBandTextComponent implements OnInit {

  id: string;
  name: string;
  genre: string;
  location: string;
  spotifyPlayerLink: string;
  bio: string;
  waiting: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialogRef: MatDialogRef<EditBandTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.id = this.data['id'];
    this.name = this.data['name'];
    this.genre = this.data['genre'];
    this.location = this.data['location'];
    this.bio = this.data['bio'];
    this.spotifyPlayerLink = this.data['spotifyPlayerLink'];
  }

  /**
   * takes a spotify web player url and converts it to a spotify embed link
   * @param {string} spotifyLink
   */
  extractSpotifyLink(spotifyLink: string) {
    //todo: test this.
    // input = 'https://open.spotify.com/album/00Sakx8QohezyzMAd99gqO';
    // result = 'https://open.spotify.com/embed?uri=spotify:album:00Sakx8QohezyzMAd99gqO';

    if (spotifyLink.substring(0, 30) == 'https://open.spotify.com/embed') {
      return spotifyLink;
    }

    const head = 'https://open.spotify.com/embed?uri=spotify:';
    const splitty = spotifyLink.split('/');
    const type = splitty[3] + ':';
    const id = splitty[4];
    const combined = head + type + id;
    return (combined);
  }

  confirmSelection() {
    this.waiting = true;
    const url = 'http://52.40.161.160:3000/bands/' + this.id;
    const body = [
      {propName: 'name', value: this.name},
      {propName: 'genre', value: this.genre},
      {propName: 'city', value: this.location},
      {propName: 'description', value: this.bio},
      {propName: 'music', value: this.extractSpotifyLink(this.spotifyPlayerLink)}
    ];

    this.httpClient.patch(url, body)
      .subscribe(data => {
          console.log(data);
          // console.log(newId);
          this.dialogRef.close({
            name: this.name,
            location: this.location,
            bio: this.bio,
            genre: this.genre,
            spotifyPlayerLink: this.extractSpotifyLink(this.spotifyPlayerLink)
          });
        },
        error => {
          console.log(error);
        }
      );
  }
}
