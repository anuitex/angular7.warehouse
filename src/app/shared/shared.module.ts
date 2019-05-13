//Vendors
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
//Components
import { HeaderComponent } from "@app/shared/containers/header/header.component";
import { FooterComponent } from "@app/shared/containers/footer/footer.component";
import { DropDownAuthorsComponent } from "@app/shared/components/drop-down-authors/drop-down-authors.component";
//Pipes
import { DescriptionCutPipe } from "@app/shared/pipes/description-cut.pipe";
import { OrderByPipe } from "@app/shared/pipes/order-by.pipe";
//Modules
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        DropDownAuthorsComponent,
        DescriptionCutPipe,
        OrderByPipe
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        DropDownAuthorsComponent,
        CommonModule,
        FormsModule,
        DescriptionCutPipe,
        OrderByPipe,
        BrowserModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ]
})

export class SharedModule {}
