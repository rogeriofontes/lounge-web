import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresssEditComponent } from './addresses-edit.component';

describe('TipoServicosEditComponent', () => {
  let component: AddresssEditComponent;
  let fixture: ComponentFixture<AddresssEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresssEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresssEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
