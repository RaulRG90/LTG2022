import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../proyectos/sidebar/sidebar.service';
import { ContenidoService } from 'src/app/services/contenido.service';
import { RegistroService } from '../services/registro.service';
import { MdbTablePaginationComponent, MdbTableDirective } from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
  categoriano: boolean = false;
  categoria: string;
  gradoid: string;
  categorias = [{n:'Aula'},{n:'Comunitario'},{n:'Escolar'},{n:'NS'},{n:'ML'}];
  
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  content : any =  [];
  previous: any = [];
  headElements = ['#', 'Título del proyecto', 'Campo formativo', '# Página', '', ''];
 
  constructor(
    private router: ActivatedRoute,
    private Ruta: Router, 
    public sidebarservice: SidebarService,
    public contenido: ContenidoService,
    public registro: RegistroService
    ) {
    //recibe los datos de la ruta de navegacion
    this.router.params.subscribe(
      parametros => {
        
        this.categoria= parametros.categoria;
        this.gradoid= parametros.grado;
        
      }
    );
    //console.log(this.categoria, this.grado);
   }
  

  ngOnInit(): void {
    //verifica que sea la ruta correcta con el array
    this.categorias.forEach(element => {
      if(element.n === this.categoria){
        this.categoriano = true;
        //console.log(this.categoria, this.gradoid);
        //consultar datos cuando se refresca el navegador
        this.contenido.infocontenido(this.categoria, this.gradoid).subscribe((data: any[]) =>{
          this.content = data;
          //console.log(this.content);
          
          this.mdbTable.setDataSource(this.content);
          this.content = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();

        });

      }
    });
    if(!this.categoriano){
      this.Ruta.navigate(['/']);
    }
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  
  oupen(ruta){
    self.top.location.href = ruta;
  }


 
  datos(id, grado){
    this.contenido.infocontenido(id, grado).subscribe((data: any[]) =>{
      this.content = data;
      this.mdbTable.setDataSource(this.content);
      this.content = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
    
  }

  reg( id_contenido, tipo){
    console.log(id_contenido, tipo);
    this.registro.dat(id_contenido, tipo).subscribe();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    //this.cdRef.detectChanges();
  }

}
