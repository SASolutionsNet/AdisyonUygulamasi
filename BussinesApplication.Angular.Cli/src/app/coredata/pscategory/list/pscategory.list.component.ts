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
  private psCategoryWithMaxPSCount: PSCategory = null;

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

  onFilterUpdated(rows) {
  }

  onDataLoaded(rows: PSCategory[]) {
    //let totalPSCount: number = 0;
    //this.maxPSCount = 0;
    //for (var i = 0; i < rows.length; ++i) {
    //  let psCategory: PSCategory = rows[i];

    //  // Aslı'nın ekledileri
    //  if (psCategory.createdUserId == 'c5b2246f-d970-4023-8734-cd54e93b8a1b') {
    //    let psCombinationCount: number = this.psCategoryService.getPSCombinationCount(psCategory);

    //    totalPSCount = totalPSCount + psCombinationCount;

    //    if (psCombinationCount > this.maxPSCount &&
    //      psCategory.name != 'SİSTEME BAĞLI ÇAPRAZ' && // 458M
    //      psCategory.name != 'TAVA' && // 136M
    //      psCategory.name != 'SİSTEME BAĞLI ÇAPRAZ (PREGALVANİZ)' && // 77M
    //      psCategory.name != 'TRAVERS - TIRNAKLI' && // 31M
    //      psCategory.name != 'PALET ALTI EMNİYET PROFİLİ' && // 30M
    //      psCategory.name != 'ZEMİNE BAĞLI ÇAPRAZ' && // 21M
    //      psCategory.name != 'TRAVERS - KÖŞEBENT' && // 19M
    //      psCategory.name != 'AYAK HR' && // 6M
    //      psCategory.name != 'TRAVERS - B' && // 5.2M
    //      psCategory.name != 'ÜST EMNİYET PROFİLİ' && // 3M
    //      psCategory.name != 'SUNTA ALTI EMNİYET PROFİLİ' && // 1.7M
    //      psCategory.name != 'ARABAĞ - KUTU' && // 1.3M
    //      psCategory.name != 'TRAVERS - CB' && // 1.1M
    //      psCategory.name != 'ARABAĞ' && // 1.1M
    //      psCategory.name != 'AYAK HR - PREGALVANİZ' && // 1 M
    //      psCategory.name != 'AYAK PROFİLİ HR' && // 0.4 M
    //      psCategory.name != 'AYAK KORUMA' // 0.36 M
    //    ) {
    //      this.maxPSCount = psCombinationCount;
    //      this.psCategoryWithMaxPSCount = psCategory;
    //    }
    //  }
    //}
    //this.psTotalCount = totalPSCount;
  }

  onSelectionChanged(selected) {
  }

  onActionButtonOneClicked(row) {
    var psCategory: PSCategory = row;
    this.router.navigate(['../update/', psCategory.id], { relativeTo: this.activatedRoute });
  }

  onCreateButtonClicked(event) {
    // https://stackoverflow.com/questions/37196882/angular-2-routing-how-do-i-navigate-to-a-parent-route-from-a-child-route
    this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
  }
}
