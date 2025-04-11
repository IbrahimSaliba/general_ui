import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';

interface Theme {
  background: string;
  color: string;
  primaryColor: string;
  glassColor?: string; // Add optional property if needed
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  username: any;
  password: any;
  myObj: any;
  constructor(private nav: NavController, private http: HttpClient, private tokenStorageService: TokenStorageServiceService, private router: Router, private alertService: AlertServiceService) { }

  ngOnInit() {
    this.tokenStorageService.removeToken();

  }


  submitForm(username: string, password: string): void {
    const credentials = {
      username: username,
      password: password
    };

    this.http.post("http://localhost:8080/api/auth/login", credentials).subscribe(
      async (res: any) => {
        console.log(res);

        if (res.errorCode === "000000") {
          this.tokenStorageService.saveToken(res.errorDescription);
          const data = { token: res.errorDescription };
          this.username="";
          this.password="";
          this.router.navigate(['/home'],{ queryParams: data });
          console.log(res.errorCode);
          
        } else {
          this.username="";
          this.password="";
          await this.alertService.presentAlert('Login Failed', 'Invalid username or password.');

        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }


  // <ion-alert *ngIf="showAlert" trigger="submit-btn" header="Bad credentials"
  // message="Please renter username or password."
  // [buttons]="alertButtons"></ion-alert>

}
