import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCompetencesAddComponent } from './professional-competences-add.component';

describe('ProfessionalCompetencesAddComponent', () => {
  let component: ProfessionalCompetencesAddComponent;
  let fixture: ComponentFixture<ProfessionalCompetencesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalCompetencesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalCompetencesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
