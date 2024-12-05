import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../model/user';
import { catchError, Observable, throwError } from 'rxjs';
import { Categorie } from '../model/Categorie.model';
import { UserDTO } from '../model/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginURL: string = 'http://localhost:8081/user/login';
  apiURL: string = 'http://localhost:8081/user';
  private coachSign='http://localhost:8081/api/coaches/'



  constructor(private http: HttpClient) { }

  AllUser(): Observable<user[]> {
    return this.http.get<user[]>(this.apiURL);
  }
  allCoach(){
    return this.http.get(this.coachSign +'all')
  }
  allPending(){
    return this.http.get(this.coachSign +'pending')
  }
  pendingId(id:any){
    return this.http.get(this.coachSign + id)

  }
  decision(id: any, decision: string) {
    return this.http.post(this.coachSign + `decision/${id}`, { decision });
  }


  coachID(id:any){
    return this.http.get(this.coachSign + id)
  }
  AddUser( u: user) {
      return this.http.post<user>(this.apiURL,u);
      }

  DeleteUser(id:number){
        return this.http.delete(this.apiURL+"/"+id);
      }
      UpdateCoach(id: number, coach: any) {
        return this.http.put(`${this.coachSign}update/${id}`, coach);
      }

      UpdateUser(u:user){
        return this.http.put<user>(this.apiURL,u);
        }

    viewuser(id: number) {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<user>(url);
        }

    AllCategories(){
        return this.http.get<Categorie[]>(this.apiURL+"/cat");
          }

    findByEmail(email: string): Observable<user> {
        return this.http.get<user>(`${this.apiURL}/searchByEmail?email=${email}`);
          }


          getUserProfile(userId: number): Observable<user> {
            return this.http.get<user>(`${this.apiURL}/${userId}`);
          }

          updateUserProfile(userId: number, user: user): Observable<user> {
            return this.http.put<user>(`${this.apiURL}/${userId}`, user);
          }

          deleteUserProfile(id: number): Observable<any> {
            return this.http.delete(`${this.apiURL}/${id}`);
          }





          // New login method
  login(userDTO: UserDTO): Observable<any> {
    return this.http.post<any>(this.loginURL, userDTO).pipe(
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }


}
