import { JobDetailModelFactory } from './job-detail-model-factory';
import { I18nService } from '../../core/i18n.service';
import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import {
  JobAdvertisement,
  JobAdvertisementStatus,
  SourceSystem
} from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobDetailModel } from './job-detail-model';
import { mockJobCenter } from '../../shared/backend-services/reference-service/job-center.mock';
import { JobAdFavouritesRepository } from '../../shared/backend-services/favourites/job-ad-favourites.repository';
import { AuthenticationService } from '../../core/auth/authentication.service';

const mockUser = { id: 'userid' };

const mockJobAd: JobAdvertisement = {
  'id': '865850f6-0002-11e9-977c-005056ac086d',
  'createdTime': '2018-12-15T01:44:05.538',
  'updatedTime': '2018-12-15T01:44:05.538',
  owner: {
    userId: 'ww',
    userDisplayName: 'www',
    companyId: 'sdf'
  },
  'status': JobAdvertisementStatus.PUBLISHED_PUBLIC,
  'sourceSystem': SourceSystem.EXTERN,
  'externalReference': null,
  'stellennummerEgov': null,
  'stellennummerAvam': null,
  'fingerprint': '92225dcb7d0ee55ac6a9069a8a09dc97d247b2f7c51226d880219342a1c47483ad409e9c7efda962',
  'reportingObligation': false,
  'reportingObligationEndDate': null,
  'reportToAvam': false,
  'jobCenterCode': '1',
  'approvalDate': null,
  'rejectionDate': null,
  'rejectionCode': null,
  'rejectionReason': null,
  'cancellationDate': null,
  'cancellationCode': null,
  'jobContent': {
    'externalUrl': 'http://www.michaelbaileyassociates.com/jobs/8220792/program-manager.asp',
    'numberOfJobs': null,
    'jobDescriptions': [
      {
        'languageIsoCode': 'de',
        'title': 'Program Manager',
        'description': 'Program Manager\n\nAddEmail to a friend  Sector: IT/ICT   Location: Switzerland   Sub-location:Any  Currency: £   Job Type:Any  Salary \nDescription:Market Salary  Posted:13/12/2018  Ref No:122053\n\nMichael Bailey Associates are recruiting for a Progam Manager on a Permanent basis for one of the world-s fastest \ngrowing, most recognized fin-tech start ups in Zurich\n\nYou will be responsible for:\n\n* Overseeing product build and delivery model including coordination and oversight of project managers, establishing \nand managing project governance, facilitation of finance and budgeting process, and turning product planning sessions \ninto initiation of new projects.\n\n* Establishing and executing communication plans to provide internal and external stakeholders with appropriate status \ninformation.\n\n* Identifying and tracking project and program risks through resolution, escalating unresolved issues to senior \nmanagement and facilitate resolution process.\n\nThe skills required:\n\n* 5+ years of Agile Methodology experience using the Agile SCRUM framework. Hands-on experience and knowledge of agile \ndevelopment and best practices. Proficiency in Confluence, JIRA and/or agile certification preferred.\n\n* Sound understanding of best-in-class enterprise software development and delivery practices.\n\n* Excellent knowledge and experience working with clearing and settlement systems, capital markets and market \ninfrastructure. Knowledgeable of the emerging fin-tech and rapidly changing technology landscape.\n\nMichael Bailey International is acting as an Employment Agency in relation to this vacancy.\n\nAddEmail to a friend\n\n- Alternative Project Searches\n- USA\n- Austria\n- Telecommunications\n- Belgium\n- Netherlands\n\n&lt; Go back to your projects search results'
      }
    ],
    'company': {
      'name': 'MBA Michael Bailey Associates (Switzerland) AG',
      'street': null,
      'houseNumber': null,
      'postalCode': null,
      'city': null,
      'countryIsoCode': null,
      'postOfficeBoxNumber': null,
      'postOfficeBoxPostalCode': null,
      'postOfficeBoxCity': null,
      'phone': null,
      'email': null,
      'website': null,
      'surrogate': false
    },
    'employment': {
      'startDate': null,
      'endDate': null,
      'shortEmployment': false,
      'immediately': false,
      'permanent': true,
      'workloadPercentageMin': 100,
      'workloadPercentageMax': 100,
      'workForms': []
    },
    'location': {
      'remarks': null,
      'city': 'Switzerland',
      'postalCode': null,
      'communalCode': null,
      'regionCode': null,
      'cantonCode': null,
      'countryIsoCode': 'CH',
    },
    'occupations': [
      {
        'avamOccupationCode': '95207',
        'workExperience': null,
        'educationCode': null
      }
    ],
    'languageSkills': [],
    'applyChannel': null,
    'publicContact': null
  },
  'publication': {
    'startDate': '2018-12-14',
    'endDate': '2019-02-12',
    'euresDisplay': false,
    'euresAnonymous': false,
    'publicDisplay': true,
    'restrictedDisplay': true,
    'companyAnonymous': false
  }
};

describe('JobDetailModelFactory', () => {
  let jobDetailModelFactory: JobDetailModelFactory;
  let jobAdFavouritesRepositoryMock: JobAdFavouritesRepository;
  let authenticationServiceMock: AuthenticationService;
  let i18nServiceMock;

  let referenceServiceRepositoryMock: JobCenterRepository;

  const LANGUAGE_VALUES = {
    e: 'en',
    f: 'fr',
    d: 'de',
    i: 'i'
  };

  beforeEach(() => {
    jobAdFavouritesRepositoryMock = jasmine.createSpyObj('JobAdFavouritesRepository', {
      'getFavouriteForJobAd': cold('-x|', { x: null })
    });

    i18nServiceMock = {
      currentLanguage$: cold('--e--', LANGUAGE_VALUES)
    };

    referenceServiceRepositoryMock = jasmine.createSpyObj('ReferenceServiceRepository', {
      resolveJobCenter: cold('-x|', { x: mockJobCenter })
    });

    authenticationServiceMock = jasmine.createSpyObj('AuthenticationService', {
      getCurrentUser: cold('-x|', { x: mockUser })
    });
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        JobDetailModelFactory,
        { provide: I18nService, useValue: i18nServiceMock },
        { provide: JobCenterRepository, useValue: referenceServiceRepositoryMock },
        { provide: JobAdFavouritesRepository, useValue: jobAdFavouritesRepositoryMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock }
      ]
    });
    jobDetailModelFactory = TestBed.get(JobDetailModelFactory);
  });

  it('should create jobDetailModelFactory ', () => {
    expect(jobDetailModelFactory).toBeTruthy();
  });

  it('should create a jobdetail model object', () => {

    const jobDetailModel = jobDetailModelFactory.create(mockJobAd);
    const expectedJobDetailModel = new JobDetailModel(
      mockJobAd.jobContent.jobDescriptions[0],
      mockJobCenter,
      mockJobAd
    );
    const expected = cold('---r--', { r: expectedJobDetailModel });
    expect(jobDetailModel).toBeObservable(expected);
  });
})
;
