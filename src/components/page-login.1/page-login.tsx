import { Component, Event, EventEmitter, Prop, State , h } from '@stencil/core';
import { UserData } from '../../providers/user-data';


@Component({
  tag: 'page-login2',
  styleUrl: 'page-login2.css',
})
export class PageL {
  @State() username = {
    valid: false,
    value: ''
  };
  @State() password = {
    valid: false,
    value: ''
  };
  @State() submitted = false;
  @Prop({ connect: 'ion-router' }) nav;
  @Event() userDidLogIn: EventEmitter;
  handleUsername(ev) {
    this.validateUsername();
    this.username = {
      ...this.username,
      value: ev.target.value
    };
  }

  handlePassword(ev) {
    this.validatePassword();
    this.password.value = ev.target.value;
    this.password = {
      ...this.password,
      value: ev.target.value
    };
  }

  validateUsername() {
    if (this.username.value && this.username.value.length > 0) {
      this.username = {
        ...this.username,
        valid: true
      };

      return;
    }

    this.username = {
      ...this.username,
      valid: false
    };
  }

  validatePassword() {
    if (this.password.value && this.password.value.length > 0) {
      this.password.valid = true;

      this.password = {
        ...this.password,
        valid: true
      };

      return;
    }

    this.password = {
      ...this.password,
      valid: false
    };
  }

  async onLogin(e) {
    e.preventDefault();
    const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();

    console.log('Clicked login');
    this.validatePassword();
    this.validateUsername();

    this.submitted = true;

    if (this.password.valid && this.username.valid) {
      await UserData.login(this.username.value);

      this.userDidLogIn.emit({ loginStatus: true });
      console.log(navCtrl)
      navCtrl.push('/schedule', 'root')
    }
  }

  async onSignup(e) {
    // hola

    console.log('sf');
    e.preventDefault();
    const navCtrl: HTMLIonNavElement = await (this.nav as any).componentOnReady();
    console.log('Clicked signup');
    navCtrl.push('page-signup');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>

          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <div class="login-logo">
          <img src="/assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form novalidate="true" onSubmit={(e) => this.onLogin(e)}>
          <ion-list no-lines>
            <ion-item>
              <ion-label position="stacked" color="primary">Username</ion-label>
              <ion-input name="username" type="text" value={this.username.value} onInput={(ev) => this.handleUsername(ev)} spellcheck={false} autocapitalize="off" required></ion-input>
            </ion-item>

            <ion-text color="danger">
              <p hidden={this.username.valid || this.submitted === false} padding-left>
                Username is required
              </p>
            </ion-text>

            <ion-item>
              <ion-label position="stacked" color="primary">Password</ion-label>
              <ion-input name="password" type="password" value={this.password.value} onInput={(ev) => this.handlePassword(ev)} required></ion-input>
            </ion-item>

            <ion-text color="danger">
              <p hidden={this.password.valid || this.submitted === false} padding-left>
                Password is required
              </p>
            </ion-text>
          </ion-list>

          <ion-row responsive-sm>
            <ion-col>
              <ion-button type="submit" expand="block">Login</ion-button>
            </ion-col>
            <ion-col>
              <ion-button onClick={(e) => this.onSignup(e)} color="light" expand="block">Signup</ion-button>
            </ion-col>
          </ion-row>
        </form>

      </ion-content>

    ];
  }
}
