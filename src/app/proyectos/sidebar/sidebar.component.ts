import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  categoria: string;
  grado: number;
  constructor(public sidebarservice: SidebarService, private router: ActivatedRoute) {
    
    //recibe los datos de la ruta de navegacion
    this.router.params.subscribe(
      parametros => {
        
        this.categoria= parametros.categoria;
        this.grado= parametros.grado;
        
      }
    );
    //console.log(this.categoria, this.grado);
    this.menus = sidebarservice.getMenuList(this.categoria);
   }
  
  

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }else{
      console.log("fdfd");
    }
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  ngOnInit() {
  }

  oupen(id, grado){
    this.categoria = id;
    this.grado = grado;
  }
}
