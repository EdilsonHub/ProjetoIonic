import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from './services/auth.service';

 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: string = 'HomePage';
  //categoriaPage: string = 'CategoriasPage';

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authService: AuthService
  ){
      
      this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categoria', component: 'CategoriasPage' },
      { title: 'Logout', component: '' },
     // { title: 'Categorias', component: 'CategoriasPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string, component: string}) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch(page.title){  //defeito quando entra no logout ele tenta acessar o token e recebe um 403
       case 'Logout':
        this.authService.logout();
        this.nav.setRoot('HomePage');
       break;
      
    default :
      this.nav.setRoot(page.component);
    }
  }
}
