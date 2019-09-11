import { Component,OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform, IonApp } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public qrScan:any;

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only  
  };


  constructor( public platform:Platform, public qr:QRScanner,private theInAppBrowser: InAppBrowser) {

      //inicia scanner
      this.StartScanning();
  }

  exitApp(){
    this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
  });
 }


// <ion-text color="dark">
// <div class="centralizar">Posicione sua senha na câmera para que realize a leitura e você será redirecionado para o formulário do FALA COOPERADO.</div>
//</ion-text>


  StartScanning()
  {
    this.qr.prepare().then((status:QRScannerStatus)=>{

        if(status.authorized)
        {
          this.qr.show();
   
         // document.getElementsByTagName("ion-app")[0].style.opacity="0.5";
          this.qrScan =  this.qr.scan().subscribe((textFound:string)=>{
        // document.getElementsByTagName("ion-app")[0].style.opacity="0.5";

          var _codigoTicket = textFound;

          // var objresposta = JSON.parse(textFound);
            //console.log(keys);
            console.log(_codigoTicket);
          //  document.getElementsByTagName("ion-app")[0].style.opacity="0.5";
           this.openWithCordovaBrowser('https://portocredisede.dyndns.org:4078/Formularios/FormularioSugestoes/?ticket='+_codigoTicket);
          // document.getElementsByTagName("ion-app")[0].style.opacity="0.5";
           // window.open("http://portocredisede.dyndns.org:4077/Formularios/FormularioSugestoes/?ticket="+values[0] , "_self");
           // this.dialog.alert(textFound);
//           this.openWithCordovaBrowser('https://portocredisede.dyndns.org:4078/Formularios/FormularioSugestoes/?ticket='+_codigoTicket);

        //desliga camera
      //  this.qrScan.hide();
      //  this.qrScan.unsubsribe();
 

          },(err)=>{
           // this.dialog.alert(JSON.stringify(err));
           console.log(JSON.stringify(err));
          })
        }
        else if(status.denied){
        //  this.dialog.alert('PERMISSÃO NEGADA');
        console.log('Permissão Negada');
        }
      })

  }



  public openWithSystemBrowser(url : string){
    let target = "_system";
    let browser = this.theInAppBrowser.create(url,target,this.options);

}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}

public openWithCordovaBrowser(url : string){
  let target = "_self";
 // this.theInAppBrowser.create(url,target,this.options);

    var theURLchave = "formularioenviado";
      //let browser = this.theInAppBrowser.create(url, target, "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"); //no spaces allowed in Options!
      let browser = this.theInAppBrowser.create(url, target, "hidden=no,location=no,hideurlbar=yes,clearsessioncache=yes,clearcache=yes"); //no spaces allowed in Options!
      browser.on('loadstart').subscribe((e) => { 
          var urlatual = e.url;
          urlatual = urlatual.substring(urlatual.length - 17);
          console.log(urlatual);
          if (urlatual == theURLchave) {
          //  document.getElementsByTagName("ion-app")[0].style.opacity="0";
        this.StartScanning();
            //fecha o navegador
            browser.close();

          }
        });

} 

}
