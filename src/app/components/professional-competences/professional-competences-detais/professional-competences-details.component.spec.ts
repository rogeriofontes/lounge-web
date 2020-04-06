import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCompetencesDetailsComponent } from './professional-competences-details.component';

describe('ProfessionalCompetencesDetailsComponent', () => {
  let component: ProfessionalCompetencesDetailsComponent;
  let fixture: ComponentFixture<ProfessionalCompetencesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalCompetencesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalCompetencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
