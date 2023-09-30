import { TestBed } from '@angular/core/testing';

import { HttpCallerInterceptor } from './http-caller.interceptor';

describe('HttpCallerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpCallerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpCallerInterceptor = TestBed.inject(HttpCallerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
