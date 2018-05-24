import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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
  spotifyPlayerLink: string;
  bio: string;
  apiUrl: string = 'http://52.40.161.160:3000/bands/';

  constructor(
    private router: Router,
    public httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    console.log("Create band opened");
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
    body.append('contactNumber', '0');
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
        },
        error => {
          console.log(error);
        }
      );
  }

  handleFileInput(files: FileList) {
    this.banner = files.item(0);
  }
}
