import { ChangeDetectorRef, Component } from '@angular/core';
import { MyBrand, MyCategory, MyProduct } from './productdto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerService } from '../../../services/seller/seller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MybrandService } from '../../../services/seller/mybrand.service';
import { MycategoryService } from '../../../services/seller/mycategory.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/Login/login.service';
import { NgFor, NgIf } from '@angular/common';
import { LayoutComponent } from "../../layout/layout/layout.component";
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, LayoutComponent, HeaderComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: MyProduct[] = [];
  productForm: FormGroup;
  brands: MyBrand[] = [];
  categories: MyCategory[] = [];
  selectedFile: File | null = null;
  editingProductId: any = null;
  modalVisible: boolean = false;
  searchText:string=''

  constructor(
    private productService1: SellerService,
    private router: Router,
    private fb: FormBuilder,
    private productService: SellerService,
    private brandService: MybrandService,
    private categoryService: MycategoryService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private authService: LoginService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      originalPrice: [0, Validators.required],
      discountPercentage: [0],
      discountAmount: [{ value: 0, disabled: true }],
      newPrice: [{ value: 0, disabled: true }],
      stockQuantity: [0, [Validators.required]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      thumbnail: [null],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
    this.loadProducts();
    this.productForm.valueChanges.subscribe(() => {
      this.calculatePrice();
    });
  }

  openModal(product: MyProduct | null = null): void {
    this.modalVisible = true;

      this.productForm.reset(); // ensure previous values are cleared

    if (product) {
      this.editingProductId = product.id;
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        description: product.description,
        originalPrice: product.originalPrice,
        stockQuantity: product.stockQuantity ,
        discountPercentage: product.discountPercentage,
        discountAmount: product.discountAmount,
        newPrice: product.newPrice,
        categoryId: product.category.id,
        brandId: product.brand.id,
        isActive: product.isDeleted
      });
    } else {
      this.productForm.reset();
      this.editingProductId = null;
    }
    this.productForm.get('discountAmount')?.disable();
    this.productForm.get('newPrice')?.disable();
    this.selectedFile = null;
  }

  closeModal(): void {
    this.modalVisible = false;
  }

  getImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return 'assets/default-image.jpg';
    return `https://localhost:7174/${imagePath}`;
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  calculatePrice(): void {
    const originalPrice = this.productForm.get('originalPrice')?.value || 0;
    const discountPercentage = this.productForm.get('discountPercentage')?.value || 0;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const newPrice = originalPrice - discountAmount;
    this.productForm.patchValue(
      {
        discountAmount: discountAmount,
        newPrice: newPrice
      },
      { emitEvent: false }
    );
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe(
      (brands: MyBrand[]) => {
        this.brands = brands;
      },
      (error) => {
        console.error('Error fetching brands:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: MyCategory[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  loadProducts() {
    const userID = this.route.snapshot.paramMap.get('sellerId');
    if (userID) {
      const parsedUserId = Number(userID);
      this.productService1.getSellerProducts(parsedUserId).subscribe(products => {
        this.products = products;
      });
    }
  }

  get filteredProducts(): MyProduct[] {
  return this.products.filter(product =>
    product.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

  editProduct(product: MyProduct) {
    this.openModal(product);
  }

  onSubmit() {
    const formValue = this.productForm.value;
    const formData = new FormData();

    Object.keys(this.productForm.controls).forEach((key) => {
      const controlValue = this.productForm.get(key)?.value;
      const stockQuantity = this.productForm.get('stockQuantity')?.value;
      console.log('Stock Quantity:', stockQuantity); // Check this output in the console
      if (controlValue !== null && controlValue !== undefined) {
        const value = typeof controlValue === 'number' ? controlValue.toString() : controlValue;
        formData.append(key, value);
      }
    });


    if (this.editingProductId) {
      formData.append('Id', this.editingProductId.toString());
    }

    if (this.selectedFile) {
      formData.append('thumbnail', this.selectedFile);
    }

    const adminId = this.route.snapshot.paramMap.get('sellerId'); // get from route

    if (adminId) {
      if (this.editingProductId) {
        formData.append('CreatedBy', adminId);
      }
      else {
        formData.append('CreatedBy', adminId);
      }
    }

    const user = this.authService.getLoggedInUser();

    if (user && user.userId) {
      formData.append('ModifiedBy', user.userId.toString())
    }
    if (this.editingProductId) {
      this.productService.updateProduct(formData).subscribe(
        () => {
          this.loadProducts();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    } else {
      if (this.productForm.valid) {
        this.productService.addProduct(formData).subscribe(
          (response) => {
            console.log('Product added successfully', response);
            this.loadProducts();
            this.closeModal();
          },
          (error) => {
            console.error('Error adding product', error);
          }
        );
      } else {
        alert('Please fill in all required fields correctly.');
      }
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  getLowStockCount(): number {
    return this.products.filter(p => Number(p.stockQuantity) < 10).length;
  }
}
