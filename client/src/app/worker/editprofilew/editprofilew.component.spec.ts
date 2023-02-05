import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilewComponent } from './editprofilew.component';

describe('EditprofilewComponent', () => {
  let component: EditprofilewComponent;
  let fixture: ComponentFixture<EditprofilewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofilewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofilewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
