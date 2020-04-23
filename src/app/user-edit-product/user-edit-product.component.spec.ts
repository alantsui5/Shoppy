import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditProductComponent } from './user-edit-product.component';

describe('UserEditProductComponent', () => {
  let component: UserEditProductComponent;
  let fixture: ComponentFixture<UserEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
