import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-categories',
  templateUrl: './book-categories.component.html',
  styleUrls: ['./book-categories.component.css']
})
export class BookCategoriesComponent implements OnInit {

  title="Gutenberg Project";
  categories=['Fiction','Drama','Humor','Politics','Philosophy','History','Adventure'];   //Hardcoding the genre as dont have an api to list all the genre available on gutenberg

  constructor(private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onCategorySelected(index:number){
    const selectedCategory = this.categories[index];
    this.router.navigate([selectedCategory],{relativeTo:this.route});
  }

}
