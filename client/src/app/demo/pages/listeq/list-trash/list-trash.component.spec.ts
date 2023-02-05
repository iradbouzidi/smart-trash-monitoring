import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrashComponent } from './list-trash.component';

describe('ListTrashComponent', () => {
  let component: ListTrashComponent;
  let fixture: ComponentFixture<ListTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
