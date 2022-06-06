import { TestBed } from '@angular/core/testing';

import { ProductDetailsResolver } from './product-details.resolver';

describe('ProductDetailsResolver', () => {
  let resolver: ProductDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
