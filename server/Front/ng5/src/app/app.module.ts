import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordStrengthBarModule} from 'ng2-password-strength-bar';
import {Routes, RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {AuthService} from '../services/auth.service';
import { AuthGuard} from '../guards/auth.guard';
/** Material IO imports */
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule,
        MatNativeDateModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
/** !Material IO imports */
/** NG components */
// import {AccordionModule} from 'primeng/components/accordion/accordion';
// import {MenuItem} from 'primeng/components/common/api';
/** !NG components */
import {MatSliderModule} from '@angular/material/slider';
import {AppComponent} from './app.component';
import {DataService} from './data.service';
import {ExtraComponent} from './extra/extra.component';
import {BandSliderComponent} from './band-slider/band-slider.component';
import {VenueSliderComponent} from './venue-slider/venue-slider.component';
import {SlideShowWithSearchBarComponent} from './front-view/slide-show-with-search-bar/slide-show-with-search-bar.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {SubmitFormComponent} from './submit-form/submit-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {SuggestionsComponent} from './front-view/suggestions/suggestions.component';
import {BandCardComponent} from './front-view/band-card/band-card.component';
import {SubmissionFormNextStepComponent} from './submission-form-next-step/submission-form-next-step.component';
import {EventCardComponent} from './front-view/event-card/event-card.component';
import {MainViewComponent, MainBandSuggestionsComponent} from './main-view/main-view.component';
import {FrontViewComponent} from './front-view/front-view.component';
import { BandProfileComponent } from './bandProfile/profile.component';
import { ProfileComponent} from './profile/profile.component';
import { EventsDataService } from './front-view/suggestions/events.service';
import {BandsDataService} from './front-view/suggestions/bands.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { StarRatingModule } from 'angular-star-rating';
import { CardHoverDirective } from '../directives/card-hover.directive';
import {SliderModule} from 'primeng/slider';
import { EventSearchFilter } from '../../src/pipes/order-by-date.pipe';
import * as moment from 'moment';
import { ChatBoxComponent } from './bandProfile/chat-box.component';
import { SafeUrlPipe } from '../../src/pipes/safe-url.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ExtraComponent,
    BandSliderComponent,
    VenueSliderComponent,
    SlideShowWithSearchBarComponent,
    FooterComponent,
    HeaderComponent,
    SuggestionsComponent,
    SubmitFormComponent,
    LoginFormComponent,
    SuggestionsComponent,
    SubmissionFormNextStepComponent,
    BandCardComponent,
    EventCardComponent,
    MainViewComponent,
    FrontViewComponent,
    ProfileComponent,
    MainBandSuggestionsComponent,
    BandProfileComponent,
    CardHoverDirective,
    EventSearchFilter,
    ChatBoxComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    PasswordStrengthBarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    HttpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    SliderModule,
    MatProgressBarModule,
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDafSVEi1nNB5qre5tuA57GK08m6ybLdqw'
    })
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  entryComponents: [
  ],
  providers: [
    MatDatepickerModule,
    DataService,
    BandSliderComponent,
    BandsDataService,
    EventsDataService,
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})


export class AppModule {

}

export class MaterialModule {
}
