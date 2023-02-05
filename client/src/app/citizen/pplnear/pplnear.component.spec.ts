import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PplnearComponent } from './pplnear.component';

describe('PplnearComponent', () => {
  let component: PplnearComponent;
  let fixture: ComponentFixture<PplnearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PplnearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PplnearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
