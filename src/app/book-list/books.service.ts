import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Book } from './books.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class BooksService{

    errorOccurred = new Subject<string>();

    constructor(private http:HttpClient){

    }

    fetchBooksByCategory(category:string){
        let params = new HttpParams();
        params= params.append('topic',category);
        params= params.append('mime_type','image/jpeg');

        return this.http.get(
            'http://skunkworks.ignitesol.com:8000/books',
            {
                params: params
            }
        )
    }

    fetchPage(pageUrl:string){
        return this.http.get(
            pageUrl
        )
    }

    searchBooks(category:string,searchKey:string){
        let params = new HttpParams();
        params= params.append('topic',category);
        params= params.append('mime_type','image/jpeg');
        params= params.append('search',searchKey);

        return this.http.get(
            'http://skunkworks.ignitesol.com:8000/books',
            {
                params: params
            }
        )
    }

    openBook(book: Book){
        let bookUrl = '';
        let isHtml:boolean = false;
        let isPdf:boolean = false;
        let isText:boolean = false;

        // this.http.get(
        //     book.formats["application/zip"]
        // ).subscribe(
        //     response =>{
        //         console.log(response);
        //     }
        // );

        for(let [key,value] of Object.entries(book.formats)){
            if(key.indexOf("text/html")!==-1){
                isHtml=true;
                bookUrl=value;
                break;
            }
            if(key.indexOf("application/pdf")!==-1 && !isHtml){
                isPdf=true;
                bookUrl=value;
            }
            if(key.indexOf("text/plain")!==-1 && !isHtml && !isPdf){
                isText=true;
                bookUrl=value;
            }
            if(key.indexOf("zip")!==-1 && !isHtml && !isPdf && !isText){
                isHtml=true;
                bookUrl=value;
            }
        }
        if(bookUrl){
            window.open(bookUrl);
        }
        else{
            this.errorOccurred.next("No viewable version available");
            return;
        }
    }
}