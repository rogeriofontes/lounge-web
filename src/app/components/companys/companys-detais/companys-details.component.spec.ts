import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysDetailsComponent } from './companys-details.component';

describe('CompanyTypesDetailsComponent', () => {
  let component: CompanysDetailsComponent;
  let fixture: ComponentFixture<CompanysDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
