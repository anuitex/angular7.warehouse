//Vendors
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
//Services
import { LibraryService } from '@app/shared/services/library.service';
//Model
import { BookModel, CountModel, ErrorModel } from '@app/shared/models';

@Component({
    selector: 'setting-library',
    templateUrl: './setting-library.component.html',
    styleUrls: ['./setting-library.component.scss']
})

export class SettingLibraryComponent implements OnInit {

    public books: BookModel[];
    public countTotalBooks: number;
    private currentPage: number = 1;
    constructor(
        public libraryService: LibraryService,
        private router: Router,
        public ngxSmartModalService: NgxSmartModalService
    ) {
        this.libraryService.getTotalElements().subscribe(
            (count: CountModel) => {
                this.countTotalBooks = count[0].totalCountBooks;
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
        this.libraryService.getBooksForPagination(1, 10).subscribe(
            (data: BookModel[]) => {
                this.books = data
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
    }

    ngOnInit() { }

    public selectedBook(index: number): void {
        this.router.navigateByUrl(`admin/setting/${this.books[index].id}`);
    }

    public changeCurrentPage(currentPage: number): void {
        this.currentPage = currentPage;
        this.libraryService.getBooksForPagination(currentPage, 10).subscribe(
            (data: BookModel[]) => { this.books = data },
            (err: ErrorModel<string, number>) => { throw err }
        );
    }

    public deleteBook(id: string): void {
        this.countTotalBooks -= 1;

        if (!this.countTotalBooks && this.currentPage !== 1) { this.currentPage -= 1 }
        this.libraryService.deleteBook(id).subscribe(
            (data: BookModel) => {
                this.changeCurrentPage(this.currentPage)
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
    }

    public selectedId(id: string): void {
        this.ngxSmartModalService.resetModalData('deleteLibraryPopap');
        this.ngxSmartModalService.setModalData(id, 'deleteLibraryPopap');
    }
}