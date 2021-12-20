import { TestBed } from '@angular/core/testing';

import { CryptDecryptInterceptor } from './crypt-decrypt.interceptor';

describe('CryptDecryptInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CryptDecryptInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CryptDecryptInterceptor = TestBed.inject(CryptDecryptInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
