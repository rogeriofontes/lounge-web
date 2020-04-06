import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersAddComponent } from './managers-add.component';

describe('ManagersAddComponent', () => {
  let component: ManagersAddComponent;
  let fixture: ComponentFixture<ManagersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
