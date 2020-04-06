import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysEditComponent } from './companys-edit.component';

describe('CompanysEditComponent', () => {
  let component: CompanysEditComponent;
  let fixture: ComponentFixture<CompanysEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
