import { TuiRoot } from '@taiga-ui/core';
import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LoginComponent from './components/login/login.component';
import {initFlowbite} from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'hola';

}
