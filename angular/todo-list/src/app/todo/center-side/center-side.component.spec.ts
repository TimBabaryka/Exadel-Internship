import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterSideComponent } from './center-side.component';

describe('CenterSideComponent', () => {
  let component: CenterSideComponent;
  let fixture: ComponentFixture<CenterSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
