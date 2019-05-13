//Vendors
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";
//Services
import { LibraryService } from "@app/shared/services/library.service";
//Models
import { BookModel, ErrorModel } from "@app/shared/models";
//Environment
import { environment } from "@environments/environment";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {

    public book: BookModel;
    private subscribeToGetBook: Subscription;

    constructor(
        private route: ActivatedRoute,
        public libraryService: LibraryService,
        private router: Router,
        private sentizer: DomSanitizer
    ) {
        this.getSelectedBook();
        if (!!this.subscribeToGetBook) {
            this.subscribeToGetBook.unsubscribe();
        }
    }

    ngOnInit() { }

    private getSelectedBook(): void {
        this.subscribeToGetBook = this.libraryService.getSelectedBook().subscribe(
            (data: BookModel) => {
                if (!data) {
                    this.libraryService.getBookById(this.route.snapshot.params.id).subscribe(
                        (book: BookModel) => {
                            if (book.img) {
                               this.book = book;
                            } else {
                                this.router.navigateByUrl(`/`);
                            }
                        },
                        (err: ErrorModel<string, number>) => { throw err }
                    );
                } else {
                    this.book = data;
                }
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
    }

    public updateUrl(): void {
        this.book.img = environment.defaultBookImgUrl;
    }

}
