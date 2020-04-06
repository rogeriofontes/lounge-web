import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesAddComponent } from './company-types-add.component';

describe('CompanyTypesAddComponent', () => {
  let component: CompanyTypesAddComponent;
  let fixture: ComponentFixture<CompanyTypesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTypesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
