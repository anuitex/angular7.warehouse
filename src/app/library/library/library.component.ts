//Vendors
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
//Services
import { LibraryService } from "@app/shared/services/library.service";
//Environment
import { environment } from "@environments/environment";
import { BookTypeEnum } from "@app/shared/enums/book-type.enum";
//Models
import { BookModel, CountModel, AuthorModel, ErrorModel } from '@app/shared/models';

@Component({
    selector: 'app-libary',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})

export class LibraryComponent implements OnInit {

    public filterArrayAuthors: string[] = [];
    public selectedTypeBook: string = '';
    public books: BookModel[];
    private currentPage: number = 1;
    public totalCountBooks: number;
    private searchingStatus: boolean;
    public valueSearch: string = '';
    public type = BookTypeEnum;
    constructor(
        public libraryService: LibraryService,
        public router: Router

    ) {
        this.libraryService.getTotalElements().subscribe(
            (data: CountModel) => {
                this.totalCountBooks = data[0].totalCountBooks;
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
        this.loadAllBooks();
    }

    ngOnInit() { }

    public searchEvent(event: Event): void {
        let e = event.target as HTMLInputElement;
        this.valueSearch = e.value;
        this.getSearchBooks(this.valueSearch);
    }

    public changeCurrentPage(page: number): void {
        this.currentPage = page;
        this.libraryService.searchBooks(this.valueSearch, 12, this.filterArrayAuthors, (this.selectedTypeBook === this.type.all) ? '' : this.selectedTypeBook, this.currentPage).subscribe(
            (data: BookModel[]) => {
                this.books = data;
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
    }

    public onChanged(authors: string[]): void {
        this.filterArrayAuthors = authors;
        this.getSearchBooks(this.valueSearch);
    }

    public checkTypeSelected(event: Event): void {
        let e = event.target as HTMLInputElement;
        this.selectedTypeBook = e.value;
        this.getSearchBooks(this.valueSearch);
    }

    private getSearchBooks(valueSearch: string): void {
        if (!valueSearch && !this.filterArrayAuthors.length && !this.selectedTypeBook || this.selectedTypeBook === 'all' && !valueSearch && !this.filterArrayAuthors.length) {
            this.searchingStatus = false;
        } else {
            this.searchingStatus = true;
            this.currentPage = 1;
        }
        this.valueSearch = valueSearch;
        this.libraryService.searchBooks(valueSearch, 12, this.filterArrayAuthors, (this.selectedTypeBook === this.type.all) ? '' : this.selectedTypeBook, this.currentPage)
            .subscribe(
                (data: BookModel[]) => {
                    this.books = data;
                },
                (err: ErrorModel<string, number>) => { throw err }
            );
    }

    public updateUrl(book: BookModel): void {
        book.img = environment.defaultBookImgUrl;
    }
    private loadAllBooks(): void {
        this.libraryService.searchBooks(this.valueSearch, 12, this.filterArrayAuthors, (this.selectedTypeBook === this.type.all) ? '' : this.selectedTypeBook, this.currentPage)
            .subscribe(
                (data: BookModel[]) => {
                    this.books = data;
                },
                (err: ErrorModel<string, number>) => { throw err }
            )
    }

    public selectBook(index: number): void {
        this.libraryService.dispatch(this.books[index]);
        this.router.navigateByUrl(`library/books/${this.books[index].id}`);
    }
}