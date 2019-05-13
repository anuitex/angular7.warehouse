//Vendors
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
//Models
import { BookModel, AuthorModel, CountModel } from '@app/shared/models';
//Environment
import { environment } from '@environments/environment';
//Services
import { PropertyNameChangeHelper } from '@app/shared/services/property-name-change.service';

@Injectable({ providedIn: 'root' })

export class LibraryService {
    private book: BookModel;
    private bookBS: BehaviorSubject<BookModel> = new BehaviorSubject<BookModel>(this.book);

    constructor(
        private http: HttpClient,
        private helper: PropertyNameChangeHelper
    ) {}


        
    public getBookById(id: number): Observable<BookModel> {
        return this.http.get<BookModel>(`${environment.apiUrl}/books/${id}`)
        .pipe(map(book => {
            book = this.helper.changeKeyName<BookModel>(book, 'id', '_id');
            return book;
        }));
    }

    public update(book: BookModel): Observable<BookModel> {
        return this.http.put<BookModel>(`${environment.apiUrl}/books/${book.id}`, book)
        .pipe(map(book => {
            book = this.helper.changeKeyName<BookModel>(book, 'id', '_id');
            return book;
        }));
    }
    
    public create(book: BookModel): Observable<BookModel> {
        return this.http.post<BookModel>(`${environment.apiUrl}/books/`, book)
        .pipe(map(book => {
            book = this.helper.changeKeyName<BookModel>(book, 'id', '_id');
            return book;
        }));
    }

    public getAllAuthors(): Observable<AuthorModel[]> {
        return this.http.get<AuthorModel[]>(`${environment.apiUrl}/authors`)
        .pipe(map(authors => {
            authors = this.helper.changeKeyNameFromArray<AuthorModel>(authors, 'id', '_id');
            return authors;
        }));
    }

    public removeSelectedAuthor(id: string): Observable<AuthorModel> {
        return this.http.delete<AuthorModel>(`${environment.apiUrl}/authors/${id}`)
        .pipe(map(author => {
            author = this.helper.changeKeyName<AuthorModel>(author, 'id', '_id');
            return author;
        }));
    }

    public deleteBook(id: string): Observable<BookModel> {
        return this.http.delete<BookModel>(`${environment.apiUrl}/books/${id}`)
        .pipe(map(book => {
            book = this.helper.changeKeyName<BookModel>(book, 'id', '_id');
            return book;
        }));
    }

    public addNewAuthor(author: string): Observable<AuthorModel> {
        console.log(author)
        return this.http.post<AuthorModel>(`${environment.apiUrl}/authors`, author);
    }

    public getBooksForPagination(currentPage: number, count: number): Observable<BookModel[]> {
        return this.http.get<BookModel[]>(`${environment.apiUrl}/books/?page=${currentPage}&_limit=${count}`)
        .pipe(map(book => {
            book = this.helper.changeKeyNameFromArray<BookModel>(book, 'id', '_id');
            return book;
        }));
    }

    public getTotalElements(): Observable<CountModel> {
         return this.http.get<CountModel>(`${environment.apiUrl}/count/`);
    }

    public getSelectedBook(): Observable<BookModel> {
        return this.bookBS.asObservable();
    }

    public searchBooks(request: string = '', count: number = 12, authors: string[] = [], type: string = '', page: number = 1): Observable<BookModel[]> {
        return this.http.get<BookModel[]>(`${environment.apiUrl}/books?q=${request}&_limit=${count}&authors=${authors}&type=${type}&page=${page}`)
        .pipe(map(book => {
            book = this.helper.changeKeyNameFromArray<BookModel>(book, 'id', '_id');
            return book;
        }));
    }

    public dispatch(book: BookModel): void {
        this.next(book);
    }

    private next(book: BookModel): void {
        this.book = book;
        this.bookBS.next(book);
    }
}