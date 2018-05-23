import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VenueSliderComponent} from './venue-slider.component';

describe('VenueSliderComponent', () => {
  let component: VenueSliderComponent;
  let fixture: ComponentFixture<VenueSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VenueSliderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
