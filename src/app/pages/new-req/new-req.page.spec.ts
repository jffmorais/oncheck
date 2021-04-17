import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReqPage } from './new-req.page';

describe('NewReqPage', () => {
  let component: NewReqPage;
  let fixture: ComponentFixture<NewReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
