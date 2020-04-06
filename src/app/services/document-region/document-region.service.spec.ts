import { TestBed } from '@angular/core/testing';

import { DocumentRegionService } from './document-region.service';

describe('DocumentRegionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentRegionService = TestBed.get(DocumentRegionService);
    expect(service).toBeTruthy();
  });
});
