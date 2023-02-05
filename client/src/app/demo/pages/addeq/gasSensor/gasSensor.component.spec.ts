
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasSensorComponent } from './gasSensor.component';

describe('SensorComponent', () => {
  let component: GasSensorComponent;
  let fixture: ComponentFixture<GasSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
