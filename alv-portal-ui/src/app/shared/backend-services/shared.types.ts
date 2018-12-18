export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface Contact {
  salutation?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

export enum CEFR_Level {
  NONE, BASIC, INTERMEDIATE, PROFICIENT
}

/**
 * the numbers here correspond to a code of the education in the avam database
 */
export enum Degree {
  SEK_II_WEITERFUEHRENDE_SCHULE = '130',
  SEK_II_GRUNDBILDUNG_EBA = '131',
  SEK_II_GRUNDBILDUNG_EFZ = '132',
  SEK_II_FACHMITTELSCHULE = '133',
  SEK_II_BERUFSMATURITAET = '134',
  SEK_II_FACHMATURITAET = '135',
  SEK_II_GYMNASIALE_MATURITAET = '136',
  TER_BERUFSBILDUNG_DIPL = '150',
  TER_BERUFSBILDUNG_FA = '160',
  TER_BACHELOR_FACHHOCHSCHULE = '170',
  TER_BACHELOR_UNIVERSITAET = '171',
  TER_MASTER_FACHHOCHSCHULE = '172',
  TER_MASTER_UNIVERSITAET = '173',
  TER_DOKTORAT_UNIVERSITAET = '180'
}

export interface LanguageSkill {
  code: string;
  nativeLanguage?: boolean;
  spoken: CEFR_Level;
  written: CEFR_Level;
}

export enum Experience {
  LESS_THAN_1_YEAR, MORE_THAN_1_YEAR, MORE_THAN_3_YEARS
}

export enum Availability {
  IMMEDIATE, BY_ARRANGEMENT
}

export enum WorkForm {
  SUNDAY_AND_HOLIDAYS, SHIFT_WORK, NIGHT_WORK, HOME_WORK
}

export enum ISCED_1997 {
  ISCED1, ISCED2, ISCED3, ISCED4, ISCED5, ISCED6
}

export enum Graduation {
  CH, ACCEPTED, NOT_ACCEPTED, NONE
}

export enum DrivingLicenceCategory {
  A, A1, B, B1, BE, C, C1, C1E, CE, D, D1, D1E, DE, F, G, M
}

export enum Canton {
  AG, AI, AR, BE, BL, BS, FR, GE, GL, GR, JU, LU, NE, NW, OW, SG, SH, SO, SZ, TG, TI, UR, VD, VS, ZG, ZH
}

export interface LanguageSkill {
  languageIsoCode: string;
  spokenLevel: CEFR_Level;
  writtenLevel: CEFR_Level;
}

export interface PostAddress {
  name: string;
  street?: string;
  houseNumber?: string;
  postalCode: string;
  city: string;
  postOfficeBoxNumber?: string;
  postOfficeBoxPostalCode?: string;
  postOfficeBoxCity?: string;
  countryIsoCode?: string;
}
