import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { productService } from './product.service';
import { product } from './product';

@Component({
   selector: 'app-product',
   templateUrl: './product.component.html',
   styleUrls: ['./product.component.css']
})
export class productComponent implements OnInit { 
   allproducts: product[];
   statusCode: number;
   requestProcessing = false;
   productIdToUpdate = null;
   processValidation = false;
   //Create form
   productForm = new FormGroup({
       title: new FormControl('', Validators.required),
       category: new FormControl('', Validators.required)	   
   });
   constructor(private productService: productService) {
   }
   ngOnInit(): void {
	   this.getAllproducts();
   }   
   getAllproducts() {
        this.productService.getAllproducts()
		  .subscribe(
                data => this.allproducts = data,
                errorCode =>  this.statusCode = errorCode);   
   }

   onproductFormSubmit() {
	  this.processValidation = true;   
	  if (this.productForm.invalid) {
	       return; 
	  }   
	  
      this.preProcessConfigurations();
	  let product = this.productForm.value;
	  if (this.productIdToUpdate === null) {  

        this.productService.getAllproducts()
	     .subscribe(products => {

		   let maxIndex = products.length - 1;
		   let productWithMaxIndex = products[maxIndex];
		   let productId = productWithMaxIndex.id + 1;
		   product.id = productId;
		   
		   //Create product
     	   this.productService.createproduct(product)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllproducts();	
					this.backToCreateproduct();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  

        product.id = this.productIdToUpdate; 		
	    this.productService.updateproduct(product)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllproducts();	
					this.backToCreateproduct();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }

   loadproductToEdit(productId: string) {
      this.preProcessConfigurations();
      this.productService.getproductById(productId)
	      .subscribe(product => {
		            this.productIdToUpdate = product.id;   
		            this.productForm.setValue({ title: product.title, category: product.category });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }

   deleteproduct(productId: string) {
      this.preProcessConfigurations();
      this.productService.deleteproductById(productId)
	      .subscribe(successCode => {
		           
					this.statusCode = 204;
				    this.getAllproducts();	
				    this.backToCreateproduct();
			    },
		        errorCode => this.statusCode = errorCode);    
   }

   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   backToCreateproduct() {
      this.productIdToUpdate = null;
      this.productForm.reset();	  
	  this.processValidation = false;
   }
}
    