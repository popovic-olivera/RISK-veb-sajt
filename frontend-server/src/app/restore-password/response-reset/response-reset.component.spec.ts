import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseResetComponentComponent } from './response-reset-component.component';

describe('ResponseResetComponentComponent', () => {
  let component: ResponseResetComponentComponent;
  let fixture: ComponentFixture<ResponseResetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseResetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseResetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
