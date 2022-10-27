import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarService } from '../proyectos/sidebar/sidebar.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  constructor(private router: ActivatedRoute,private Ruta: Router, public sidebarservice: SidebarService) {
    //recibe los datos de la ruta de navegacion
    this.router.params.subscribe(
      parametros => {
        
        this.categoria= parametros.categoria;
        this.grado= parametros.grado;
        
      }
    );
    console.log(this.categoria, this.grado);
   }
  categoriano: boolean = false;
  categoria: string;
  grado: number;
  categorias = [{n:'Aula'},{n:'Comunitario'},{n:'Escolar'},{n:'NS'},{n:'ML'}];

  ngOnInit(): void {
    //verifica que sea la ruta correcta con el array
    this.categorias.forEach(element => {
      if(element.n === this.categoria){
        this.categoriano = true;
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

}
