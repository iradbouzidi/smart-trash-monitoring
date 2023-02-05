import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSensoraComponent } from './list-sensora.component';

describe('ListSensorComponent', () => {
  let component: ListSensoraComponent;
  let fixture: ComponentFixture<ListSensoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSensoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSensoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
