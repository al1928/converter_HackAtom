import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformOutComponent } from './inform-out.component';

describe('InformOutComponent', () => {
  let component: InformOutComponent;
  let fixture: ComponentFixture<InformOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
