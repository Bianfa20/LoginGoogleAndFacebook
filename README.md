# Ionic 4 - `Angular`
## Login Con Google y Facebook 
Implementar un login con google o con facebook en ionic puede ser un dolor de cabeza para muchos desarrolladores de app móviles híbridas, pero con esta guia dejara de ser una molestia, espero que les sea de mucha utilidad y recuerden que esta guia esta enfocado en proyectos Ioni con Angular.

Funcionando desde el `30/01/2020`

- [Configuración previa](https://github.com/Bianfa20/LoginGoogleAndFacebook#configuración-previa)
- [Login con Google](https://github.com/Bianfa20/LoginGoogleAndFacebook#login-con-google)
- [Login con Facebook](https://github.com/Bianfa20/LoginGoogleAndFacebook#login-con-facebook)


## Configuración previa
Para desarrollar el login con google y facebook, debemos primero conectar nuestro proyecto ionic a firebase, para esto debemos:
 1. Crear un proyecto en [firebase](https://console.firebase.google.com/)
 2. Instalar [angularfire2](https://github.com/angular/angularfire) en nuestro proyecto Ionic
 3. Configurar nuestro proyecto Ionic

### 1. Crear un proyecto en firebase
Antes de empezar a desarrollar el login debemos crear una cuenta en firebase, no tiene ningun costo para lo que necesitamos ahora, luego de que tengamos una cuenta en firebase debemos crear un proyecto desde la consola de firebase en la opción añadir proyecto como se puede ver en la siguiente imagen.

![](https://i.imgur.com/Wqiouur.png)

luego nos pedirá un nombre para el proyecto, ingresamos el nombre que desee, en este caso sera LoginGaF.

![](https://i.imgur.com/A08W4QM.png)

Ahora google nos preguntará si queremos utilizar Google Analytics, en este caso no lo utilizaremos pero le igual le damos en continuar.

![](https://i.imgur.com/RlxU8js.png)

Luego seleccionamos una ubicación, aceptamos los terminos y condiciones, y le damos en crear proyecto, y finalmente tendremos nuestro proyecto creado en firebase.

### 2. Instalar angularfire2 en nuestro proyecto Ionic
Tenga en cuenta que esta guía consiste en explicar como implementar un login con google y facebook utilizando un proyecto ionic ya existente, en esta guia utilizaremos el proyecto que se encuentra en el [commit 3 Diseño del ejemplo](https://github.com/Bianfa20/LoginGoogleAndFacebook/tree/1a79f88f1f8596cd5091a5cc7326dbd20aeb370d) del repositorio: [LoginGoogleAndFacebook](https://github.com/Bianfa20/LoginGoogleAndFacebook).

##### Vista del diseño:
![](https://i.imgur.com/BrygreP.png)

Para instalar angularfire2 solo necesitamos ejecutar el siguiente comando por terminal, desde el proyecto:

```sh
\ProyectoIonic> npm install @angular/fire firebase --save
```

### 3. Configurar nuestro proyecto Ionic
Para configurar nuestro proyecto ionic primero debemos obtener los datos de configuración de nuestro proyecto firebase desde la consola de firebase, para esto le damos click al icono `(marcado en rojo)` para luego ingresar a la configuración del proyecto `(marcado en azul)`, como podemos ver en la siguiente imagen.

![](https://i.imgur.com/jo6eubZ.png)

Ahora le damos en el boton `marcado en rojo` en la siguiente imagen.

![](https://i.imgur.com/IkRwkK2.png)

Ahora google nos pedirá un apodo para la aplicación, puedes poner el que desee, en este caso pondre de nuevo LoginGaF y le damos en `Registrar aplicación`.

![](https://i.imgur.com/V8Lr2k4.png)

Y obtendremos los datos necesarios para configurar nuestro proyecto ionic, copiamos toda la variable firebaseConfig `marcado en un cuadro negro`, como podemos ver en la siguiente imagen.

![](https://i.imgur.com/VDk8izv.png)

Ahora que tenemos los datos de firebaseConfig, abrimos el archivo `/src/enviroments/enviroments.ts` de nuestro proyecto ionic y exportamos una nueva constante `firebaseConfig`

```javascript
export const environment = {
    production: false
};

export const firebaseConfig = {
    apiKey: "<tu apikey>",
    authDomain: "<tu authDomain>",
    databaseURL: "<tu databaseURL>",
    projectId: "<tu projectId>",
    storageBucket: "<tu storageBucket>",
    messagingSenderId: "<tu messagingSenderId>",
    appId: "<tu appId>",
    measurementId: "<tu measurementId>"
}
```

Y para terminar la configuración de nuestro proyecto debemos que importar la variable `enviroment` que es la que editamos anteriormente y debemos que añadir también el modulo `AngularFireModule` para conectar nuestro proyecto a firebase y `AngularFireAuthModule` para utilizar el servicio de autenticación de firebase en el archivo `/src/app/app.module.ts`

```javascript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
...

// Firebase
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), //Modulo 1 a importa
    AngularFireAuthModule // Modulo 2 a importar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Login con Google
Para implementar el login de google en nuestro proyecto ionic debemos:
1. Habiliar autenticación de google en [firebase](https://console.firebase.google.com/)
2. Implementar la autenticación en Ionic
3. Implementar el plugin [GooglePlus](https://ionicframework.com/docs/native/google-plus)

### 1. Habiliar autenticación de google en firebase
Para habilitar la autenticación con google en firebase, solo debemos entrar a la consola de firebase, ingresar en la parte de `Authentication` y luego en `Método de inicio de sesión`.

![](https://i.imgur.com/Y239KNf.png)

Ahora podemos ver una tabla de proveedores de inicio de sesión, damos click en `Google` y se nos desplegará un cuadro de configuración para el inició de sesión con google, dentro del cuadro damos click en  `Habilitar`, en `Nombre público del proyecto` ingresamos el nombre de nuestra app (con este nombre es que firebase pedirá permisos al usuario cuando intente loguearse con google), en el campo de `Correo electrónico de ...` proporcionamos nuestro correo y por último le damos en `Guardar`, como podemos ver en la siguiente imagen.

![](https://i.imgur.com/LeGWq9I.png)

Y finalmente podemos ver la autenticación de google en firebase habilitada como se muestra en la siguiente imagen.

![](https://i.imgur.com/g2WOpdy.png)

### 2. Implementar la autenticación en Ionic
Recuerde que en esta guia nos apoyamos en un diseño previamente desarrollado para facilitar la implementación del login, dicho diseño consiste en dos botones como podemos ver en `Vista del diseño`, uno para iniciar sesión con google que ejecuta el método `LoginGoogle()`, y el otro para iniciar sesión con facebook que ejecuta el método `LoginFacebook()`, estos métodos por ahora simplemente ejecutan un console.log, pero ahora vamos a importar el servicio de autenticación de firebase para implementar el login de google.

Para implementar el login de google debemos inyectar el servicio de autenticación `AngularFireAuth` como se mencionó anteriormente e importar la libreria de firebase, de la siguiente manera.

```javascript
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  picture;
  name;
  email;

  constructor( private afAuth: AngularFireAuth ) {}

  loginGoogle() {
    console.log('Login con google') ;
  }

  loginFacebook() {
    console.log('Login con Facebook');
  }

}
```

Ahora convertimos nuestro método `loginGoogle()` en uno `async` y editamos el método de la siguiente forma.

```javascript
async loginGoogle() {
    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
 }
```

Ahora, corremos nuestro proyecto ionic e intentemos iniciar sesión con google, nos pedirá la cuenta con la que queremos iniciar sesión y luego nos imprimirá por consola todo los datos obtenidos del usuario además de los datos que pintamos en la app, como podemos ver en la siguiente imagen.

![](https://i.imgur.com/HREYHfM.png)

### 3. Implementar el plugin GooglePlus
Hasta este punto de la guia ya tenemos un login con google pero este login aún no funciona en ambientes móviles, para esto necesitamos usar el plugin `GooglePlus` de ionic, entonces comencemos con la instalación del plugin en nuestro proyecto.

```sh
\ProyectoIonic> ionic cordova plugin add cordova-plugin-googleplus

\ProyectoIonic> npm install @ionic-native/google-plus
```

Antes de empezar a utilizar este plugin en nuestro proyecto ionic, necesitamos configurar nuestro proyecto firebase para iOS y Android, para esto debemos entrar a la consola de firebase en nuestro proyecto, le damos en `Añadir aplicación`, como se puede observar en la siguiente imagen.

![](https://i.imgur.com/05iZyRJ.png)

Ahora seleccionamos el icono de android.
![](https://i.imgur.com/5OqMkKB.png)

Luego nos piden el nombre del paquete de android o dominio, esto lo podemos encontrar en el archivo `config.xml` este nombre lo podemos cambiar, yo lo tengo como `io.ionic.starter` y lo cambiaré a `com.pragma.logingaf` de igual forma pondré en el `name` el nombre de mi aplicación para que quede de la siguiente manera.

NO PONER MAYUSCULAS EN EL NOMBRE DEL PAQUETE
![](https://i.imgur.com/ekP5qxX.png)

Si estas utilizando capacitor, asegurate de editar también el nombre del paquete o dominio en el archivo `capacitor.config.json`

![](https://i.imgur.com/7YTzKrC.png)

Ya que conocemos el nombre del paquete de nuestra aplicación volvemos a firebase e ingresamos el nombre en `nombre del paquete de android` en este caso sería `com.pragma.logingaf`, en `Apodo de la aplicacion` es recomendable poner el nombre de nuestra app para este caso sería LoginGaF y en el `Certificado de firma de depuración SHA-1` aunque firebase lo pida como opcional, para el login en ionic es muy importante, asi que ejecutamos el siguiente comando dependiendo del S.O. de nuestra maquina.

Mac/Linux:
```sh
$ keytool -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore
```

Windows:
```sh
> keytool -list -v -alias androiddebugkey -keystore C:\Users\SUUSUARIO\.android\debug.keystore
```

*nota:* La variable `keytool` para windows la podemos usar instalando la versión reciente de JDK.

Al ejecutar el comando anterior nos pedirá una contraseña, ingresamos `android` y obtendremos el `SHA-1`, la cual tenemos que ingresar en firebase, lo cual al llenar todos los campos quedaría algo parecido a la siguiente manera.

![](https://i.imgur.com/7TlF1Uh.png)

Le damos en `Registrar aplicación` y descargamos el archivo .JSON que nos proporciona firebase, es muy importante que conservemos ese archivo porque es necesario para cuando tengamos nuestro proyecto android y lo ejecutemos, además de que tiene un dato importante que necesitaremos para utilizar el plugin GooglePlus.

![](https://i.imgur.com/v8LXJWe.png)

Luego le damos siguiente a todo, hasta que nos diga que esta comprobando la aplicación, saltamos ese paso, como se puede ver en la siguiente imagen.

![](https://i.imgur.com/kb7AD2h.png)

Y listo, ya tenemos nuestra aplicación android registrado en firebase, para iOS lo explicaré en otra ocasión.

Ahora que tenemos nuestra aplicación android registrada en firebase e instalado el plugin GooglePlus, podemos implementar el login de google en ambientes android, para esto necesitamos inyectar `GooglePlus` en nuestro proyecto y también necesitamos inyectar `platform` para poder diferenciar si el proyecto esta siendo ejecutado en un ambiente móvil o en un ambiente web, todo esto de la siguiente manera.

Abrimos el archivo `/src/app/app.module.ts` e importamos GooglePlus
```javascript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
...

// Plugins
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), //Modulo 1 a importa
    AngularFireAuthModule // Modulo 2 a importar
  ],
  providers: [
      ...,
      GooglePlus
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Luego abrimos el archivo `/src/app/home/home.page.ts` e inyectamos los plugins antes mecionados y lo utilizamos de la siguiente manera, tenga en cuenta que el método `loginGoogle()` lo dividimos en otros dos métodos `loginGoogleAndroid()` y `loginGoogleWeb`.
```javascript
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ...
  constructor(
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus
  ) {}

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      'webClientId': <tu client_id>,
      'offline': true
    });
    const resConfirmed = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
  }

  async loginGoogleWeb() {
    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
  }
  ...
}
```

En el codigo anterior tenemos que reemplazar `<Tu client_id>` por nuestro `client_id` que podemos encontrar en el archivo `google-services.json` que descargamos previamente en firebase registrando nuestra aplicación android, dicho archivo tiene varios client_id, el que nosotros debemos utilizar es el que esta dentro de del atributo `services`, y el que tiene el `client_type` en 3.

```javascript
{
  ... ,
  "client": [
      ... ,
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": "945473312650-fgpee13gk4vpbrqcnenbm4s5g78jtqk3.apps.googleusercontent.com",
              "client_type": 3
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
}
```

Si el codigo anterior fuera nuestro JSON del archivo `google-services.json`, nuestro `client_id` seria `"945473312650-fgpee13gk4vpbrqcnenbm4s5g78jtqk3.apps.googleusercontent.com"`

Y finalmente para terminar con la implementación de nuestro login de google debemos construir el proyecto de android y copiar nuestro archivo `google-services.json` en la carpeta `/android` y en la carpeta `/android/app`, y listo tenemos nuestro login de google funcionando en ambientes android y web.

## Login con Facebook
Para implementar el login de facebook en nuestro proyecto ionic debemos:
1. Crear la aplicación en [facebook para desarrolladores](https://developers.facebook.com/)
2. Configurar firebase con nuestra aplicación de facebook
3. Implementar la autenticación en Ionic
4. Implementar el plugin [facebook](https://ionicframework.com/docs/native/facebook)

### 1. Crear la aplicación en facebook para desarrolladores
Para crear una aplicación en facebook, debemos primero iniciar sesión para que se nos habilite la pestaña de `Mis apps` le damos click allí y luego en `Crear una aplicación` como podemos ver en la siguiente imagen.

![](https://i.imgur.com/IhP8n6O.png)

Luego proporcionamos el nombre de la aplicación y un correo electrónico que facebook automáticamente proporciona con el que hemos iniciado sesión, y le damos click en `Crear identificador de la app`.

![](https://i.imgur.com/J8wHo8V.png)

Se nos abrirá un panel de servicios que ofrece facebook para nuestra aplicación, escogemos `Inicio de sesión con Facebook` dandole click en `Configurar`.

![](https://i.imgur.com/tBbFPAp.png)

Luego facebook nos pedirá en que plataforma queremos usar el servicio, seleccionamos `web`, luego configuraremos el servicio para `android`.

![](https://i.imgur.com/COl0OFJ.png)

Ahora nos pediran la URL de la pagina que consumira el servicio de sesión con facebook, como en este caso solo será una configuración de prueba, proporcionare mi `localhost` con el puerto en el que corro mi proyecto ionic, de la siguiente manera.

![](https://i.imgur.com/bM8sEvy.png)

Damos click en `save` y luego omitimos los siguientes pasos, simplemente damos click en `Configuración` y luego en `Básica`, para configurar la política de privacidad ya que sin ella no podemos activar nuestra aplicación de facebook.

![](https://i.imgur.com/UN2z4Fj.png)

Para configurar la política de privacidad de nuestra aplicación, simplemente ingresamos en `URL de la Política de privacidad` exactamente la url en la que estamos, dicha url sería `https://developers.facebook.com/apps/${tuIdApp}/settings/basic/`, lo cual quedaria algo asi.

![](https://i.imgur.com/QFFBTKb.png)

Ahora cambiamos el estado de nuestra aplicación dandole click al boton que se muestra en la parte superior del panel.
![](https://i.imgur.com/JolZQCD.png)

Luego nos mostrarán un modal para que elijamos la categoría de la aplicación, seleccionamos el que más se relacione con nuestra aplicación y le damos click en `Cambiar modo`.

![](https://i.imgur.com/CeOLgtq.png)

### 2. Configurar firebase con nuestra aplicación de facebook
Para configurar nuestra aplicación de facebook en firebase, necesitamos el `Identificador de la app` y la `Clave secreta de la app`, que podemos encontrar en facebook volviendo a `Configuración > Básica`, donde configuramos anteriormente la política de seguridad, para obtener la clave secreta debemos darle click en mostrar.

![](https://i.imgur.com/2CqdSOL.png)

Luego ingresamos la clave de la cuenta con la que iniciamos sesión en facebook.

![](https://i.imgur.com/xb9nMLJ.png)

Damos click en `Enviar` y podremos ver la clave secreta de nuestra aplicación de facebook.

Ahora volvemos a la consola de firebase e ingresamos en `Authentication > Método de inicio de sesión` como hicimos anteriormente para habilitar la autenticación de google, solo que esta vez será para habilitar la autenticación con facebook, para esto damos click en `facebook`.

![](https://i.imgur.com/94guU3V.png)

Damos click en habilitar e ingresamos el identificador de la app en `App ID` y la clave secreta en `App Secret`, y antes de darle `Guardar` copiamos la url que nos proporcionan debajo del `App Secret`.

![](https://i.imgur.com/eZQ2tkx.png)

Ahora si le damos en `Guardar` y volvemos a facebook, allí damos click en `Inicio de sesión con Facebook` y luego en `Configuración`.

![](https://i.imgur.com/wbnQ2Py.png)

Y en `URI de redireccionamiento de OAuth válidos` pegamos la url que copiamos de firebase y le damos en `Guardar cambios`.

![](https://i.imgur.com/4l4okYb.png)

### 3. Implementar la autenticación en Ionic
Para implementar la autenticación de facebook en nuestro proyecto ionic simplemente debemos editar el método `loginFacebook()` de la siguiente manera.

```javascript
async loginFacebook() {
    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
}
```

Ahora, corremos nuestro proyecto ionic e intentemos iniciar sesión con facebook, deberiamos obtener el siguiente error.

![](https://i.imgur.com/adD8PHO.png)

Pero esto no quiere decir que implementamos mal el login con facebook, solo que facebook rechaza las peticiones de autenticación de un sitio web que corre en http y no en https, y nosotros estamos corriendo nuestra aplicación en http, lo que quiere decir que nuestra aplicación ya hace peticiones de autenticación a facebook en ambientes web.

### 4. Implementar el plugin facebook
Hasta este punto de la guia ya tenemos un login con facebook funcionando solo en ambientes web, ahora vamos a implementar el plugin `facebook` en nuestro proyecto ionic para que nuestro login funcione en ambientes android también, para esto debemos comenzar con la instalación de dicho plugin.

Para la instalación del plugin necesitamos el `Identificador de la app` y el `Nombre para mostrar` que se encuentra en la `Configuración > Básica` de nuestra aplicación de facebook.

![](https://i.imgur.com/ghm9z0S.png)

Luego debemos ejecutar el siguiente comando reemplazando las variables con los datos que acabamos de consultar de nuestra aplicación.

```sh
\ProyectoIonic>  ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="TuIdentificadorDeLaApp" --variable APP_NAME="TuNombreParaMostrar"

\ProyectoIonic> npm install @ionic-native/facebook
```

Abrimos el archivo `/src/app/app.module.ts` e importamos Facebook

```javascript
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
...

// Plugins
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), //Modulo 1 a importa
    AngularFireAuthModule // Modulo 2 a importar
  ],
  providers: [
      ...,
      GooglePlus,
      Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Luego abrimos el archivo `/src/app/home/home.page.ts` e inyectamos el plugin `facebook` para utilizarlo de la siguiente manera, tenga en cuenta que el método `loginFacebook()` lo dividimos en otros dos métodos `loginFacebookAndroid()` y `loginFacebookWeb()`.

```javascript
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ...
  constructor(
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus,
    private fb: Facebook
  ) {}

  loginFacebook() {
    if (this.platform.is('capacitor')) {
      this.loginFacebookAndroid();
    } else {
      this.loginFacebookWeb();
    }
  }

  async loginFacebookAndroid() {
    const res: FacebookLoginResponse = await this.fb.login(['public_profile', 'email']);
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    const resConfirmed = await this.afAuth.auth.signInWithCredential(facebookCredential);
    const user = resConfirmed.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
  }

  async loginFacebookWeb() {
    const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;
  }
  ...
}
```

### 5. Configurar proyecto android
Luego de implementar el plugin 'facebook' en nuestro proyecto, debemos agregar la plataforma de android en nuestra aplicación de facebook, desde facebook para desarrolladores, entrando de nuevo a la `Configuración > Básica`, como lo hemos hecho anteriormente, y bajamos del todo en la pagina y damos en `Agregar plataforma`.

![](https://i.imgur.com/sSjmOVm.png)

Luego nos pedirán seleccionar una plataforma seleccionamos `Android`

![](https://i.imgur.com/QD9PHCp.png)

Facebook nos pedirá el nombre del paquete, que ya todos sabemos cual es en este caso, `com.pragma.logingaf` y nos pedirá un hash de clave la cual obtenemos ejecutando el siguiente comando dependiendo del S.O. de su maquina.

Mac/Linux:
```sh
$ keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64
```

Windows:
```sh
> keytool -exportcert -alias androiddebugkey -keystore "C:\Users\SUUSUARIO\.android\debug.keystore" | openssl sha1 -binary | openssl base64
```
*nota:* La variable openssl para windows la podemos encontrar en https://code.google.com/archive/p/openssl-for-windows/downloads

El comando anterior nos pedirá una contraseña, ingresamos android y obtendremos el hash que necesitamos proporcionarle a facebook.

Luego de conocer el nombre del paquete y el hash de clave volvemos a facebook e ingresamos los datos en sus campos correspondientes, activamos la opcion `Inicio de sesión único` y damos en `Guardar cambios`, como se puede ver en la siguiente imagen.

![](https://i.imgur.com/aDUAcDd.png)

Al darle `Guardar cambios` facebook nos notificará que no pudo encontrar la aplicación en Google Play con el nombre del paquete, pero eso significa que todo esta bien, ya que no hemos subido nuestra aplicación en dicha tienda, simplemente le damos en `Usar el nombre de este paquete`.

![](https://i.imgur.com/hbSo4EO.png)

Ahora necesitamos configurar lo siguiente en nuestro proyecto de android.

Abrimos el archivo `strings.xml` que normalmente se encuentra en `/app/res/values/` del proyecto de android y agregamos las siguientes lines.

```android
<string name="fb_app_name">NombreDeTuAppEnFacebook</string>
<string name="fb_app_id">IdentificadorDeLaApp</string>
<string name="fb_login_protocol_scheme">fb'IdentificadorDeLaApp'</string>
```
En este caso sería.

```android
<resources>
    <string name="app_name">LoginGaF</string>
    <string name="title_activity_main">LoginGaF</string>
    <string name="package_name">com.pragma.logingaf</string>
    <string name="custom_url_scheme">com.pragma.logingaf</string>
    <string name="fb_app_name">LoginGaF</string>
    <string name="fb_app_id">600043833895236</string>
    <string name="fb_login_protocol_scheme">fb600043833895236</string>
</resources>
```

Tenga en cuenta que la última linea es el mismo identificador de la app pero con un `fb` antes.
Ahora editamos el archivo `AndroidManifest.xml` que normalmente se encuentra en `/app/manifests/`, agregando a la etiqueta manifest la siguiente propiedad.

```android
<manifest
    xmlns:tools="http://schemas.android.com/tools"
...>
```

y debajo del `activity` en el mismo archivo `manifest.xml` agregamos lo siguiente.

```android
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/fb_app_id"/>
<activity tools:replace="android:label" android:name="com.facebook.FacebookActivity" android:configChanges= "keyboard|keyboardHidden|screenLayout|screenSize|orientation" android:label="@string/app_name" />
<activity android:name="com.facebook.CustomTabActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="@string/fb_login_protocol_scheme" />
    </intent-filter>
</activity>
```

Y por último debemos resolver el error de hash que se genera al implementar facebook con ionic en android studio, para esto simplemente corremos nuestro proyecto android en un dispositivo móvil físico, no en un emulador porque estos seguiran utilizando el hash que ya hemos registrado en facebook.

Con la aplicación corriendo en nuestro celular intentamos iniciar sesión con facebook y volvemos al ide de android, entramos en la pestaña `LogCat`, ingresamos `hash` en el buscador y seleccionamos `No Filters`, deberiamos obtener el siguiente error.

![](https://i.imgur.com/eQKEu39.png)

Y el `key hash` de la imagen anterior, marcado en rojo, es el hash que debemos añadir en nuestra aplicación de facebook, volviendo a `Configuración > Básica`, como hicimos añadiendo el primer hash.

![](https://i.imgur.com/POdZgx3.png)

Damos en `Guardar cambios` luego en `Usar el nombre de este paquete` y finalmente tenemos un login con google y facebook funcionando en ambientes android y web utilizando Ionic 4.

Ojalá esta guía les pueda ser muy útil.

*Autor:* *Fabian Serna*.
*Correos*: *fabian.serna@pragma.com.co* o *fabianserna2013@gmail.com*
























