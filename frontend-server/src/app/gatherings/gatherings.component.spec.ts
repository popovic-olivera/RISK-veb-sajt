import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatheringsComponent } from './gatherings.component';

describe('GatheringsComponent', () => {
  let component: GatheringsComponent;
  let fixture: ComponentFixture<GatheringsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatheringsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
