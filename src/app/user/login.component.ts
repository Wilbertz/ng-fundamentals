import { Component } from '@angular/core'

@Component({
   templateUrl: './login.component.html'
})
export class LoginComponent {
    userName: string = "Harald";
    password: string = "wsxedc";

    login(formValues: any) {
        console.log(formValues);
    }
}