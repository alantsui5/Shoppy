import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProductDetailComponent } from './profile-product-detail.component';

describe('ProfileProductDetailComponent', () => {
  let component: ProfileProductDetailComponent;
  let fixture: ComponentFixture<ProfileProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
