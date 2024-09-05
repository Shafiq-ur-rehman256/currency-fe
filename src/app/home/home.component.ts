import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ConvertorComponent } from "../convertor/convertor.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ConvertorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
