import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilewComponent } from './profilew.component';

describe('ProfilewComponent', () => {
  let component: ProfilewComponent;
  let fixture: ComponentFixture<ProfilewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
