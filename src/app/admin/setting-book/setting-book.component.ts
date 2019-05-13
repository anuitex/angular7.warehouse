//Vendors
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SafeResourceUrl } from '@angular/platform-browser';
//Services
import { LibraryService, LayoutService } from "@app/shared/services/";
//Models
import { AuthorModel, BookModel, ErrorModel } from "@app/shared/models";
//Enums
import { BookTypeEnum } from "@app/shared/enums/book-type.enum";


@Component({
    selector: 'app-setting-book',
    templateUrl: './setting-book.component.html',
    styleUrls: ['./setting-book.component.scss']
})

export class SettingBookComponent implements OnInit {

    public type = BookTypeEnum;
    public title: string;
    public book: BookModel = {id: undefined, name: '', img: '', description: '', type: undefined, author: []} as BookModel;
    public authors: AuthorModel[] = [];
    private allAuthorsClone: AuthorModel[] = [];
    public dropMenuToggle: boolean;
    public newAuthor: AuthorModel = new AuthorModel();
    public notAllInputFilled: boolean;
    public layoutSubscription: Subscription;
    public img: SafeResourceUrl;


    public editFormGroup: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        img: new FormControl('', []),
        description: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required])
    });
    public addAuthorForm: FormGroup = new FormGroup({
        author: new FormControl('', []),
        selectAuthor: new FormControl('', []),
    });

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private layout: LayoutService,
        public libraryService: LibraryService,
        private location: Location
    ) {
        if (!!this.route.snapshot.params.book) {
            this.title = 'Edit Book';
            this.libraryService.getBookById(this.route.snapshot.params.book).subscribe(
                (data: BookModel) => {
                    this.img = data.img;
                    // this.setBase64ForImg(data);
                    this.book = data;

                    this.editFormGroup.setValue({
                        name: this.book.name,
                        img: this.book.img,
                        description: this.book.description,
                        type: this.book.type
                    });
                    if (!data[0]) {
                        this.getAuthors();
                    }
                }
            );
        } else if (this.route.snapshot.routeConfig.path === 'setting/add-new-book') {
            this.title = 'Create Book';
            this.getAuthors();
        }
    }

    ngOnInit() {
    }

    public onFileChange(event: Event): void {
        let element = event.target as HTMLInputElement;
        this.editFormGroup.get('img').setValue(null);
        let reader: FileReader = new FileReader();
        if (element.files && element.files.length > 0) {
            let file = element.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") {
                    this.book.img = reader.result;
                }
            };
        }
    }

    public clearFile(): void {
        this.book.img = '';
        this.editFormGroup.get('img').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

    public saveEditForm(): void {
        if (this.editFormGroup.status === 'VALID' && this.book.author.length) {
            for (let data in this.editFormGroup.value) {
                if (!!this.editFormGroup.value && this.editFormGroup.value[data]) {
                    this.book[data] = this.editFormGroup.value[data];
                }
            }
            if (this.route.snapshot.routeConfig.path === 'setting/add-new-book') {
                this.libraryService.create(this.book).subscribe();
            } else if (!!this.route.snapshot.params.book) {
                this.libraryService.update(this.book).subscribe();
            }
            this.router.navigateByUrl('admin/setting');
        } else {
            this.notAllInputFilled = true;
        }
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
            },
            (err: ErrorModel<string, number>) => { throw err }
        );
        this.dropMenuToggle = !this.dropMenuToggle;
    }

    public selectedOption(index: number): void {
        this.book.author.push(this.authors[index]);
        this.authors.splice(index, 1);
    }

    public removeAuthor(option: string, index: number): void {
        const indexInCloneAuthor = this.allAuthorsClone.findIndex(i => i.name === option);
        this.book.author.splice(index, 1);
        if (this.allAuthorsClone[indexInCloneAuthor]) {
            this.authors.push(this.allAuthorsClone[indexInCloneAuthor]);
        }
    }

    private getAuthors(): void {
        this.libraryService.getAllAuthors().subscribe(
            (allAuthors: AuthorModel[]) => {
                this.authors = allAuthors;
                this.allAuthorsClone = allAuthors.slice();
                this.book.author.forEach((element) => {
                    let index = this.authors.findIndex(i => i.name === element.name);
                    if (index !== -1) {
                        this.authors.splice(index, 1);
                    }
                });
            }
        );
    }

    public backToPrevPage() {
        this.location.back();
    }
}
