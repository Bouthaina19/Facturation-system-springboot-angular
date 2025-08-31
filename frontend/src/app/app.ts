import { Component, signal } from '@angular/core';
import { FactureForm} from './components/facture-form/facture-form';
import { Produits } from './components/produits/produits';
import { FactureListeComponent } from './components/facture-list/facture-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css' 
})
export class App {
  title = 'facture-app';
}
