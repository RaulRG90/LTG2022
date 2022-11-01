import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: '',
      type: 'header'
    },
    {
      title: 'Aula',
      icon: 'fas fa-chalkboard-teacher',
      id: 'Aula',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: '1',
          url:'/Proyectos/Aula/1'
        }
      ]
    },
    {
      title: 'Escolar',
      icon: 'fas fa-school',
      id: 'Escolar',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: '1',
          url:'/Proyectos/Escolar/1'
        }
      ]
    },
    {
      title: 'Comunitario',
      icon: 'fas fa-users',
      id: 'Comunitario',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: '1',
          url:'/Proyectos/Comunitario/1'
        }
      ]
    },
    {
      title: 'Nuestros Saberes',
      icon: 'fas fa-book-open',
      id: 'NS',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: '1',
          url:'/Proyectos/NS/1'
        }
      ]
    },
    {
      title: 'Múltilples Lenguajes',
      icon: 'fas fa-language',
      id: 'ML',
      active: true,
      type: 'dropdown',
      submenus: [
        {
          title: '1',
          url:'/Proyectos/ML/1'
        }
      ]
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList(cat) {
    this.menus.forEach((element, i) => {
      if(element.id == cat){
        this.menus[i].active = true;
      }else{
        this.menus[i].active = false;
      }
    });
    //console.log(this.menus);
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}

