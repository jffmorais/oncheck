import { TestBed } from '@angular/core/testing';

import { ColabService } from './colab.service';

describe('ColabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColabService = TestBed.get(ColabService);
    expect(service).toBeTruthy();
  });
});
