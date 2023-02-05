import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InchargeComponent } from './incharge.component';

describe('InchargeComponent', () => {
  let component: InchargeComponent;
  let fixture: ComponentFixture<InchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
