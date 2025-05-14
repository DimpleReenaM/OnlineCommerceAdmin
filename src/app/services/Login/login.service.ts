import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { LoginReq, LoginResData, ResponseDto, UserDto } from '../../components/login/loginDto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Route, Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userDetail = new BehaviorSubject<UserDto | null | undefined>(undefined);
  private refreshTokenSubscription: Subscription | null = null;
  private apiUrl = 'https://localhost:7174/api/auth'; 
  constructor(private http:HttpClient,private jwtHelper: JwtHelperService,private router: Router

) { }

  login(crediential: LoginReq): Observable<any> {
    return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/login`, crediential).pipe(
      map((res) => {
        if (res.isSuccessed == true) {
          res.data?.accessToken !== undefined && localStorage.setItem('accestoken', res.data?.accessToken);
          res.data?.refreshToken !== undefined && localStorage.setItem('refreshtoken', res.data?.refreshToken);
          res.data?.userData?.email !== undefined && localStorage.setItem('useremail', res.data?.userData?.email);
          res.data?.userData?.userId !== undefined && localStorage.setItem('userId', res.data?.userData?.userId.toString());


          if (res.data?.userData) {
            // Store the user in localStorage correctly
            localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
          }
          this.userDetail.next(res.data?.userData);
          this.isUserLoggedIn.next(true);
          // this.startTokenRefresh();

        }
        return res;
      })
    )
  }
    UserLoggedIn() {
    return this.isUserLoggedIn.value && !this.jwtHelper.isTokenExpired(this.getAccessToken());
  }
  getAccessToken() {
    return localStorage.getItem('accestoken')
  }

  getLoggedInUser(): UserDto | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

   refreshUser() {
    var accessToken = localStorage.getItem('accestoken');
    var refreshToken = localStorage.getItem('refreshtoken');

    return this.http.post<ResponseDto<LoginResData>>(`${this.apiUrl}/refresh`, {
      accessToken,
      refreshToken
    }).pipe(
      map((res) => {
        if (res.isSuccessed == true) {
          res.data?.accessToken !== undefined && localStorage.setItem('accestoken', res.data?.accessToken);
          res.data?.refreshToken !== undefined && localStorage.setItem('refreshtoken', res.data?.refreshToken);
          res.data?.userData?.email !== undefined && localStorage.setItem('useremail', res.data?.userData?.email);
          this.userDetail.next(res.data?.userData)
          if (!this.isUserLoggedIn.getValue()) this.isUserLoggedIn.next(true);
          return true;
        }
        else {
          this.removeUser();
          return of(false);

        }
      }),
      catchError(() => {
        this.removeUser();
        return of(false);
      })
    )

  }

    private removeUser() {
    localStorage.setItem('accestoken', '');
    localStorage.setItem('refreshtoken', '');
    this.isUserLoggedIn.next(false);
    this.userDetail.next(undefined);
    this.stopTokenRefresh();
  }

  stopTokenRefresh() {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
      this.refreshTokenSubscription = null;
    }
  }
  
   LogOut() {
    return this.http.get<ResponseDto<null>>(`${this.apiUrl}/revoke`).pipe(
      map((res) => {
        if (res.isSuccessed) {
          this.removeUser();
          // this.router.navigate('/');
        }
        return res;
      })
    );

  }
  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('Role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}
