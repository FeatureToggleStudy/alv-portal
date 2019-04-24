import { FavouriteItem } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export class FavouriteItemDetailModel {

  public readonly favourite: FavouriteItem;

  constructor(favouriteItem: FavouriteItem) {
    this.favourite = favouriteItem;
  }

  get isFavourite(): boolean {
    return !!this.favourite;
  }

  get hasNote(): boolean {
    return this.isFavourite && !!this.favourite.note;
  }

  get note(): string | undefined {
    if (this.hasNote) {
      return this.favourite.note;
    }
  }
}
