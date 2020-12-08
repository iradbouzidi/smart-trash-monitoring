import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSensorComponent } from './list-sensor.component';

describe('ListSensorComponent', () => {
  let component: ListSensorComponent;
  let fixture: ComponentFixture<ListSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
