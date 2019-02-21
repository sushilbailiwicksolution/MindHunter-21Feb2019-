import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwfaqComponent } from './qwfaq.component';

describe('QwfaqComponent', () => {
  let component: QwfaqComponent;
  let fixture: ComponentFixture<QwfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
