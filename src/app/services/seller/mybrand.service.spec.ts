import { TestBed } from '@angular/core/testing';

import { MybrandService } from './mybrand.service';

describe('MybrandService', () => {
  let service: MybrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MybrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
