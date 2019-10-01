import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '../../../services/http/http.service';

@Component({
    selector: 'comodoEdit',
    styleUrls: ['./detail.component.scss'],
    templateUrl: './detail.component.html',
})

export class ComodoDetailComponent implements OnInit {

    comodoDispositivos: any;
    form: FormGroup;

    constructor(
        private http: HttpService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
    ) {
    }

    getComodoDispositivos(id: number): Promise<any> {
        return new Promise<any>(resolve => {
            this.http.get(`/Comodo/comododisp/${id}`)
                .subscribe(data => { resolve(data); });
        });
    }

    async ngOnInit() {
        this.form = this.fb.group({ name: '', comodoContent: this.fb.array([ this.ComodoContent('', '', false) ]) });

        this.route.params.subscribe(async params => {
            if ( params.hasOwnProperty('id')) {
                this.comodoDispositivos = await this.getComodoDispositivos(params['id']);

                let i = 0;
                let dispositivoContentcontrol = <FormArray>this.form.controls['comodoContent'];
                this.comodoDispositivos.dispositivos.forEach(element => {
                    dispositivoContentcontrol.push(this.ComodoContent(element.nome, element.tipo, element.status, element.id));
                })
                dispositivoContentcontrol.removeAt(0)
            }
        })
    }

    ComodoContent(name: string, tipo: string, status: boolean, id?) {
        return this.fb.group({
            nome: name,
            tipo: tipo,
            status: status,
            id: id
        });
    }

    addComodoContent() {
        const control = <FormArray>this.form.controls['comodoContent'];
        control.push(this.ComodoContent('', '', false));
    }

    removeComodoContent(i: number) {
        const control = <FormArray>this.form.controls['comodoContent'];

        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('id')) {
                this.http.delete(`/Dispositivo/${control.value[i].id}`).subscribe(
                    async successData => {control.removeAt(i)},
                    erroData => {}
                );
            } else {
                control.removeAt(i);
            }
        })
    }

    get formData() {
        return <FormArray>this.form.get('comodoContent');
    }

    onSubmit() {
        let formdatas = this.form.value

        let formdataFormated = {
            nome: formdatas.name,
            dispositivos: formdatas.comodoContent   
        }

        let formdataFormatedPost = {
            nome: formdatas.name,
            dispositivos: {
                nome: formdatas.comodoContent.nome,
                tipo: formdatas.comodoContent.tipo,
                status: formdatas.comodoContent.status
            }
        }


        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('id')) {
                this.http.put(`/Comodo/${params['id']}`, formdataFormated)
                    .subscribe(
                        successData => {this.router.navigate(['/pages/casa'])},
                        erroData => {}
                    );
            } else {
                this.http.post('/Comodo', formdataFormatedPost)
                    .subscribe(
                        successData => {this.router.navigate(['/pages/casa'])},
                        erroData => {}
                    );
            }
        });
    }
}