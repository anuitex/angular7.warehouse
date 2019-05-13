//Vendors
import { Component, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
//Services
import { LayoutService, LibraryService } from "@app/shared/services";
//Models
import { AuthorModel } from "@app/shared/models";

@Component({
    selector: 'app-drop-down-authors',
    templateUrl: './drop-down-authors.component.html',
    styleUrls: ['./drop-down-authors.component.scss']
})

export class DropDownAuthorsComponent {
    public selectedAuthors: string[] = [];
    public title: string;
    public authors: AuthorModel[] = [];
    private allAuthorsClone: AuthorModel[] = [];
    public dropMenuToggle: boolean;
    public newAuthor: AuthorModel = new AuthorModel();
    public notAllInputFilled: boolean;

    public layoutSubscription: Subscription;

    @Output() onChanged = new EventEmitter<string[]>();

    public addAuthorForm: FormGroup = new FormGroup({
        author: new FormControl('', []),
        selectAuthor: new FormControl('', []),
    });

    constructor(
        private layout: LayoutService,
        public libraryService: LibraryService
    ) {
        this.getAuthors();
    }

    public onSelect(event: Event): void {
        event.stopPropagation();
    }

    public onClickDropMenu(): void {
        if (this.dropMenuToggle) {
            this.layoutSubscription.unsubscribe();
        }
        this.layoutSubscription = this.layout.mouseEvent.subscribe(
            () => {
                this.dropMenuToggle = false;
                this.layoutSubscription.unsubscribe();
            }
        );
        this.dropMenuToggle = !this.dropMenuToggle;
    }

    public selectedOption(index: number): void {
        this.selectedAuthors.push(this.authors[index].name);
        this.authors.splice(index, 1);
        this.onChanged.emit(this.selectedAuthors);
    }
    
    public removeAuthor(option: string, index: number): void {
        const indexInCloneAuthor = this.allAuthorsClone.findIndex(i => i.name === option);
        this.selectedAuthors.splice(index, 1);
        this.authors.push(this.allAuthorsClone[indexInCloneAuthor]);
        this.onChanged.emit(this.selectedAuthors);
    }

    private getAuthors(): void {
        this.libraryService.getAllAuthors().subscribe(
            (allAuthors: AuthorModel[]) => {
                this.authors = allAuthors;
                this.allAuthorsClone = allAuthors.slice();

            }
        );
    }
}