import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarebComponent } from './jareb.component';

describe('JarebComponent', () => {
  let component: JarebComponent;
  let fixture: ComponentFixture<JarebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
