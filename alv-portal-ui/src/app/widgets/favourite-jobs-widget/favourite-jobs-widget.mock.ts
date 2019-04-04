import {
  JobAdvertisement,
  JobAdvertisementStatus,
  SourceSystem,
  WorkExperience
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import {
  CEFR_Level,
  Degree,
  Qualification,
  Salutation
} from '../../shared/backend-services/shared.types';
import { JobSearchResult } from '../../job-advertisement/shared/job-search-result/job-search-result.component';

export const mockJobs: JobAdvertisement[] = [
  {
    id: '50517254-55e4-11e9-80c7-0242ac12000b',
    createdTime: '2019-01-31T08:26:48.406',
    updatedTime: '2019-04-01T08:00:54.153',
    status: JobAdvertisementStatus.PUBLISHED_PUBLIC,
    sourceSystem: SourceSystem.JOBROOM,
    externalReference: null,
    stellennummerEgov: '240130734',
    stellennummerAvam: '00000900292',
    fingerprint: 'cf4d77774c1a8eac8a7df3dc1a5719d8e153037ad6f7a1c516acf0d1a56c2e7bcb42a80108f3b3ec',
    reportingObligation: true,
    reportingObligationEndDate: '2019-02-07',
    reportToAvam: true,
    jobCenterCode: 'BEAD0',
    approvalDate: '2019-01-31',
    rejectionDate: null,
    rejectionCode: null,
    rejectionReason: null,
    cancellationDate: null,
    cancellationCode: null,
    jobContent: {
      externalUrl: null,
      numberOfJobs: '1',
      jobDescriptions: [{
        languageIsoCode: 'de',
        title: 'Sous Chef / Chef de Partie',
        description: 'Gelernter Koch mit Berufserfahrung.\r\nErfahrung in der Ausbildung von Lernenden.'
      }],
      company: {
        name: 'Hotel Meiringen AG',
        street: 'Bahnhofplatz',
        houseNumber: '1',
        postalCode: '3860',
        city: 'Meiringen',
        countryIsoCode: 'CH',
        postOfficeBoxNumber: '231',
        postOfficeBoxPostalCode: '3860',
        postOfficeBoxCity: 'Meiringen',
        phone: null,
        email: null,
        website: null,
        surrogate: false
      },
      employment: {
        startDate: '2019-04-15',
        endDate: null,
        shortEmployment: false,
        immediately: false,
        permanent: true,
        workloadPercentageMin: 100,
        workloadPercentageMax: 100,
        workForms: ['SUNDAY_AND_HOLIDAYS']
      },
      location: {
        remarks: null,
        city: 'Meiringen',
        postalCode: '3860',
        communalCode: '785',
        regionCode: 'BE05',
        cantonCode: 'BE',
        countryIsoCode: 'CH',
        coordinates: { lon: 8.18, lat: 46.729 }
      },
      occupations: [{
        avamOccupationCode: '79037',
        workExperience: WorkExperience.MORE_THAN_3_YEARS,
        educationCode: Degree.SEK_II_BERUFSMATURITAET,
        qualificationCode: Qualification.SKILLED
      }],
      languageSkills: [{
        languageIsoCode: 'de',
        spokenLevel: CEFR_Level.PROFICIENT,
        writtenLevel: CEFR_Level.PROFICIENT,
      }],
      applyChannel: {
        rawPostAddress: null,
        postAddress: {
          name: 'Hotel Meiringen AG',
          street: 'Bahnhofplatz',
          houseNumber: '1',
          postalCode: '3860',
          city: 'Meiringen',
          postOfficeBoxNumber: null,
          postOfficeBoxPostalCode: null,
          postOfficeBoxCity: null,
          countryIsoCode: 'CH'
        },
        emailAddress: 'michael.bruegger@hotel-meiringen.ch',
        phoneNumber: null,
        formUrl: null,
        additionalInfo: 'Eintritt April/Mai'
      },
      publicContact: {
        salutation: Salutation.MR,
        firstName: 'Michael',
        lastName: 'Brügger',
        phone: '+41339721212',
        email: 'michael.bruegger@hotel-meiringen.ch'
      }
    },
    publication: {
      startDate: '2019-04-01',
      endDate: '2019-05-01',
      euresDisplay: false,
      euresAnonymous: false,
      publicDisplay: true,
      restrictedDisplay: true,
      companyAnonymous: false
    },
    owner: null
  },
  {
    id: '5a78b3cf-538b-11e9-b89f-005056ac086d',
    createdTime: '2019-03-31T10:02:39.495',
    updatedTime: '2019-04-01T10:00:56.973',
    status: JobAdvertisementStatus.PUBLISHED_PUBLIC,
    sourceSystem: SourceSystem.JOBROOM,
    externalReference: null,
    stellennummerEgov: '240165566',
    stellennummerAvam: '00000935421',
    fingerprint: null,
    reportingObligation: false,
    reportingObligationEndDate: null,
    reportToAvam: true,
    jobCenterCode: 'ZHAX0',
    approvalDate: '2019-04-01',
    rejectionDate: null,
    rejectionCode: null,
    rejectionReason: null,
    cancellationDate: null,
    cancellationCode: null,
    jobContent: {
      externalUrl: null,
      numberOfJobs: '1',
      jobDescriptions: [{
        languageIsoCode: 'de',
        title: 'Pferdefachmann efz',
        description: 'Pferdepflege ,Beritt,Reitstunden'
      }],
      company: {
        name: 'Hansueli Job',
        street: 'Grünau',
        houseNumber: '1',
        postalCode: '8903',
        city: 'Birmensdorf ZH',
        countryIsoCode: 'CH',
        postOfficeBoxNumber: null,
        postOfficeBoxPostalCode: null,
        postOfficeBoxCity: null,
        phone: null,
        email: null,
        website: null,
        surrogate: false
      },
      employment: {
        startDate: null,
        endDate: null,
        shortEmployment: false,
        immediately: true,
        permanent: true,
        workloadPercentageMin: 50,
        workloadPercentageMax: 100,
        workForms: []
      },
      location: {
        remarks: null,
        city: 'Birmensdorf ZH',
        postalCode: '8903',
        communalCode: '242',
        regionCode: 'ZH01',
        cantonCode: 'ZH',
        countryIsoCode: 'CH',
        coordinates: { lon: 8.441, lat: 47.352 }
      },
      occupations: [{
        avamOccupationCode: '18100',
        workExperience: WorkExperience.MORE_THAN_3_YEARS,
        educationCode: Degree.SEK_II_FACHMATURITAET,
        qualificationCode: Qualification.SKILLED
      }],
      languageSkills: [{
        languageIsoCode: 'de',
        spokenLevel: CEFR_Level.INTERMEDIATE,
        writtenLevel: CEFR_Level.INTERMEDIATE
      }],
      applyChannel: {
        rawPostAddress: null,
        postAddress: null,
        emailAddress: null,
        phoneNumber: null,
        formUrl: 'http://info@ponyhof-gruenau.ch',
        additionalInfo: null
      },
      publicContact: {
        salutation: Salutation.MR,
        firstName: 'Ursula',
        lastName: 'Job',
        phone: '+41447373203',
        email: 'info@ponyhof-gruenau.ch'
      }
    },
    publication: {
      startDate: '2019-04-01',
      endDate: '2019-05-01',
      euresDisplay: true,
      euresAnonymous: false,
      publicDisplay: true,
      restrictedDisplay: true,
      companyAnonymous: false
    },
    owner: null
  },
  {
    id: '4a8b9bf8-5454-11e9-b89f-005056ac086d',
    createdTime: '2019-04-01T10:01:01.616',
    updatedTime: '2019-04-01T10:01:01.622',
    status: JobAdvertisementStatus.PUBLISHED_PUBLIC,
    sourceSystem: SourceSystem.RAV,
    externalReference: null,
    stellennummerEgov: null,
    stellennummerAvam: '00000935420',
    fingerprint: null,
    reportingObligation: false,
    reportingObligationEndDate: null,
    reportToAvam: true,
    jobCenterCode: 'NEA80',
    approvalDate: '2019-04-01',
    rejectionDate: null,
    rejectionCode: null,
    rejectionReason: null,
    cancellationDate: null,
    cancellationCode: null,
    jobContent: {
      externalUrl: null,
      numberOfJobs: '1',
      jobDescriptions: [{
        languageIsoCode: 'de',
        title: 'Serrurier/ Constructeur métallique',
        description: 'Profil :\r\n\r\n- CFC de serrurier ou constructeur métallique\r\n- Exp. atelier et montage'
      }],
      company: {
        name: 'Service de l\'emploi\r\nOffice du marché du travail\r\nSecteur ProEmployeurs',
        street: 'Rue du Parc',
        houseNumber: '119',
        postalCode: '2301',
        city: 'La Chaux-de-Fonds',
        countryIsoCode: 'CH',
        postOfficeBoxNumber: null,
        postOfficeBoxPostalCode: null,
        postOfficeBoxCity: null,
        phone: null,
        email: null,
        website: null,
        surrogate: true
      },
      employment: {
        startDate: null,
        endDate: null,
        shortEmployment: false,
        immediately: true,
        permanent: true,
        workloadPercentageMin: 100,
        workloadPercentageMax: 100,
        workForms: []
      },
      location: {
        remarks: null,
        city: 'La Chaux-de-Fonds',
        postalCode: '2300',
        communalCode: '6421',
        regionCode: 'NE02',
        cantonCode: 'NE',
        countryIsoCode: 'CH',
        coordinates: { 'lon': 6.876, lat: 47.117 }
      },
      occupations: [{
        avamOccupationCode: '44508',
        workExperience: null,
        educationCode: null,
        qualificationCode: Qualification.SKILLED
      }, {
        avamOccupationCode: '44505',
        workExperience: null,
        educationCode: null,
        qualificationCode: Qualification.SKILLED
      }],
      languageSkills: [],
      applyChannel: {
        rawPostAddress: null,
        postAddress: {
          name: 'Service de l\'emploi\r\nOffice du marché du travail\r\nSecteur ProEmployeurs',
          street: 'Rue du Parc',
          houseNumber: '119',
          postalCode: '2301',
          city: 'La Chaux-de-Fonds',
          postOfficeBoxNumber: null,
          postOfficeBoxPostalCode: null,
          postOfficeBoxCity: null,
          countryIsoCode: 'CH'
        },
        emailAddress: null,
        phoneNumber: null,
        formUrl: null,
        additionalInfo: null
      },
      publicContact: null
    },
    publication: {
      startDate: '2019-04-01',
      endDate: '2019-05-01',
      euresDisplay: false,
      euresAnonymous: false,
      publicDisplay: true,
      restrictedDisplay: true,
      companyAnonymous: true
    },
    owner: null
  }
];

export const mockJobSearchResults: JobSearchResult[] = mockJobs.map(x => ({
  jobAdvertisement: x,
  visited: false
}));

export const mockJobsWithFavourites = mockJobs.map(x => ({
  jobAdvertisement: x, favouriteItem: {
    id: 'someid',
    note: 'some note',
    ownerId: '20303239293-dsfdsf-deeee',
    jobAdvertisementId: '',
    createdTime: '2019-04-01',
  }
}));
