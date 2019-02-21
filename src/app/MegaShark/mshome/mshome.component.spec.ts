import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MshomeComponent } from './mshome.component';

describe('MshomeComponent', () => {
  let component: MshomeComponent;
  let fixture: ComponentFixture<MshomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MshomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
