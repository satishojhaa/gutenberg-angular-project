import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators' 

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit,OnDestroy {

  books: Book[]=[];
  pages: number;
  previousPage: string;
  nextPage: string;
  responseListener: Subscription;
  category:string;
  searchKey:string='';
  errorMessage:string='';
  private searchSubject: Subject<string> = new Subject();
  private searchSubscription: Subscription;
  private errorSubscription: Subscription;
  

  constructor(private route:ActivatedRoute,
              private booksService:BooksService,
              private router: Router) { }

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(
      searchValue =>{
        this.booksService.searchBooks(this.category,searchValue).subscribe(
          response =>{
            this.processResponse(response);
          }
        )
      }
    )

    this.errorSubscription = this.booksService.errorOccurred.subscribe(
      message =>{
        this.errorMessage = message;
      }
    )
    this.route.params.subscribe(
      param =>{
        this.category=param["category"];
        this.booksService.fetchBooksByCategory(this.category).subscribe(
          response =>{
            this.processResponse(response);
          }
        );
      }
    )
  }

  onBookSelected(index:number){
    const book = this.books[index];
    this.booksService.openBook(book);
  }

  onNext(){
    if(!this.nextPage){
      return;
    }

    this.booksService.fetchPage(this.nextPage).subscribe(
      response =>{
        this.processResponse(response);
      }
    );
  }

  onPrevious(){
    if(!this.previousPage){
      return;
    }

    this.booksService.fetchPage(this.previousPage).subscribe(
      response =>{
        this.processResponse(response);
      }
    );
  }

  onSearch(){
    this.searchSubject.next(this.searchKey);
  }

  private processResponse(response){
    this.books=[];
    this.books.push(...response["results"]);
    this.pages= response["count"];
    this.previousPage= response["previous"];
    this.nextPage= response["next"];
  }

  goBack(){
    this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.searchSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
