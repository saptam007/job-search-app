import { TestBed } from '@angular/core/testing';
import { UserInfoCardService } from './user-info-card.service';


describe('UserInfoCardService', () => {
  let service: UserInfoCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfoCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
