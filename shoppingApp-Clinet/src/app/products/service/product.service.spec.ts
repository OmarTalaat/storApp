/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryandproductService } from './product.service';

describe('Service: Categoryandproduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryandproductService]
    });
  });

  it('should ...', inject([CategoryandproductService], (service: CategoryandproductService) => {
    expect(service).toBeTruthy();
  }));
});
