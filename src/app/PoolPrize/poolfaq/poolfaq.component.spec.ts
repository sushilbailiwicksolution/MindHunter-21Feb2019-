import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolfaqComponent } from './poolfaq.component';

describe('PoolfaqComponent', () => {
  let component: PoolfaqComponent;
  let fixture: ComponentFixture<PoolfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
