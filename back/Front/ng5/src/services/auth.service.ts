import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import {tokenNotExpired} from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {}
  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://52.40.161.160:3000/users/register', user, {headers: headers})
    .map(res => res.json());
  }
  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://52.40.161.160:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }
  getProfile() {
      const headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://52.40.161.160:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  logout() {
    this.authToken = null;
    this.user  = null;
    localStorage.clear();
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  checkEmailNotTaken(email: string) {
    // checks if email is taken
    return this.http
    .get('http://52.40.161.160:3000/users/' + email).map(res => res.json())
    .delay(1000);
}
}
