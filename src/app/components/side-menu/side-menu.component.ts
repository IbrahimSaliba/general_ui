import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  user: any;
  @Output() userDetailsLoaded = new EventEmitter<any>();



  constructor(private http: HttpClient, private tokenStorageService: TokenStorageServiceService,private router: Router) {
  }

  ngOnInit() {

    let token = this.tokenStorageService.getToken();
    if (token != null) {
      token = token.replace(/[\r\n\t]/g, '').trim()
    }
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}` 
      "Authorization": "Bearer " + token
    });
    this.http.post("http://localhost:8080/api/auth/findUserByToken", token, { headers }).subscribe((res: any) => {
      this.user = res;
      this.userDetailsLoaded.emit(this.user); // Emit user details to parent component

      console.log(this.user);
    });

  }


  goToDashboard(){
    this.router.navigate(['/home'],{ });
  }
  goToUpcoming(){
    this.router.navigate(['/upcoming'],{ });
  }

}
