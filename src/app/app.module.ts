import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgImageSliderModule } from 'ng-image-slider';

//import service class
import { IssueService } from './issue.service';
import { JwtModule } from '@auth0/angular-jwt';
import { SurveyComponent } from './survey/survey.component';
import { ResultsComponent } from './results/results.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ResultsComponent,
    SurveyComponent,
    HomeComponent,

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgImageSliderModule,
    RouterModule.forRoot([
      { path: 'survey', component: SurveyComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'home', component: HomeComponent },

      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');

        },
        allowedDomains: ['localhost'],
        disallowedRoutes: ['http://localhost:3000/login'],
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
