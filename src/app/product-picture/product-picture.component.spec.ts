import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPictureComponent } from './product-picture.component';

describe('ProductPictureComponent', () => {
  let component: ProductPictureComponent;
  let fixture: ComponentFixture<ProductPictureComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
