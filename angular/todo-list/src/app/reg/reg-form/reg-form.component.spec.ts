import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RegFormComponent } from './reg-form.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegFormComponent', () => {
  let component: RegFormComponent;
  let fixture: ComponentFixture<RegFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegFormComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a h1 element with class title', () => {
    const el = fixture.debugElement.query(By.css('h1.title'));
    expect(el).toBeTruthy();
  });

  it('should have a div element with class reg-form', () => {
    const el = fixture.debugElement.query(By.css('div.reg-form'));
    expect(el).toBeTruthy();
  });

  it('should display Registration page on the page', () => {
    const el = fixture.debugElement.query(By.css('.title'));
    expect(el.nativeElement.innerText).toEqual('Registration page');
  });
  it('should call the submitForm method when the signup-form is submitted', () => {
    const el = fixture.debugElement.query(By.css('.reg-form__form'));
    const fnc = spyOn(component, 'onSubmitReg');

    el.triggerEventHandler('ngSubmit', null);

    expect(fnc).toHaveBeenCalled();
  });
  it('should have five ctrl-row elements inside the signup-form', () => {
    const els = fixture.debugElement.queryAll(
      By.css('.reg-form__form mat-form-field.reg-form__row')
    );
    expect(els.length).toEqual(5);
  });
  it('should display Username on the mat-label for the username field', () => {
    const el = fixture.debugElement.query(By.css('.--username mat-label'));
    expect(el.nativeElement.innerText).toEqual('Username');
  });

  it('should have an input element with certain attributes for the username field', () => {
    const el = fixture.debugElement.query(By.css('.--username input'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('text');
    expect(el.nativeElement.getAttribute('formControlName')).toEqual(
      'userName'
    );
    expect(el.nativeElement.getAttribute('autocomplete')).toEqual('off');
  });

  it('should bind the username to its FormControl', () => {
    const el = fixture.debugElement.query(By.css('.--username input'));
    const ctrl = component.RegForm.get('userName');
    const dummyValue = '123';
    ctrl?.setValue(dummyValue);
    fixture.detectChanges();
    expect(el.nativeElement.value).toEqual(dummyValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dummyValue);
  });

  it('should have a button with class submit-btn inside the signup-form', () => {
    const el = fixture.debugElement.query(
      By.css('.reg-form__form button.submit-btn')
    );
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('submit');
  });

  it('should display Submit on the submit button', () => {
    const el = fixture.debugElement.query(
      By.css('.reg-form__form  .submit-btn')
    );
    expect(el.nativeElement.innerText).toEqual('Sign Up');
  });

  it('should submit the form when data is set', () => {
    const btnEl = fixture.debugElement.query(By.css('.submit-btn'));
    (btnEl.nativeElement as HTMLButtonElement).click();
    component.RegForm.setValue({
      userName: 'Bobby',
      email: 'bobby@bobby.com',
      country: 'USA',
      password: '1234',
      dateOfBirth: '11.11.25',
    });
    expect(component.RegForm.valid).toEqual(true);
    fixture.detectChanges();
  });

  it('should mark password as invalid when it has no value', () => {
    const ctrl = component.RegForm.get('password');
    ctrl?.setValue(null);
    fixture.detectChanges();
    expect(ctrl?.invalid).toBeTruthy();
  });

  it('should mark passwordas valid when it has value', () => {
    const ctrl = component.RegForm.get('password');
    ctrl?.setValue('test');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  });

  it('should mark password as valid when its value is more than 4 character', () => {
    const ctrl = component.RegForm.get('password');
    ctrl?.setValue('1234');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeTruthy();
  });
  it('should mark password as invalid when its value is less than 4 character', () => {
    const ctrl = component.RegForm.get('password');
    ctrl?.setValue('123');
    fixture.detectChanges();
    expect(ctrl?.valid).toBeFalsy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
