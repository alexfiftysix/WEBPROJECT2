import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {
  accountType = 'for a BANDZ account';
  onSwap = false;
  fanIsChosen;
  venueIsChosen;
  bandIsChosen;
  hideSecondStep = true;
  isLoginFormVisible = false;
  trigger = false;
  @Output() public SubmitEvent = new EventEmitter();
  @Output() public submissionSecondStepEvent = new EventEmitter();
  @Output() public theTypeOfTheAccountEvent = new EventEmitter();
  @Output() public openLoginFormEvent = new EventEmitter();
  closeSubmissionForm() {
    console.log('close it');
    // closes the submission form using 'x'



    this.trigger = false;
    this.SubmitEvent.emit(this.trigger);
  }
  redirecttoLogin() {
    // redirects the user to LoginForm
    this.closeSubmissionForm();
    this.onSwap = true;
    this.openLoginFormEvent.emit(this.onSwap);
  }

  showRegistrationForm(event) {
    console.log(event.target);
    const elementId: string = (event.target as Element).id;
    console.log('You clicked on registration event');
    switch (elementId) {
      case 'fanButton':
      case 'fanCard':
      
        this.fanIsChosen = 1;
        this.accountType = 'fan ';
        this.submissionSecondStepEvent.emit(this.trigger);
        this.theTypeOfTheAccountEvent.emit(this.accountType);
        this.closeSubmissionForm();
        break;
      case 'bandCard':
      case 'bandButton':
        this.bandIsChosen = 2;
        this.accountType = 'band ';
        this.submissionSecondStepEvent.emit(this.trigger);
        this.theTypeOfTheAccountEvent.emit(this.accountType);
        this.closeSubmissionForm();
        break;
      case 'venueCard':
      case 'venueButton':
        console.log('venueCard');
        this.venueIsChosen = 3;
        this.accountType = 'venue manager ';
        this.submissionSecondStepEvent.emit(this.trigger);
        this.theTypeOfTheAccountEvent.emit(this.accountType);
        this.closeSubmissionForm();
        break;
      default:
    }
    // Register what type of account. Passed later to backend
  }

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

}
