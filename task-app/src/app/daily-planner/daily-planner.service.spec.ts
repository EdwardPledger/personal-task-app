import { TestBed } from '@angular/core/testing';

import { DailyPlannerService } from './daily-planner.service';

describe('DailyPlannerService', () => {
  let service: DailyPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
