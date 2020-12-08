import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreportwComponent } from './addreportw.component';

describe('AddreportwComponent', () => {
  let component: AddreportwComponent;
  let fixture: ComponentFixture<AddreportwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreportwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreportwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
