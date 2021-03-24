import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandOperationsComponent } from './brand-operations.component';

describe('BrandOperationsComponent', () => {
  let component: BrandOperationsComponent;
  let fixture: ComponentFixture<BrandOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
