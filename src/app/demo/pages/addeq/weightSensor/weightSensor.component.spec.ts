
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightSensorComponent } from './weightSensor.component';

describe('SensorComponent', () => {
  let component: WeightSensorComponent;
  let fixture: ComponentFixture<WeightSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
