// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';

// import * as consts from '../../../../@core/utils/consts';
// import { HttpService } from '../../../../services/http/http.service';

// @Component({
//     styleUrls: ['./detail.component.scss'],
//     templateUrl: './detail.component.html',
// })

// export class BookDetailComponent implements OnInit {

//     educationSystems: any;
//     institutions: any;
//     institutionsEnabled: any = [];
//     books: any;
//     seriesId: any;
//     descriptors: any;
//     counter: any = 0;
//     form: FormGroup;

//     constructor(
//         private http: HttpService,
//         private route: ActivatedRoute,
//         private fb: FormBuilder,
//         private router: Router,
//     ) {
//         this.seriesId = consts.SERIEIDS;
//     }

//     getBook(id: number): Promise<any> {
//         return new Promise<any>(resolve => {
//             this.http.get(`/books/${id}`)
//                 .subscribe(data => { resolve(data); });
//         });
//     }

//     getEducationSystems(): Promise<any> {
//         return new Promise<any>(resolve => {
//             this.http.get('/educationsystems')
//                 .subscribe(data => { resolve(data); });
//         });
//     }

//     getInstitutions(): Promise<any> {
//         return new Promise<any>(resolve => {
//             this.http.get('/institutions')
//                 .subscribe(data => { resolve(data); });
//         });
//     }

//     getDescriptors(): Promise<any> {
//         return new Promise<any>(resolve => {
//             this.http.get('/descriptors')
//                 .subscribe(data => { resolve(data); });
//         });
//     }

//     async ngOnInit() {
//         this.form = this.fb.group({ name: '', educationSystemId: '', serieId: '', excluded: false, bookContent: this.fb.array([ this.BookContent(0, '') ]) });

//         this.educationSystems = await this.getEducationSystems();

//         this.descriptors = await this.getDescriptors();

//         this.institutions = await this.getInstitutions();
//         this.institutions.forEach(element => {
//             if (element.enabled === true && element.excluded === false) {
//                 this.institutionsEnabled.push(element);
//             }
//         });

//         this.route.params.subscribe(async params => {
//             if ( params.hasOwnProperty('id')) {
//                 let i = 0;
//                 let bookContentcontrol = <FormArray>this.form.controls['bookContent'];
//                 let chaptersContentControl
//                 this.books = await this.getBook(params['id']);
//                 this.books.bookContent.forEach(element => {
//                     bookContentcontrol.push(this.BookContent(element.unity.id, element.unity.name));
//                     this.books.bookContent[i].chapters.forEach(element => {
//                         chaptersContentControl = <FormArray>bookContentcontrol.controls[i + 1]['controls']['chapters'];
//                         chaptersContentControl.push(this.ChaptersContent(element.id, element.name, [element.descriptors]))
//                     })
//                     chaptersContentControl.removeAt(0)
//                     i++
//                 })
//                 bookContentcontrol.removeAt(0)
//             }
//         })
//     }

//     BookContent(id, name) {
//         return this.fb.group({
//             unity: this.fb.group({
//                     id: id,
//                     name: name,
//                 }),
//             chapters: this.fb.array([ this.ChaptersContent(0, '', []) ])
//         });
//     }

//     ChaptersContent(id, name, descriptors) {
//         return this.fb.group({
//             id: id,
//             name: name,
//             descriptors: descriptors,
//         });
//     }

//     addBookContent() {
//         const control = <FormArray>this.form.controls['bookContent'];
//         control.push(this.BookContent(0, ''));
//     }

//     removeContent(i: number) {
//         const control = <FormArray>this.form.controls['bookContent'];
//         control.removeAt(i);
//     }

//     addChaptersContent(control) {
//         control.push(this.ChaptersContent(0, '', []));
//     }

//     removeChaptersContent(control, i: number) {
//         control.removeAt(i);
//     }

//     get formData() {
//         return <FormArray>this.form.get('bookContent');
//     }

//     onSubmit() {

//         let formData = this.form.value;

//         this.route.params.subscribe(params => {
//             if (params.hasOwnProperty('id')) {
//                 this.http.put(`/books/${params['id']}`, formData)
//                     .subscribe(
//                         successData => {this.router.navigate(['/system/education/book']), this.http.successHandler( this.http.edit = 'edit' )},
//                         erroData => {this.http.errorHandler(erroData)}
//                     );
//             }
//              else {
//                 this.http.post('/books', formData)
//                     .subscribe(
//                         successData => {this.router.navigate(['/system/education/book']), this.http.successHandler('Livro Criado com Sucesso')},
//                         erroData => {this.http.errorHandler(erroData)}
//                     );
//             }
//         });
//     }
// }