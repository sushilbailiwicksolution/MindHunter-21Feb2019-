import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PooltlooserscoreboardComponent } from './pooltlooserscoreboard.component';

describe('PooltlooserscoreboardComponent', () => {
  let component: PooltlooserscoreboardComponent;
  let fixture: ComponentFixture<PooltlooserscoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PooltlooserscoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PooltlooserscoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
