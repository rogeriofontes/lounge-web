import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCompetencesEditComponent } from './professional-competences-edit.component';

describe('TipoServicosEditComponent', () => {
  let component: ProfessionalCompetencesEditComponent;
  let fixture: ComponentFixture<ProfessionalCompetencesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalCompetencesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalCompetencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
