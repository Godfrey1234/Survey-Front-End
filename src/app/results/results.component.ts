import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) {}

  ngOnInit(): void {

    this.getAge();
    this.getDetails();
    this.getOldestPerson();
    this.getYoungest();
    this.getPizza();
    this.getPasta();
    this.getPapWors();
    this.getEatOut();
    this.getMovies();
    this.getTv();
    this.getRadio();
    
  }

   //variable to store the token
   tot: string;
   age:string;
   young:string;
   old:string;
   pizza:string;
   pasta:string;
   papANdWors:string;
   eatOut:string;
   movies:string;
   tv:string;
   radio:string;



  
   //function for getting the total number odf surveys
   getDetails(){
     
    this.http.get<any>('http://localhost:3000/totalSurveys')
  .subscribe(response => {

  
    this.tot = JSON.stringify(response);

 
    ;
    console.log(this.tot);
  })
   }
 //function for getting average age
   getAge(){

    this.http.get<any>('http://localhost:3000/avgAge')
    .subscribe(response => {
  
     
      console.log(response);
      this.age =JSON.stringify( response)
    })
        
    }


    //function for getting oldest person
   getOldestPerson(){

    this.http.get<any>('http://localhost:3000/oldPerson')
    .subscribe(response => {
  
      this.old= JSON.stringify( response)
      console.log(response);
    })
        
    }


     //function for getting oldest person
   getYoungest(){

    this.http.get<any>('http://localhost:3000/youngest')
    .subscribe(response => {
  
      this.young= JSON.stringify( response)
      console.log(response);
    })
        
    }


     //function for getting percentage of people who like pizza
   getPizza(){

    this.http.get<any>('http://localhost:3000/percPizza')
    .subscribe(response => {
  
      this.pizza= JSON.stringify( response)
      console.log(response);
    })
        
    }


      //function for getting percentage of people who like pasta
   getPasta(){

    this.http.get<any>('http://localhost:3000/percPasta')
    .subscribe(response => {
  
      this.pasta= JSON.stringify( response)
      console.log(response);
    })
        
    }

 
    
      //function for getting percentage of people who like pap and wors
   getPapWors(){

    this.http.get<any>('http://localhost:3000/percPapAndWors')
    .subscribe(response => {
  
      this.papANdWors= JSON.stringify( response)
      console.log(response);
    })
        
    }


//Number of people who like to eat out
   getEatOut(){

    this.http.get<any>('http://localhost:3000/totEatOut')
    .subscribe(response => {
  
      this.eatOut= JSON.stringify( response)
      console.log(response);
    })
        
    }



    //Number of people who like to watch movies
   getMovies(){

    this.http.get<any>('http://localhost:3000/totMovie')
    .subscribe(response => {
  
      this.movies= JSON.stringify( response)
      console.log(response);
    })
        
    }

  
      //Number of people who like to watch tv
   getTv(){

    this.http.get<any>('http://localhost:3000/totTv')
    .subscribe(response => {
  
      this.tv= JSON.stringify( response)
      console.log(response);
    })
        
    }



      //Number of people who like to watch radio


      getRadio(){

        this.http.get<any>('http://localhost:3000/totRadio')
        .subscribe(response => {
      
          this.radio= JSON.stringify( response)
          console.log(response);
        })
            
        }
  

        onSubmit(data){


          this.router.navigate(['/home']);
        }

   
}
