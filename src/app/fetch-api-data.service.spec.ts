import { TestBed } from '@angular/core/testing';

import { fetchAPIdataService } from './fetch-api-data.service';

describe('fetchAPIdataService', () => {
  let service: fetchAPIdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fetchAPIdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
