import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { introGuard } from './intro.guard';
import { StorageService } from '../services/storage.service';

describe('IntroGuard', () => {
  let guard: introGuard;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['get']);
    const rSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        introGuard,
        { provide: StorageService, useValue: storageSpy },
        { provide: Router, useValue: rSpy },
      ],
    });

    guard = TestBed.inject(introGuard);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
