import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOperationsComponent } from './color-operations.component';

describe('ColorOperationsComponent', () => {
  let component: ColorOperationsComponent;
  let fixture: ComponentFixture<ColorOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
