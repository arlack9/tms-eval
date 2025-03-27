import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend/backend.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService
  ) {}



  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', [Validators.required, this.ageValidator(18)]],
      userType: ['employee'] // Default value
    });
    }

    // Custom validator to check if age is at least minAge
    ageValidator(minAge: number) {
    return (control: any) => {
      if (!control.value) {
      return null;
      }
      
      const dob = new Date(control.value);
      const today = new Date();
      const diffMs = today.getTime() - dob.getTime();
      const ageDate = new Date(diffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      
      return age < minAge ? { underage: true } : null;
    };
  }

  get username() { return this.userForm.get('username')?.value || ''; }
  get password() { return this.userForm.get('password')?.value || ''; }
  get firstName() { return this.userForm.get('firstName')?.value || ''; }
  get lastName() { return this.userForm.get('lastName')?.value || ''; }
  get userType() { return this.userForm.get('userType')?.value || ''; }
  get email() { return this.userForm.get('email')?.value || ''; }
  get dob() { return this.userForm.get('dob')?.value || ''; }

  onSubmit(): void {
    if (this.userForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const formData = this.userForm.value;
    const userType = formData.userType || 'employee';
    
    // Prepare data for API
    const payload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      dob: formData.dob
      // Add other fields as needed by your API
    };

    console.log('Adding user:', payload);
    // Make API request to add user
    this.backendService.request(
      'admin',
      'POST',
      'users?type=employee',
      payload).subscribe(
      (response) => {
        this.loading = false;
        this.successMessage = 'User added successfully';
        this.userForm.reset();
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to add user';
      }
    );
  }


}
