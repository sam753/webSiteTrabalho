import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../services/http/http.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'comodo',
  templateUrl: './comodo.component.html',
  styleUrls: ['./comodo.component.scss'],
})
export class ComodoComponent implements OnInit{

  comodos: any;
  // comodos: any = [
  //   {
  //     id: 0,
  //     nome: "teste1",
  //   },
  //   {
  //     id: 1,
  //     nome: "teste2",
  //   }
  // ];

  source: LocalDataSource = new LocalDataSource();
  settings = {
    noDataMessage: 'Nenhum dado encontrado',
    mode: 'external',
    actions: {
        columnTitle: 'Ações',
        add: true,
        edit: true,
        delete: true,
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
        nome: { title: 'Nome', type: 'string', class: 'filter' },
        dispositivos: { title: 'Dispositivos', type: 'string', class: 'filter' }
    },

    delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
    },
  };

  constructor(
    private http: HttpService,
    private router: Router,

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
    this.router.navigate(['/pages/casa/comodo/create']);
  }

  onEdit(event) {
    this.router.navigate([`/pages/casa/comodo/${event.data.id}`]);
  }

  onDelete(event) {
    this.http.delete(`/Comodo/${event.data.id}`).subscribe(
      async successData => {
        this.comodos = await this.getComodos();
      },
      erroData => {}
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Tem certeza que quer deletar esse comodo?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}