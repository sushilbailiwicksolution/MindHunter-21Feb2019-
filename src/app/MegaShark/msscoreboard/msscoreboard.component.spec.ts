import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsscoreboardComponent } from './msscoreboard.component';

describe('MsscoreboardComponent', () => {
  let component: MsscoreboardComponent;
  let fixture: ComponentFixture<MsscoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsscoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsscoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
