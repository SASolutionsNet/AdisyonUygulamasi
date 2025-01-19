import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false; // Sidebar'ın daralması ve genişlemesi
  constructor() { }
  ngOnInit(): void {
    // Menü öğelerine tıklama event'i ekle
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open'); // Alt menüyü açma/kapatma
      });
    });
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Sidebar'ı daraltma ve genişletme
  }
}
