import { HelpEntry } from './help-entry.model';

export const mockHelpText: Array<HelpEntry> = [
  {
    title: 'Was kann hochgeladen werden?',
    listItems: [
      'Sie können mehrere Scans als PDF hinzufügen.',
      'Fotos können nicht hochgeladen werden.'
    ]
  },
  {
    title: 'Wie kann ich Scans als PDF erstellen?',
    listItems: [
      'Nutzen Sie die Scan-Funktion des Druckers',
      'Nutzen Sie eine Scan-App auf Ihrem Smartphone',
      'Nutzen Sie die Hilfe eines Copy-Shops'
    ]
  },
  {
    title: 'Was muss ich bei einer Scan-App beachten?',
    text: 'Wenn Sie eine Scan-App nutzen, müssen Sie die per Smartphone erstellen Scans Ihrem PC oder Laptop zur Verfügung stellen. Dazu können Sie z.B. einen Cloud-Speicher nutzen. Wenn Sie dies tun, achten Sie bitte darauf, dass Ihre Daten sicher gelagert werden und Sie Ihren Zugriff auf den Cloud-Speicher mit einem sicheren Passwort schützen.'
  }
];

