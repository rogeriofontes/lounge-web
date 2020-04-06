import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersEditComponent } from './managers-edit.component';

describe('TipoServicosEditComponent', () => {
  let component: ManagersEditComponent;
  let fixture: ComponentFixture<ManagersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
