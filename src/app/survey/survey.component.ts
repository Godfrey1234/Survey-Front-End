import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(private http:HttpClient,private router: Router) {}

  ngOnInit(): void {
  }
  
  onSubmit(data){

    console.log(data)

    this.http.post('http://localhost:3000/InsertData',data, {responseType:'text'})
    .subscribe((result)=>{
      ;
    console.warn("result",result)
    //On submit validation
    if(result == 'Thank you for completing this survey')
    {
      Swal.fire(
        result,
        '',
        'success'
      )
    
     
  

    }else{
      Swal.fire(
        result,
        '',
        'warning'

      )
      
    }
  
  })


  }


  onClick(){}

}
