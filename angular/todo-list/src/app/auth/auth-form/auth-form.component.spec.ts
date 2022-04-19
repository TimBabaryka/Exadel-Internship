import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let service: AuthService;
  let fixture: ComponentFixture<AuthFormComponent>;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [component],
    }).compileComponents();

    service = TestBed.get(AuthService);
    fixture = TestBed.createComponent(AuthFormComponent);
    router = TestBed.get(Router);
    httpTestingController = TestBed.get(HttpTestingController);
  });
});
