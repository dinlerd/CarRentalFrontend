import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOperationsComponent } from './car-operations.component';

describe('CarOperationsComponent', () => {
  let component: CarOperationsComponent;
  let fixture: ComponentFixture<CarOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
