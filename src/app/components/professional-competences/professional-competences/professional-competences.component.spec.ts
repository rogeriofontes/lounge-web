import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCompetencesComponent } from './profissional-competences.component';

describe('ProfessionalCompetencesComponent', () => {
  let component: ProfessionalCompetencesComponent;
  let fixture: ComponentFixture<ProfessionalCompetencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalCompetencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
