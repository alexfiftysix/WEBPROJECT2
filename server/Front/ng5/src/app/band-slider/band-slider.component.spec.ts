import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BandSliderComponent} from './band-slider.component';

describe('BandSliderComponent', () => {
  let component: BandSliderComponent;
  let fixture: ComponentFixture<BandSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BandSliderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
