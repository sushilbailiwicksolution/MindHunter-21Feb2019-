import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PooltcComponent } from './pooltc.component';

describe('PooltcComponent', () => {
  let component: PooltcComponent;
  let fixture: ComponentFixture<PooltcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PooltcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PooltcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
