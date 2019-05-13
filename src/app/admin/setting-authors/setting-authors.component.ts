// Vendors
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
//Services
import { LibraryService } from "@app/shared/services";
//Models
import { AuthorModel, BookModel, ErrorModel } from "@app/shared/models";

@Component({
    selector: 'setting-authors',
    templateUrl: './setting-authors.component.html'
})

export class SettingAuthorsComponent implements OnInit {
    public book: BookModel = new BookModel();
    public authors: AuthorModel[] = [];
    public newAuthor: AuthorModel = new AuthorModel();

    public addAuthorForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(24)])
    });

    constructor(
        public libraryService: LibraryService,
    ) {
        this.libraryService.getAllAuthors().subscribe(
            (allAuthors: AuthorModel[]) => {
                this.authors = allAuthors;
            }
        );
    }

    ngOnInit() { }

    public addAuthor(): void {
        if (this.addAuthorForm.valid) {
            this.libraryService.addNewAuthor(this.addAuthorForm.value).subscribe(
                (data: AuthorModel) => {
                    this.authors.push(data);
                },
                (err: ErrorModel<string, number>) => { throw err }
            );
        }
        this.addAuthorForm.reset();
    }

    public removeFromSelect(event: Event, id: string, index: number): void {
        event.stopPropagation();
        this.libraryService.removeSelectedAuthor(id).subscribe(
            () => { this.authors.splice(index, 1) },
            (err: ErrorModel<string, number>) => { throw err });
    }
}