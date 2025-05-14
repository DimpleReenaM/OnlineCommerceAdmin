import { TestBed } from '@angular/core/testing';

import { MycategoryService } from './mycategory.service';

describe('MycategoryService', () => {
  let service: MycategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
