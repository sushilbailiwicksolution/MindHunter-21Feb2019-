import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CblooserComponent } from './cblooser.component';

describe('CblooserComponent', () => {
  let component: CblooserComponent;
  let fixture: ComponentFixture<CblooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CblooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CblooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
