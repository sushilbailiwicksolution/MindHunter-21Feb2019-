import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnsRedirectComponent } from './trns-redirect.component';

describe('TrnsRedirectComponent', () => {
  let component: TrnsRedirectComponent;
  let fixture: ComponentFixture<TrnsRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnsRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnsRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
