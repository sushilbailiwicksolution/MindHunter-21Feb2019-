import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolhomeComponent } from './poolhome.component';

describe('PoolhomeComponent', () => {
  let component: PoolhomeComponent;
  let fixture: ComponentFixture<PoolhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
