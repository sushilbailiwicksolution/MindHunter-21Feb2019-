import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LooserComponent } from './looser.component';

describe('LooserComponent', () => {
  let component: LooserComponent;
  let fixture: ComponentFixture<LooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
