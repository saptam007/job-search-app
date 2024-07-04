import { TestBed } from '@angular/core/testing';

import { UserDetailDialogService } from './user-detail-dialog.service';

describe('UserDetailDialogService', () => {
  let service: UserDetailDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
