import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerMainComponent } from './worker-main.component';

describe('WorkerMainComponent', () => {
  let component: WorkerMainComponent;
  let fixture: ComponentFixture<WorkerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
