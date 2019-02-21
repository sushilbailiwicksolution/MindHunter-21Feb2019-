import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinthewheelComponent } from './spinthewheel.component';

describe('SpinthewheelComponent', () => {
  let component: SpinthewheelComponent;
  let fixture: ComponentFixture<SpinthewheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinthewheelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinthewheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
