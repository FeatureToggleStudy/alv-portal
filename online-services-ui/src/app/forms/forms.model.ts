/**
 * Interfaces that are common for all the forms
 */
import { NgbDate } from '../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

export interface Address {
  street: string;
  /**
   * number of the house intentionally made a string to allow constructions like these:
   * - rue du Simplon 5/6
   * - rue du Simplon 5 apt. 46
   * - rue du Simplon 52-57
   */
  number: string;
  zip: string;
  city: string;
  country: string;
}

export interface File {
  /**
   *  server gives the file this id after we upload file to the server. Mut be unique.
   *  Optional because we can have files that are not yet uploaded.
   */
  id?: string;

  /**
   * readable name of the file
   */
  name?: string;

  /**
   * the name that the file had when it was on the users computer
   */
  originalName: string;

  /**
   * mime-type
   * @example 'PNG'
   */
  type: string;
  creationDate?: Date;
  uploadDate: Date;
  /**
   * size in bytes
   */
  size: number;
}

export interface Document {
  name: string;
  category: string;
  files: File[];
}

export interface Period {
  from: NgbDate;
  to: NgbDate;
}
