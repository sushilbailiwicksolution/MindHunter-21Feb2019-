import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbHowtoplayComponent } from './cbhowtoplay.component';

describe('HowtoplayComponent', () => {
  let component: CbHowtoplayComponent;
  let fixture: ComponentFixture<CbHowtoplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbHowtoplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbHowtoplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
