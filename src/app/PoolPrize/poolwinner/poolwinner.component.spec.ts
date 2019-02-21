import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolwinnerComponent } from './poolwinner.component';

describe('PoolwinnerComponent', () => {
  let component: PoolwinnerComponent;
  let fixture: ComponentFixture<PoolwinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolwinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolwinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
