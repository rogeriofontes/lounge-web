import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysAddComponent } from './companys-add.component';

describe('CompanyTypesAddComponent', () => {
  let component: CompanysAddComponent;
  let fixture: ComponentFixture<CompanysAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
