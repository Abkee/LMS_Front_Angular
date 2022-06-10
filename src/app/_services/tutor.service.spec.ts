import { TestBed } from '@angular/core/testing';

import { TutorService } from './tutor.service';

describe('AutirizeService', () => {
  let service: TutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
