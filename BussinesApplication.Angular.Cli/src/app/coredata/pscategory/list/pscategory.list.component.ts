import { Component, Injectable, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';

@Component({
  selector: 'pscategory-list',
  templateUrl: './pscategory.list.component.html',
  styleUrls: ['./pscategory.list.component.scss']
})
export class CoreDataPSCategoryListComponent implements OnInit {

  private psTotalCount: number = 0;
  private maxPSCount: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    public authService: AuthService,
    private psCategoryService: PSCategoryService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }




 
}
