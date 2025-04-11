import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageServiceService } from '../services/token-storage-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  moduleList: any[] = [];


  filteredModules: any[] = [];
  user: any;




  constructor(private http: HttpClient, private tokenStorageService: TokenStorageServiceService, private navCtrl: NavController) { }
  ngOnInit() {

    let token = this.tokenStorageService.getToken();
    if (token != null) {
      token = token.replace(/[\r\n\t]/g, '').trim()
    }
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}` 
      "Authorization": "Bearer " + token
    });

    this.http.post("http://localhost:8080/api/module/listModules", null).subscribe((res: any) => {
      this.moduleList = res;
      this.filteredModules = this.moduleList;
      console.log(this.moduleList);

    });

  }

  onUserDetailsLoaded(data: any) {
    this.user = data;
  }

  filterModulesByCategory(category: number) {
    this.filteredModules = this.moduleList.filter(module => module.category === category);
  }

  sortBycat0() {
    this.filteredModules = this.moduleList;
    console.log(this.filteredModules);

  }

  sortBycat1() {
    this.filterModulesByCategory(1);
    console.log(this.filteredModules);
  }

  sortBycat2() {
    this.filterModulesByCategory(2);
    console.log(this.filteredModules);

  }
  sortBycat3() {
    this.filterModulesByCategory(3);
    console.log(this.filteredModules);

  }

  logout(){
    let token = this.tokenStorageService.getToken();
    if (token != null) {
      token = token.replace(/[\r\n\t]/g, '').trim()
    }
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}` 
      "Authorization": "Bearer " + token
    });
    this.http.post("http://localhost:8080/api/auth/logout", null, {headers}).subscribe((res: any) => {
      this.tokenStorageService.removeToken();

      console.log(res);
      this.navCtrl.navigateRoot('/login', { replaceUrl: true });


    });
  }

}
