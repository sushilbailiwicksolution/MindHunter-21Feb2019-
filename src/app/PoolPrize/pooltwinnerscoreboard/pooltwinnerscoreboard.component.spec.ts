import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PooltwinnerscoreboardComponent } from './pooltwinnerscoreboard.component';

describe('PooltwinnerscoreboardComponent', () => {
  let component: PooltwinnerscoreboardComponent;
  let fixture: ComponentFixture<PooltwinnerscoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PooltwinnerscoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PooltwinnerscoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
