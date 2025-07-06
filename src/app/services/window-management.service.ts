// src/app/services/window-management.service.ts
import {EventEmitter, Injectable} from '@angular/core';

// Dit type moet overeenkomen met de WindowContentType in virtual-desktop.component.ts
export type WindowContentType = 'tictactoe' | 'about' | 'contact' | 'links' | 'ie';

@Injectable({
  providedIn: 'root' // Zorgt ervoor dat de service beschikbaar is in de hele applicatie
})
export class WindowManagementService {
  // Event Emitters die componenten kunnen "abonneren" om vensters te openen
  openWindowRequest = new EventEmitter<{ type: WindowContentType; title: string }>();
  openExternalLinkRequest = new EventEmitter<string>();
  closeWindowRequest = new EventEmitter<string>(); // Voor het sluiten van een specifiek venster (op ID)

  constructor() { }

  /**
   * Roept een verzoek op om een virtueel venster te openen.
   * @param type Het type inhoud van het venster (bijv. 'about', 'contact').
   * @param title De titel die in de vensterbalk moet verschijnen.
   */
  requestOpenWindow(type: WindowContentType, title: string): void {
    this.openWindowRequest.emit({ type, title });
  }

  /**
   * Roept een verzoek op om een externe link te openen.
   * @param url De URL die in een nieuw tabblad moet worden geopend.
   */
  requestOpenExternalLink(url: string): void {
    this.openExternalLinkRequest.emit(url);
  }

  /**
   * Roept een verzoek op om een specifiek venster te sluiten.
   * @param windowId De ID van het te sluiten venster.
   */
  requestCloseWindow(windowId: string): void {
    this.closeWindowRequest.emit(windowId);
  }
}
