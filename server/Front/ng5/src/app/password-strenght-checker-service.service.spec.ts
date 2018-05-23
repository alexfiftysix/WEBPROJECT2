import {TestBed, inject} from '@angular/core/testing';

import {PasswordStrenghtCheckerServiceService} from './password-strenght-checker-service.service';

describe('PasswordStrenghtCheckerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordStrenghtCheckerServiceService]
    });
  });

  it('should be created', inject([PasswordStrenghtCheckerServiceService], (service: PasswordStrenghtCheckerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
