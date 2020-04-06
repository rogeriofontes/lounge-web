import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersDetailsComponent } from './managers-details.component';

describe('ManagersDetailsComponent', () => {
  let component: ManagersDetailsComponent;
  let fixture: ComponentFixture<ManagersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
