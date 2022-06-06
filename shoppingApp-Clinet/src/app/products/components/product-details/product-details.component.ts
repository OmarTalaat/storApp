import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/categories/models/category';
import { Product } from 'src/app/products/models/product';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!:Product


  constructor(
      private route: ActivatedRoute,private router: Router ,private location: Location) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];

   });
  }


  back(): void {
    this.location.back();
  }

}
