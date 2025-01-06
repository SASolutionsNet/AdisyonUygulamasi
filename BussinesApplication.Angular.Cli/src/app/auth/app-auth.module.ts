import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppAuthRoutes } from './app-auth.routing';
import { AppAuthComponent } from './app-auth.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AppAuthRoutes),
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppAuthComponent
    ]
})

export class AppAuthModule { }
