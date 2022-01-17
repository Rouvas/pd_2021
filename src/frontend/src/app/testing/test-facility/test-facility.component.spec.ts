import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFacilityComponent } from './test-facility.component';

describe('TestFacilityComponent', () => {
  let component: TestFacilityComponent;
  let fixture: ComponentFixture<TestFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFacilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
