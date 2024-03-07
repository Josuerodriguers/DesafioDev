import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'https://gsm-hmg.centralitcloud.com.br/citsmart/services/';
  private sessionToken: string = '';

  constructor(private http: HttpClient) {
    this.sessionToken = localStorage.getItem('sessionToken') || '';
  }

  login(userName: string, password: string): Observable<any> {
    const fullUserName = 'citsmart.local\\' + userName;

    const body = {
      clientID: 'API_PBI',
      language: 'pt_BR',
      userName: fullUserName,
      password: password,
    };

    const headers = this.generateHeaders();

    return this.http.post(this.apiURL + 'login', body, { headers }).pipe(
      map((response: any) => {
        console.log('Login response:', response);
        if (response.sessionID) {
          this.updateSession(response.sessionID, userName);
          this.startSessionTimer();
        }
        return response;
      }),
      catchError(error => {
        return throwError('Erro ao fazer login. Por favor, tente novamente.'); 
      })
    );
  }

  getData(): Observable<any> {
    const token = this.getSessionToken();

    const body = {
      sessionID: token,
      queryName: 'DESAFIODEV',
    };

    const headers = this.generateHeaders();

    return this.http.post(this.apiURL + 'data/query', body, { headers }).pipe(
      catchError(error => {
        return throwError('Erro ao obter dados. Por favor, faça login novamente.');
      })
    );
  }

  private generateHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private updateSession(sessionID: string, userName: string): void {
    this.sessionToken = sessionID;
    localStorage.setItem('sessionToken', sessionID);
    localStorage.setItem('username', userName);
  }

  private startSessionTimer(): void {
    setTimeout(() => {
      this.endSession();
      alert('Sua sessão expirou. Por favor, faça login novamente.');
    }, 10 * 60 * 1000);
  }

  private endSession(): void {
    this.sessionToken = '';
    localStorage.removeItem('sessionToken');
  }

  getSessionToken(): string {
    // console.log('sessionToken:', this.sessionToken);
    return this.sessionToken;
  }
}
