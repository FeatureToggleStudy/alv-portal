import { TestBed } from '@angular/core/testing';

import { WorkEffortFormResolverService } from './work-effort-form-resolver.service';

describe('WorkEffortFormResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkEffortFormResolverService = TestBed.get(WorkEffortFormResolverService);
    expect(service).toBeTruthy();
  });
});
