import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FrontViewComponent} from './front-view.component';

describe('FrontViewComponent', () => {
  let component: FrontViewComponent;
  let fixture: ComponentFixture<FrontViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
