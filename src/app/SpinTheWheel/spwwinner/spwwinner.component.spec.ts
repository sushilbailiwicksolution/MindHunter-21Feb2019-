import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpwwinnerComponent } from './spwwinner.component';

describe('SpwwinnerComponent', () => {
  let component: SpwwinnerComponent;
  let fixture: ComponentFixture<SpwwinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpwwinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpwwinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
