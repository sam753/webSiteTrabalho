import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../services/http/http.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'comodo',
  templateUrl: './comodo.component.html',
  styleUrls: ['./comodo.component.scss'],
})
export class ComodoComponent implements OnInit{

  comodos: any;

  source: LocalDataSource = new LocalDataSource();
  settings = {
    noDataMessage: 'Nenhum dado encontrado',
    mode: 'external',
    actions: {
        columnTitle: 'Ações',
        add: true,
        edit: true,
        delete: false,
    },
    add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
    },

    columns: {
        id: { title: 'ID', type: 'number', class: 'filter' },
        nome: { title: 'Nome', type: 'string', class: 'filter' },
    },

    delete: {
        deleteButtonContent: '<i class="nb-plus-circled"></i>',
    },
  };

  constructor(
    private http: HttpService,
  ) {}


  getComodos(): Promise<any> {
    return new Promise<any>(resolve => {
        this.http.get('/Comodo')
            .subscribe(data => { resolve(data); });
    });
}

  async ngOnInit() {
    this.comodos = await this.getComodos();

    this.source.load(this.comodos)
  }

  onCreate(event) {
    console.log('create')
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza que quer deletar esse comodo?')) {
      // this.http.delete(``)
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }
}