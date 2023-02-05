
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSensorComponent } from './levelSensor.component';

describe('SensorComponent', () => {
  let component: LevelSensorComponent;
  let fixture: ComponentFixture<LevelSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
