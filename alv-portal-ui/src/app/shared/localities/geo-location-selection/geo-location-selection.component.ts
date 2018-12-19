import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GeoPoint,
  LocalitySuggestion
} from '../../backend-services/reference-service/locality.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { LocalityRepository } from '../../backend-services/reference-service/locality.repository';
import { switchMap } from 'rxjs/operators';
import { Subscriber } from 'rxjs/src/internal/Subscriber';

@Component({
  selector: 'alv-geo-location-selection',
  templateUrl: './geo-location-selection.component.html',
  styleUrls: ['./geo-location-selection.component.scss']
})
export class GeoLocationSelectionComponent extends AbstractSubscriber implements OnInit {

  @Output() localitySelect = new EventEmitter<LocalitySuggestion>();

  loading = false;

  private permissionDenied = false;

  constructor(private localityRepository: LocalityRepository) {
    super();
  }

  ngOnInit() {

  }

  getLocation(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.getCurrentPosition().pipe(
      switchMap((geoPoint) => {
        return this.localityRepository.suggestNearestLocality(geoPoint);
      })
    ).subscribe((locality: LocalitySuggestion) => {
        this.localitySelect.emit(locality);
      }, (error: any) => {
      },
      () => {
        this.loading = false;
      });
  }

  isVisible(): boolean {
    return !this.permissionDenied;
  }

  private getCurrentPosition(): Observable<GeoPoint> {
    return Observable.create((observer: Subscriber<GeoPoint>) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: Position) => {
            observer.next(position.coords);
            observer.complete();
          },
          (error: PositionError) => {
            observer.error(error);
            if (error.code === error.PERMISSION_DENIED) {
              this.permissionDenied = true;
            }
          }
        );
      } else {
        observer.error('Geolocation is not available!');
      }
    });
  }
}
