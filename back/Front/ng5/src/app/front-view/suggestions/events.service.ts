import {Injectable} from '@angular/core';
import {IEvents} from '../../../interfaces/IEvents';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {URLSearchParams} from '@angular/http';
@Injectable()
export class EventsDataService {

  private _eventsURL = 'http://52.40.161.160:3000/events/';
  private perPage: String = '&per_page=10';
constructor(private http: Http) {}
getEvents(searchQuery: string) {
  // get all the Events from the server
  const search = new URLSearchParams();
  if (searchQuery === undefined) {
    searchQuery = '';
  }
  search.set('query', searchQuery);
  return this.http
  .get(this._eventsURL, {search}).map(res => {
    const results =  res.json();
    return results;
  });
}
public getEventById(id: number) {
  return this.http
  .get(this._eventsURL + id).map(res => {
    const results =  res.json();
    return results;
  });
}
private handleError(error: Response) {
  return Observable.throw(error.statusText);
}
}
