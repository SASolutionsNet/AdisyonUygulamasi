import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'ÖZET EKRANI',
    type: 'link',
    icon: 'dashboard'
  },
  {
    state: 'coredata',
    name: 'Veriler',
    type: 'sub',
    icon: 'subject',
    children: [
   
      { icon: 'style', type: 'subvirtual', name: 'Malzeme/Ürün Kategori', state: 'pscategory/list' },
      { icon: 'local_offer', type: 'subvirtual', name: 'Malzeme/Ürün Listesi', state: 'ps/list' },
      { icon: 'location_city', type: 'subvirtual', name: 'Masalar', state: 'table/list' },
     
    ]
  },
  {
    state: 'sales',
    name: 'Satış Sipariş',
    type: 'sub',
    icon: 'euro_symbol',
    children: [
      {
        icon: 'subject', type: 'subvirtual', name: 'Müşteriler', state: 'customer/list'
        //, badge: [
        //  { type: 'red', value: '5' }
        //]
      },
      { type: 'subvirtual', name: 'Bahçe Masalar', state: 'garden/table/list' },
     { type: 'subvirtual', name: 'Salon Masalar', state: 'hool/table/list' }
    ]
  },
  {
    state: 'accounting',
    name: 'Hesap',
    type: 'sub',
    icon: 'local_atm',
    children: [
      { type: 'subvirtual', name: 'Bahçe Masalar', state: 'garden/table/list' },
      { type: 'subvirtual', name: 'Salon Masalar', state: 'hool/table/list' }
    
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
