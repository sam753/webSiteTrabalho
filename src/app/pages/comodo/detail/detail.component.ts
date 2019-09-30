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
                    dispositivoContentcontrol.push(this.ComodoContent(element.nome, element.tipo, element.status));
                })
                dispositivoContentcontrol.removeAt(0)
            }
        })
    }

    ComodoContent(name: string, tipo: string, status: boolean) {
        return this.fb.group({
            nome: name,
            tipo: tipo,
            status: status
        });
    }

    addComodoContent() {
        const control = <FormArray>this.form.controls['comodoContent'];
        control.push(this.ComodoContent('', '', false));
    }

    removeComodoContent(i: number) {
        const control = <FormArray>this.form.controls['comodoContent'];
        control.removeAt(i);
    }

    get formData() {
        return <FormArray>this.form.get('comodoContent');
    }

    onSubmit() {
        let formdatas = this.form.value

        let formdataFormated = {
            nome: formdatas.nome,
            dispositivos: formdatas.comodoContent

            
        }
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('id')) {
                this.http.put(`/Comodo/${params['id']}`, formdataFormated)
                    .subscribe(
                        successData => {this.router.navigate(['/pages/casa'])},
                        erroData => {}
                    );
            }
             else {
                this.http.post('/Comodo', formdataFormated)
                    .subscribe(
                        successData => {this.router.navigate(['/pages/casa'])},
                        erroData => {}
                    );
            }
        });
    }
}