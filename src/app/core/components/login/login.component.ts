import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder
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
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

}
