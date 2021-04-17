import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfReqPage } from './conf-req.page';

describe('ConfReqPage', () => {
  let component: ConfReqPage;
  let fixture: ComponentFixture<ConfReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfReqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
