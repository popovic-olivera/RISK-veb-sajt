import { TestBed } from '@angular/core/testing';

import { FilterUsersService } from './filter-users.service';

describe('FilterUsersService', () => {
  let service: FilterUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
