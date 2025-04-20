import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  isEditing: boolean = false;
  
  @ViewChild('profileForm') profileForm: FormGroup | undefined;
  
  constructor() {}

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    if (!this.name || !this.email || !this.phone || !this.address || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    
    this.isEditing = false;

  }
}
