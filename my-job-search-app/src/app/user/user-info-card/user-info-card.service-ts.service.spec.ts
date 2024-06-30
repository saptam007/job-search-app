import { TestBed } from '@angular/core/testing';

import { UserInfoCardServiceTsService } from './user-info-card.service-ts.service';

describe('UserInfoCardServiceTsService', () => {
  let service: UserInfoCardServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoCardServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
