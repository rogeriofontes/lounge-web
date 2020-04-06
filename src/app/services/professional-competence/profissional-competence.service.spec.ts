import { TestBed } from '@angular/core/testing';

import { ProfessionalCompetenceService } from './professional-competence.service';

describe('ProfessionalCompetenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfessionalCompetenceService = TestBed.get(ProfessionalCompetenceService);
    expect(service).toBeTruthy();
  });
});
