import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsEditComponent } from './professionals-edit.component';

describe('ProfessionalsEditComponent', () => {
  let component: ProfessionalsEditComponent;
  let fixture: ComponentFixture<ProfessionalsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
