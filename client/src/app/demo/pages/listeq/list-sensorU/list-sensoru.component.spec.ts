import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSensoruComponent } from './list-sensoru.component';

describe('ListSensorComponent', () => {
  let component: ListSensoruComponent;
  let fixture: ComponentFixture<ListSensoruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSensoruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSensoruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
