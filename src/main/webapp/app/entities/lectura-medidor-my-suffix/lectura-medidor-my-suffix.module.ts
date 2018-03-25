import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    LecturaMedidorMySuffixService,
    LecturaMedidorMySuffixPopupService,
    LecturaMedidorMySuffixComponent,
    LecturaMedidorMySuffixDetailComponent,
    LecturaMedidorMySuffixDialogComponent,
    LecturaMedidorMySuffixPopupComponent,
    LecturaMedidorMySuffixDeletePopupComponent,
    LecturaMedidorMySuffixDeleteDialogComponent,
    lecturaMedidorRoute,
    lecturaMedidorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...lecturaMedidorRoute,
    ...lecturaMedidorPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LecturaMedidorMySuffixComponent,
        LecturaMedidorMySuffixDetailComponent,
        LecturaMedidorMySuffixDialogComponent,
        LecturaMedidorMySuffixDeleteDialogComponent,
        LecturaMedidorMySuffixPopupComponent,
        LecturaMedidorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        LecturaMedidorMySuffixComponent,
        LecturaMedidorMySuffixDialogComponent,
        LecturaMedidorMySuffixPopupComponent,
        LecturaMedidorMySuffixDeleteDialogComponent,
        LecturaMedidorMySuffixDeletePopupComponent,
    ],
    providers: [
        LecturaMedidorMySuffixService,
        LecturaMedidorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoLecturaMedidorMySuffixModule {}
