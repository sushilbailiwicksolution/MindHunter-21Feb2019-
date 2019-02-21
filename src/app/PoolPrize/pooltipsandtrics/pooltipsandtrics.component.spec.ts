import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PooltipsandtricsComponent } from './pooltipsandtrics.component';

describe('PooltipsandtricsComponent', () => {
  let component: PooltipsandtricsComponent;
  let fixture: ComponentFixture<PooltipsandtricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PooltipsandtricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PooltipsandtricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
