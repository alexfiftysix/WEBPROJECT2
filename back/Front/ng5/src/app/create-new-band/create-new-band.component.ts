import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-new-band',
  templateUrl: './create-new-band.component.html',
  styleUrls: ['./create-new-band.component.scss']
})
export class CreateNewBandComponent implements OnInit {
  uploading: boolean = false;
  id: string = '';
  name: string = '';
  genre: string = '';
  location: string = '';
  banner: File = null;
  spotifyPlayerLink: string = '';
  bio: string = '';
  apiUrl: string = 'http://52.40.161.160:3000/bands/';
  phone: string = '';

  constructor(
    private router: Router,
    public httpClient: HttpClient,
    public dialogRef: MatDialogRef<CreateNewBandComponent>,
  ) {
  }

  ngOnInit() {
    console.log("Create band opened");
  }

  closeDialog() {
    this.dialogRef.close();
  }


  /**
   * takes a spotify web player url and converts it to a spotify embed link
   * @param {string} spotifyLink
   */
  extractSpotifyLink(spotifyLink: string): string {
    //todo: test this.
    // input = 'https://open.spotify.com/album/00Sakx8QohezyzMAd99gqO';
    // result = 'https://open.spotify.com/embed?uri=spotify:album:00Sakx8QohezyzMAd99gqO';
    const head = 'https://open.spotify.com/embed?uri=spotify:';
    const splitty = spotifyLink.split('/');
    const type = splitty[3] + ':';
    const id = splitty[4];
    const combined = head + type + id;
    return (combined);
  }

  create() {
    const url = this.apiUrl;
    this.uploading = true;

    let body = new FormData();
    body.append('name', this.name);
    body.append('city', this.location);
    body.append('genre', this.genre);
    body.append('price', '0');
    body.append('contactNumber', this.phone);
    body.append('availability', 'true');
    body.append('description', this.bio);
    body.append('bandImage', this.banner);
    body.append('music', this.extractSpotifyLink(this.spotifyPlayerLink));
    body.append('rating', '0');

    this.httpClient.post(url, body)
      .subscribe(data => {
          console.log(data);
          const newId = data['createdBand']['_id'];
          // console.log(newId);
          this.router.navigateByUrl('/bandDetails/' + newId);
          this.closeDialog();
        },
        error => {
          console.log(error);
        }
      );
  }

  handleFileInput(files: FileList) {
    this.banner = files.item(0);
  }

  formValid() {
    if (!this.requiredFieldsFilled){
      return false;
    }

    if (!this.imageUploaded()){
      return false;
    }

    if (!this.phoneValid()){
      return false;
    }

    return this.spotifyLinkValid();
  }

  spotifyLinkValid(){
    if (this.spotifyPlayerLink.length < 1) {
      return false;
    }
    let musicSplit = this.spotifyPlayerLink.split('/');

    if (musicSplit.length < 5) {
      return false;
    }
    if (musicSplit[2] != 'open.spotify.com') {
      return false;
    }
    if (musicSplit[3] != 'artist' && musicSplit[2] != 'band') {
      return false;
    }
    return true;
  }

  requiredFieldsFilled(){
    if (this.name.length < 1) {
      return false;
    }
    if (this.bio.length < 1) {
      return false;
    }
    return true;
  }

  imageUploaded(){
    //todo: Check file is jpg or png
    return this.banner;
  }

  phoneValid(){
    return /^[0-9 + +]{8,15}$/.test(this.phone);
  }

  //todo: validate phone number
}

