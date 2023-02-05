import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreportComponent } from './addreport.component';

describe('AddreportComponent', () => {
  let component: AddreportComponent;
  let fixture: ComponentFixture<AddreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
