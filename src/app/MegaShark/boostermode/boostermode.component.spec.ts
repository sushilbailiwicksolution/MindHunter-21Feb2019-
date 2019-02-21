import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostermodeComponent } from './boostermode.component';

describe('BoostermodeComponent', () => {
  let component: BoostermodeComponent;
  let fixture: ComponentFixture<BoostermodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoostermodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoostermodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
