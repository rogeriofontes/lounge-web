import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesEditComponent } from './company-types-edit.component';

describe('TipoServicosEditComponent', () => {
  let component: CompanyTypesEditComponent;
  let fixture: ComponentFixture<CompanyTypesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTypesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
