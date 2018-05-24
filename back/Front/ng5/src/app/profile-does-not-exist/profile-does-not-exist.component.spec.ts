import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDoesNotExistComponent } from './profile-does-not-exist.component';

describe('ProfileDoesNotExistComponent', () => {
  let component: ProfileDoesNotExistComponent;
  let fixture: ComponentFixture<ProfileDoesNotExistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDoesNotExistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDoesNotExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
