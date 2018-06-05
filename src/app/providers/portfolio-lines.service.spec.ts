import { TestBed, inject } from '@angular/core/testing';

import { PortfolioLinesService } from './portfolio-lines.service';

describe('PortfolioLinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioLinesService]
    });
  });

  it('should be created', inject([PortfolioLinesService], (service: PortfolioLinesService) => {
    expect(service).toBeTruthy();
  }));
});
