import { TestBed } from '@angular/core/testing';

import { UserDetailDialogDataService } from '../user-detail-dialog/user-detail-dialog-data.service';

describe('UserDetailDialogDataService', () => {
  let service: UserDetailDialogDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailDialogDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
