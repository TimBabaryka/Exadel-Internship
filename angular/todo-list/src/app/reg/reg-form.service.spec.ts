import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegFormService } from './reg-form.service';
import { HttpClient } from '@angular/common/http';

describe('RegFormService', () => {
  let service: RegFormService;
  let httpMock: HttpTestingController;
  let HttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegFormService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should check the mocked data', () => {
    const spy = spyOn(service, 'registration');
    expect(spy).toBeTruthy();
  });

  it('should send data and register a user', () => {
    const user = {
      userName: 'Bobby',
      email: 'bobby@bobby.com',
      country: 'USA',
      password: '1234',
      dateOfBirth: '11.11.25',
    };
    expect(user).toBeTruthy();
    service
      .registration('Bobby', 'bobby@bobby.com', 'USA', '1234', '11.11.25')
      .subscribe((emp) => {
        expect(emp).toEqual(user);
      });
    const req = httpMock.expectOne('http://localhost:3000/api/registration');
    expect(req.request.method).toEqual('POST');
    httpMock.verify();
  });

  it('should be mistake', () => {
    let succeeded = false;
    let body: object | undefined;

    service.registration('42', '42', '42', '42', '42').subscribe((response) => {
      succeeded = true;
      body = response;
    });

    const testRequest = httpMock.expectOne(
      'http://localhost:3000/api/registration'
    );
    testRequest.flush('', { status: 404, statusText: 'Not Found' });

    expect(succeeded).toBeFalse();
    expect(body).toBeUndefined();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
