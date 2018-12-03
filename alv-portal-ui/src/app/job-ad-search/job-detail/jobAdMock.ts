import {
  JobAdvertisement,
  JobAdvertisementStatus,
  SourceSystem
} from '../../shared/backend-services/job-advertisement/job-advertisement.model';

export const mockJobDetails: JobAdvertisement = {
  "id": "a9216967-e220-11e8-b8c9-005056ac086d",
  "createdTime": "2018-11-07T01:04:13.917",
  "updatedTime": "2018-11-07T01:04:13.917",
  "status": JobAdvertisementStatus.PUBLISHED_PUBLIC,
  "sourceSystem": SourceSystem.EXTERN,
  "externalReference": null,
  "stellennummerEgov": null,
  "stellennummerAvam": null,
  "fingerprint": "5d975931bd651117f77cf28629a0dc973d8a1981cb4f51930658110238896794249f591c25423a05",
  "reportingObligation": false,
  "reportingObligationEndDate": null,
  "reportToAvam": false,
  "jobCenterCode": null,
  "approvalDate": null,
  "rejectionDate": null,
  "rejectionCode": null,
  "rejectionReason": null,
  "cancellationDate": null,
  "cancellationCode": null,
  "jobContent": {
    "externalUrl": "https://www.randstad.ch/fr/emploi/s-life-sciences/modeling-analyst-programmer_neuchatel_16132060/",
    "numberOfJobs": null,
    "jobDescriptions": [
      {
        "languageIsoCode": "de",
        "title": "modeling analyst / programmer",
        "description": "description du poste\n\nOur client, a leading internation tobacco company, with seven of world's top 15 brands, including the world's number \none brand is looking for a\n\nModeling Analyst / Programmer \n\nLocation: Neuchâtel, Switzerland\n\nContract: 1 year with possibility of extension\n\nStart Date: asap\n\nResponsibilities: \n\nThe role provides Modeling analysis and statistical programming to support the PASS Population modeling team:\n\n- Perform modeling analysis in Population Health Impact model\n- Involve computation analysis and statistical programming in SAS and R to create the modeling outputs\n- Collect and merge the relevant data of the modeling outcomes\n- Develop the statistical program to analyze the data according to the statistical analysis plan.\n- Write the modeling and statistical report.\n- Complete all necessary documentation, draft publication of completed work.\n\nQualification: \n\n- Minimum MSc, preferable with PhD in natural science (math, physics, biostatistics)\n- Experience in modelling, data analytics, epidemiology\n- Previous experience in pharma or biotech is a plus\n- Programming experience with SAS and R and /or Python is a plus\n- Experience in collecting, tabulate and manipulate data and statistical analysis\n- Detail oriented"
      }
    ],
    "company": {
      "name": "Randstad (Schweiz) AG",
      "street": null,
      "houseNumber": null,
      "postalCode": null,
      "city": null,
      "countryIsoCode": null,
      "postOfficeBoxNumber": null,
      "postOfficeBoxPostalCode": null,
      "postOfficeBoxCity": null,
      "phone": null,
      "email": null,
      "website": null,
      "surrogate": false
    },
    "employment": {
      "startDate": null,
      "endDate": null,
      "shortEmployment": false,
      "immediately": false,
      "permanent": true,
      "workloadPercentageMin": 100,
      "workloadPercentageMax": 100,
      "workForms": []
    },
    "location": {
      "remarks": null,
      "city": "neuchatel",
      "postalCode": null,
      "communalCode": null,
      "regionCode": null,
      "cantonCode": null,
      "countryIsoCode": "CH",
    },
    "occupations": [
      {
        "avamOccupationCode": "68900",
        "workExperience": null,
        "educationCode": null
      }
    ],
    "languageSkills": [],
    "applyChannel": null,
    "publicContact": null
  },
  "publication": {
    "startDate": "2018-11-06",
    "endDate": "2019-01-05",
    "euresDisplay": false,
    "euresAnonymous": false,
    "publicDisplay": true,
    "restrictedDisplay": true,
    "companyAnonymous": false
  }
};
