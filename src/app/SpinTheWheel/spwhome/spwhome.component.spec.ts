import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpwhomeComponent } from './spwhome.component';

describe('SpwhomeComponent', () => {
  let component: SpwhomeComponent;
  let fixture: ComponentFixture<SpwhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpwhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpwhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
