import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { LocalitySuggestion } from '../../backend-services/reference-service/locality.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { LocalityRepository } from '../../backend-services/reference-service/locality.repository';
import { switchMap } from 'rxjs/operators';
import { NotificationsService } from '../../../core/notifications.service';
import { Observable } from 'rxjs';
import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'alv-geo-location-selection',
  templateUrl: './geo-location-selection.component.html',
  styleUrls: ['./geo-location-selection.component.scss']
})
export class GeoLocationSelectionComponent extends AbstractSubscriber {

  @Output() localitySelect = new EventEmitter<LocalitySuggestion>();

  loading = false;

  constructor(private localityRepository: LocalityRepository,
              private geolocationService: GeolocationService,
              private changeDetectorRef: ChangeDetectorRef,
              private notificationsService: NotificationsService) {
    super();
  }

  getLocation(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.geolocationService.navigatorGeolocation().pipe(
      switchMap((coordinates: Coordinates) => {
        return this.localityRepository.suggestNearestLocality(coordinates);
      })
    ).subscribe((locality: LocalitySuggestion) => {
      this.localitySelect.emit(locality);
      this.loading = false;
    }, () => {
      this.notificationsService.warning('portal.shared.localities.geo-location-selection.not-available');
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  get visible$(): Observable<boolean> {
    return this.geolocationService.enabled$;
  }

}
