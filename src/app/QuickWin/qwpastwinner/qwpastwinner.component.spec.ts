import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwpastwinnerComponent } from './qwpastwinner.component';

describe('QwpastwinnerComponent', () => {
  let component: QwpastwinnerComponent;
  let fixture: ComponentFixture<QwpastwinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwpastwinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwpastwinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
