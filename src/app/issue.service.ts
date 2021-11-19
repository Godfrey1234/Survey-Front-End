import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getIssues(){
    return this.http.get('${this.uri}/issues');
  }

  getIssueById(){
    return this.http.get('${this.uri}/issues/${id}');
  }

  addIssue(){
    const issue = {

    };
    return this.http.post('${this.uri}/issues/add',issue);
  }

  updateIssue(){
    const issue = {

    };
    return this.http.post('${this.uri}/issues/update/${id}',issue);
  }

  deleteIssue(){
    return this.http.get('${this.uri}/issues/delete/${id}');
  }
}
