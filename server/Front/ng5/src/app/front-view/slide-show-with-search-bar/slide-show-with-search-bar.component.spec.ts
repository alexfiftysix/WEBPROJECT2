import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SlideShowWithSearchBarComponent} from './slide-show-with-search-bar.component';

describe('SlideShowWithSearchBarComponent', () => {
  let component: SlideShowWithSearchBarComponent;
  let fixture: ComponentFixture<SlideShowWithSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideShowWithSearchBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowWithSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
