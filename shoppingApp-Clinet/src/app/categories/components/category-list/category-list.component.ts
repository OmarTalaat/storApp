import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/categories/models/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryandproductService } from 'src/app/products/service/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @Input()  categories!: Category[];

  constructor(private categoryservice:CategoryService , private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadcategories();
  }


  loadcategories() {
    this.categoryservice.getAllcategoriesforuser().subscribe((categories:Category[])=>{
      this.categories =categories
    }, error => {
      this.alertify.error(error);
    });
  }

}
