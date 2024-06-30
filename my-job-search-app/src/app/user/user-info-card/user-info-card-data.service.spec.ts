import { TestBed } from '@angular/core/testing';

import { UserInfoCardDataService } from './user-info-card-data.service';

describe('UserInfoCardDataService', () => {
  let service: UserInfoCardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoCardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
