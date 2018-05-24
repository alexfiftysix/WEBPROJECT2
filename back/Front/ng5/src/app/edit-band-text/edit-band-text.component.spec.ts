import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBandTextComponent } from './edit-band-text.component';

describe('EditBandTextComponent', () => {
  let component: EditBandTextComponent;
  let fixture: ComponentFixture<EditBandTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBandTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBandTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
