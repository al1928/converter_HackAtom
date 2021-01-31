import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAreaComponent } from './loading-area.component';

describe('LoadingAreaComponent', () => {
  let component: LoadingAreaComponent;
  let fixture: ComponentFixture<LoadingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
