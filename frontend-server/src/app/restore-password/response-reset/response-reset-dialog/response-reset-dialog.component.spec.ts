import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseResetDialogComponent } from './response-reset-dialog.component';

describe('ResponseResetDialogComponent', () => {
  let component: ResponseResetDialogComponent;
  let fixture: ComponentFixture<ResponseResetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseResetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
