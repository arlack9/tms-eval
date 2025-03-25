
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { tap ,catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  private base_url = 'http://localhost:8000';

  constructor(private http: HttpClient,
              private router:Router
   ) { }

  submitLogin(username: string, password: string): Observable<any> {

    `
    send login request to server via post
    `
    
    return this.http.post<any>(`${this.base_url}/login/`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.token) {

            

            const auth_token=response.token;
            localStorage.setItem('auth_token', auth_token); // Store the token key

            const user_role = response.user_role;
            localStorage.setItem('user_role',user_role); // store the user role return Employee,Manager,Admin

            console.log('User Role:', user_role);
            console.log('token',auth_token);

          }
        }),
        catchError((error) => {
          // Handle the error here
          console.error('Login failed:', error);
          return throwError(() => new Error('Login failed, please try again.')); // Return an observable with an error message
        })
      );
  
  
    }//end of submitlogin method




logout() {
  console.log("Logout function called"); // Debugging log
  const role=localStorage.getItem('user_role')

  const headers = this.getHeaders();
  return this.http.post<any>(`${this.base_url}/logout/`, {}, { headers })
    .pipe(
      tap(response => {
        console.log("Logout API response:", response); // Debugging log
        if (response) {
          

        
    
          if(role){
    
            if (role=='Employee' ){
              this.router.navigate(['/employees/login']);
      
            }
            else if(role=='Admin'){
              this.router.navigate(['/admins/login']);
          
            }
            else if(role=='Manager'){
              this.router.navigate(['/managers/login']);
            
            }
        
      
        
          }
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_role');
          console.log('User logged out successfully.');
        
         

        }
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        return throwError(() => new Error('Logout failed. Please try again.'));
      })
    ).subscribe();
}



  getHeaders(): any | null {
    `
    method to return headers json 
    `
  const auth_token=localStorage.getItem('auth_token');
  const headers= new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':`Token ${auth_token}`
  })

  return headers
  }


  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUser():string | null{
    return localStorage.getItem('')
  }


}


