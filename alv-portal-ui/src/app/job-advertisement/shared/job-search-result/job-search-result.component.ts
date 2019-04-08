import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResultListItem} from '../../../shared/layout/result-list-item/result-list-item.model';
import {JobAdvertisementUtils} from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import {JobBadgesMapperService} from '../job-badges-mapper.service';
import {JobAdvertisementWithFavourites} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import {ModalService} from '../../../shared/layout/modal/modal.service';
import {FavouriteNoteModalComponent} from '../favourite-note-modal/favourite-note-modal.component';

export interface JobSearchResult extends JobAdvertisementWithFavourites {
  visited: boolean;
}

@Component({
  selector: 'alv-job-search-result',
  templateUrl: './job-search-result.component.html',
  styleUrls: ['./job-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSearchResultComponent implements OnInit {

  @Input()
  jobSearchResult: JobSearchResult;

  @Input()
  routerLinkBase: string;

  @Input()
  language: string;

  @Output()
  removeFavourite = new EventEmitter<JobSearchResult>();

  @Output()
  addFavourite = new EventEmitter<JobSearchResult>();

  @Output()
  updatedFavourite = new EventEmitter<JobSearchResult>();

  resultListItem: ResultListItem;

  constructor(private jobBadgesMapperService: JobBadgesMapperService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.resultListItem = this.jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }


  toggleFavourites() {
    if (this.jobSearchResult.favouriteItem) {
      this.removeFavourite.emit(this.jobSearchResult);
    } else {
      this.addFavourite.emit(this.jobSearchResult);
    }
  }

  showNoteDialog() {
    const favouriteNoteModalRef = this.modalService.openLarge(FavouriteNoteModalComponent, true);
    const favouriteNoteComponent = <FavouriteNoteModalComponent>favouriteNoteModalRef.componentInstance;
    favouriteNoteComponent.jobAdvertisementId = this.jobSearchResult.jobAdvertisement.id;
    favouriteNoteComponent.favouriteItem = this.jobSearchResult.favouriteItem;
    favouriteNoteModalRef.result
      .then(favouriteItem => {
        this.updatedFavourite.emit({
          ...this.jobSearchResult,
          favouriteItem: favouriteItem
        });
      })
      .catch(() => {
      });
  }

  private jobSearchResultToResultListItemMapper(jobSearchResult: JobSearchResult): ResultListItem {
    const jobAdvertisement = jobSearchResult.jobAdvertisement;
    const jobDescription = JobAdvertisementUtils.getJobDescription(jobAdvertisement, this.language);
    return <ResultListItem>{
      id: jobAdvertisement.id,
      title: jobDescription.title,
      description: jobDescription.description,
      header: jobAdvertisement.publication.startDate,
      badges: this.jobBadgesMapperService.map(jobAdvertisement),
      routerLink: [this.routerLinkBase, jobAdvertisement.id],
      subtitle: jobAdvertisement.jobContent.company.name,
      visited: jobSearchResult.visited,
      hasActions: true,
      isFavourite: !!jobSearchResult.favouriteItem,
      hasNote: !!jobSearchResult.favouriteItem && !!jobSearchResult.favouriteItem.note
    };
  }

}



