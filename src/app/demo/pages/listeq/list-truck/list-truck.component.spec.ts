import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTruckComponent } from './list-truck.component';

describe('ListTrashComponent', () => {
  let component: ListTruckComponent;
  let fixture: ComponentFixture<ListTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
