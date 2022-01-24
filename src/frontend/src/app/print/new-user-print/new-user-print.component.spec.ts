import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserPrintComponent } from './new-user-print.component';

describe('NewUserPrintComponent', () => {
  let component: NewUserPrintComponent;
  let fixture: ComponentFixture<NewUserPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
