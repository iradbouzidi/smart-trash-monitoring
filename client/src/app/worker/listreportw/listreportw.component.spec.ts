import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreportwComponent } from './listreportw.component';

describe('ListreportwComponent', () => {
  let component: ListreportwComponent;
  let fixture: ComponentFixture<ListreportwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListreportwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreportwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
