import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesDetailsComponent } from './company-types-details.component';

describe('CompanyTypesDetailsComponent', () => {
  let component: CompanyTypesDetailsComponent;
  let fixture: ComponentFixture<CompanyTypesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTypesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
