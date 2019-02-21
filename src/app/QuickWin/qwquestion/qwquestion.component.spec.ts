import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwquestionComponent } from './qwquestion.component';

describe('QwquestionComponent', () => {
  let component: QwquestionComponent;
  let fixture: ComponentFixture<QwquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
