import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolquestionComponent } from './poolquestion.component';

describe('PoolquestionComponent', () => {
  let component: PoolquestionComponent;
  let fixture: ComponentFixture<PoolquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
