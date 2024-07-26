import { TestBed } from '@angular/core/testing';

import { GanttPrintServiceService } from './gantt-print-service.service';

describe('GanttPrintServiceService', () => {
  let service: GanttPrintServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanttPrintServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
