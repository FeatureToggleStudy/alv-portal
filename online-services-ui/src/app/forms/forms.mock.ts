import { Address, Document, File, Period } from './forms.model';

export const mockAddress1: Address = {
  street: 'rue du Simplon',
  number: '45',
  zip: '1004',
  city: 'Lausanne',
  country: 'Switzerland'
};

export const mockAddress2: Address = {
  street: 'rue du Grancy',
  number: '23',
  zip: '1000',
  city: 'Vorkuta',
  country: 'Russia'
};

export const mockFile1: File = {
  id: '03002-323232diwds',
  originalName: 'ddsd',
  uploadDate: new Date(2015, 9, 20),
  name: 'Document 1',
  type: 'PDF',
  creationDate: new Date(2015, 9, 20),
  size: 874383
};

export const mockFile2: File = {
  id: '2111222',
  originalName: 'jjsjjsjs',
  name: 'Document 2',
  type: 'PNG',
  uploadDate: new Date(2017, 2, 1),
  creationDate: new Date(2015, 9, 21),
  size: 11111
};

export const mockDocument1: Document = {
  name: 'contract1',
  category: 'Employment contract',
  files: [mockFile1]
};

export const mockPeriod1: Period = {
  from: {
    year: 2011,
    month: 9,
    day: 20
  },
  to: {
    year: 2012,
    month: 9,
    day: 20
  }
};

