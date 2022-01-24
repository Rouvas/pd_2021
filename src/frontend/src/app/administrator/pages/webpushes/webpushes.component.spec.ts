import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpushesComponent } from './webpushes.component';

describe('WebpushesComponent', () => {
  let component: WebpushesComponent;
  let fixture: ComponentFixture<WebpushesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpushesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpushesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
