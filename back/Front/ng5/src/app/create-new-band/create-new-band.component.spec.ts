import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBandComponent } from './create-new-band.component';

describe('CreateNewBandComponent', () => {
  let component: CreateNewBandComponent;
  let fixture: ComponentFixture<CreateNewBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
