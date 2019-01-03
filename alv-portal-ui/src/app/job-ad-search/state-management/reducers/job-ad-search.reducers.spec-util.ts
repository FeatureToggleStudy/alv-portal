import {
    JobAdvertisement,
    JobAdvertisementStatus,
    SourceSystem
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { CEFR_Level } from '../../../shared/backend-services/shared.types';

/* JOB ADVERTISEMENT CREATION */
export function createJobAdvertisement(id = 'id', stellennummerAvam = 'avam'): JobAdvertisement {
    return {
        id,
        status: JobAdvertisementStatus.CREATED,
        sourceSystem: SourceSystem.JOBROOM,
        externalReference: null,
        stellennummerEgov: 'egov',
        stellennummerAvam,
        fingerprint: null,
        reportToAvam: true,
        jobCenterCode: 'jobcenter',
        jobContent: {
            numberOfJobs: '1',
            jobDescriptions: [
                {
                    languageIsoCode: 'de',
                    title: 'title',
                    description: 'description'
                }
            ],
            company: {
                name: 'name',
                street: 'street',
                postalCode: '3333',
                city: 'Bern',
                countryIsoCode: 'CH'
            },
            employment: {
                shortEmployment: false,
                immediately: true,
                permanent: true,
                workloadPercentageMin: 100,
                workloadPercentageMax: 100
            },
            location: {
                city: 'Bern',
                postalCode: '3333',
                countryIsoCode: 'CH'
            },
            occupations: [{
                avamOccupationCode: 'avam'
            }],
            languageSkills: [{
                code: 'de',
                languageIsoCode: 'de',
                spoken: CEFR_Level.BASIC,
                written: CEFR_Level.BASIC,
                spokenLevel: CEFR_Level.BASIC,
                writtenLevel: CEFR_Level.BASIC
            }],
            applyChannel: {
                rawPostAddress: '',
                postAddress: {
                    name: '',
                    street: '',
                    houseNumber: '',
                    postalCode: '',
                    city: '',
                    postOfficeBoxNumber: '',
                    postOfficeBoxPostalCode: '',
                    postOfficeBoxCity: '',
                    countryIsoCode:  this.COUNTRY_ISO_CODE_SWITZERLAND,
                },
                emailAddress: '',
                phoneNumber: '',
                formUrl: '',
                additionalInfo: ''
            }
        },
        publication: {
            startDate: '2018-05-05',
            euresDisplay: true,
            euresAnonymous: true,
            publicDisplay: true,
            restrictedDisplay: true,
            companyAnonymous: true
        }
    };
}
