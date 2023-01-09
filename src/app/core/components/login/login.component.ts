import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { SnackBarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {
    this.formGroup = this._buildForm();
  }

  ngOnInit(): void {
  }

  private _buildForm(): FormGroup {
    return this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {

    if (this.formGroup.invalid) return;

    const { username, password } = this.formGroup.value;
    this._authService.login(username, password).subscribe({
      next: (user) => {
        this._localStorageService.set('user', JSON.stringify(user));
        this._localStorageService.set('access_token', user.access_token);

       this._router.navigate(['']);
      },
      error: (e) => {
        console.log(e);
        this._snackBarService.show({message: 'NOT FOUND'})
      }
    })
  }

}
