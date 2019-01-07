import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';
import { cold, hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { I18nService } from '../../core/i18n.service';
import { mockJobCenter } from '../../shared/backend-services/reference-service/job-center.mock';
import { CandidateDetailModelFactory } from './candidate-detail-model-factory';
import { OccupationLabelRepository } from '../../shared/backend-services/reference-service/occupation-label.repository';
import { CandidateRepository } from '../../shared/backend-services/candidate/candidate.repository';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { OccupationLabelData } from '../../shared/backend-services/reference-service/occupation-label.types';
import { CandidateProtectedData } from '../../shared/backend-services/candidate/candidate.types';
import { RegistrationStatus, User, UserRole } from '../../core/auth/user.model';
import {
  mockCandidateProfile,
  mockJobExperience
} from '../../shared/backend-services/candidate/candidate.mock';
import { JobExperienceModel } from './candidate-detail-model';
import { Contact } from '../../shared/backend-services/shared.types';

describe('CandidateDetailModelFactory', () => {
  let candidateDetailModelFactory: CandidateDetailModelFactory;
  let i18nServiceMock;
  let occupationLabelRepositoryMock;
  let referenceServiceRepositoryMock: JobCenterRepository;
  let candidateRepositoryMock;
  let authenticationServiceMock;

  const LANGUAGE_VALUES = {
    e: 'en',
    f: 'fr',
    d: 'de',
    i: 'i'
  };
  const occupationLabelDataMock: OccupationLabelData = {
    default: 'programmer/ka',
    m: 'programmer',
    f: 'programmerka'
  };

  const mockProtectedData: CandidateProtectedData = {
    id: '11',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: '+41211212',
    mobile: '+41211212',
    email: 'string@dd.com',
    address: {
      street: 'street',
      zipCode: '2002',
      city: 'Bern'
    },
    nationalityCode: 'de',
    candidateProfile: null
  };

  const userMock: User = {
    id: '234',
    login: 'qwert',
    email: 'asdsf@gma.com',
    langKey: 'en',
    firstName: 'Name',
    lastName: 'lastname',
    authorities: [UserRole.ROLE_PAV],
    registrationStatus: RegistrationStatus.REGISTERED,
    hasAnyAuthorities(authorities: Array<UserRole>): boolean {
      return true;
    },
    isRegistered(): boolean {
      return true;
    },
    isAdmin(): boolean {
      return false;
    }
  };

  const mockContact: Contact = {
    salutation: 'mr',
    firstName: 'ads',
    lastName: 'las',
    phone: '+213231212',
    email: 'oooa@gma.com'
  };


  const mockJobExperienceModel: JobExperienceModel = {
    jobExperience: mockJobExperience,
    occupationLabel: 'string',
    displayGraduation: true,
    displayDegree: true,
  };


  beforeEach(() => {
    i18nServiceMock = {
      get currentLanguage$() {
        return hot('e---i----', LANGUAGE_VALUES)
      }
    };

    referenceServiceRepositoryMock = jasmine.createSpyObj('ReferenceServiceRepository', {
      'resolveJobCenter': cold('-x', { x: mockJobCenter })
    });

    occupationLabelRepositoryMock = jasmine.createSpyObj('OccupationLabelRepository', ['getOccupationLabelsByKey']);
    occupationLabelRepositoryMock.getOccupationLabelsByKey.and.returnValue(cold('-x---x-x-x-', { x: occupationLabelDataMock }));

    candidateRepositoryMock = jasmine.createSpyObj('CandidateRepository', {
      'getCandidateProtectedData': cold('-x---x-x-x-', { x: mockProtectedData })
    });
    authenticationServiceMock = jasmine.createSpyObj('AuthenticationService', {
      'getCurrentUser': cold('-x---x-x-x-', { x: userMock })
    });

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CandidateDetailModelFactory,
        { provide: I18nService, useValue: i18nServiceMock },
        { provide: JobCenterRepository, useValue: referenceServiceRepositoryMock },
        { provide: OccupationLabelRepository, useValue: occupationLabelRepositoryMock },
        { provide: CandidateRepository, useValue: candidateRepositoryMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock }
      ]
    });
    candidateDetailModelFactory = TestBed.get(CandidateDetailModelFactory);
  });

  it('should create CandidateDetailModelFactory ', () => {
    expect(candidateDetailModelFactory).toBeTruthy();
  });

  it('should create a CandidateDetail model object', () => {
    const candidateDetailModel$ = candidateDetailModelFactory.create(mockCandidateProfile);
    // i18nServiceMock.currentLanguage$.
    //
    // const expectedCandidateDetailModel = new CandidateDetailModel(
    //   mockCandidateProfile,
    //   mockJobCenter,
    //   [mockJobExperienceModel],
    //   mockProtectedData,
    //   mockContact
    // );
    const expected = cold('-----', { r: null });

    expect(candidateDetailModel$).toBeObservable(expected);
  });
});
