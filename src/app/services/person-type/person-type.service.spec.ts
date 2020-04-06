import { TestBed } from '@angular/core/testing';

import { PersonTypeService } from './person-type.service';

describe('PersonTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonTypeService = TestBed.get(PersonTypeService);
    expect(service).toBeTruthy();
  });
});
