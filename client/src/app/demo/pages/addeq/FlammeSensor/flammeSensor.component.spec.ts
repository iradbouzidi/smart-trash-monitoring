
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlammeSensorComponent } from './flammeSensor.component';

describe('SensorComponent', () => {
  let component: FlammeSensorComponent;
  let fixture: ComponentFixture<FlammeSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlammeSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlammeSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
