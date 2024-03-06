import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TicketsComponent } from './component/tickets/tickets.component';
export const routes: Routes = [
    { 
      path: '', 
      redirectTo: '/login', 
      pathMatch: 'full'
     },
     { 
        path: 'login', component: LoginComponent 
      },
    { 
      path: 'tickets', component: TicketsComponent 
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    })
export class AppRoutingModule {}