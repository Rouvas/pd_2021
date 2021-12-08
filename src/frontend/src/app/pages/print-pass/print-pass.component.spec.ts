import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPassComponent } from './print-pass.component';

describe('PrintPassComponent', () => {
  let component: PrintPassComponent;
  let fixture: ComponentFixture<PrintPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
