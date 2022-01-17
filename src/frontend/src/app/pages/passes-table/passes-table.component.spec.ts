import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassesTableComponent } from './passes-table.component';

describe('PassesTableComponent', () => {
  let component: PassesTableComponent;
  let fixture: ComponentFixture<PassesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
