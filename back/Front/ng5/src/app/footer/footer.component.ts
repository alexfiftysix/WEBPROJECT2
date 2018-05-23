import { Component, OnInit, Inject, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() public SubmitEvent = new EventEmitter();
  submitTrigger = false;

  openSubmitForm() {
    // sends an event emitter to the AppComponent to show the Submit window
    this.submitTrigger = true;
    this.SubmitEvent.emit(this.submitTrigger);
  }
  constructor() { }

  ngOnInit() {
  }

}
