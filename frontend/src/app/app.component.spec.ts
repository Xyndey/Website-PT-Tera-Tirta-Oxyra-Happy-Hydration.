import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideAnimations()],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('creates the app and renders the OXYRA brand name in the navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Flush every HTTP request the section/root components fired on init,
    // responding with an error so each falls back to local fixture data
    // (see ApiService.withFallback) instead of hanging the test.
    httpMock.match(() => true).forEach((req) => req.flush(null, { status: 500, statusText: 'Server Error' }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.nav-brand-text')?.textContent).toContain('OXYRA');
  });
});
