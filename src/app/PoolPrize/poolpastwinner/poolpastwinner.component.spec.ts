import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolpastwinnerComponent } from './poolpastwinner.component';

describe('PoolpastwinnerComponent', () => {
  let component: PoolpastwinnerComponent;
  let fixture: ComponentFixture<PoolpastwinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolpastwinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolpastwinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
