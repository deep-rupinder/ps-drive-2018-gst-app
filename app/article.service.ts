import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { product } from './product';

@Injectable()
export class productService {
	productUrl = "http://localhost:3000/products";

	constructor(private http:Http) { 
	}
	//Fetch all products
    getAllproducts(): Observable<product[]> {
        return this.http.get(this.productUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }

    createproduct(product: product):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.productUrl, product, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	
    getproductById(productId: string): Observable<product> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.productUrl +"/"+ productId);
		return this.http.get(this.productUrl +"/"+ productId)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	
	
    updateproduct(product: product):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.productUrl +"/"+ product.id, product, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
  
    deleteproductById(productId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.productUrl +"/"+ productId)
			   .map(success => success.status)
			   .catch(this.handleError);
    }	
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}