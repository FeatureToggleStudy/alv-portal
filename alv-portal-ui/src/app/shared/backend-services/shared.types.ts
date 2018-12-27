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
  NONE = 'NONE',
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  PROFICIENT = 'PROFICIENT'
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

export enum Experience {
  LESS_THAN_1_YEAR = 'LESS_THAN_1_YEAR',
  MORE_THAN_1_YEAR = 'MORE_THAN_1_YEAR',
  MORE_THAN_3_YEARS = 'MORE_THAN_3_YEARS'
}

export enum Availability {
  IMMEDIATE = 'IMMEDIATE',
  BY_ARRANGEMENT = 'BY_ARRANGEMENT'
}

export enum WorkForm {
  SUNDAY_AND_HOLIDAYS, SHIFT_WORK, NIGHT_WORK, HOME_WORK
}

export enum ISCED_1997 {
  ISCED1, ISCED2, ISCED3, ISCED4, ISCED5, ISCED6
}

export enum Graduation {
  CH = 'CH',
  ACCEPTED = 'ACCEPTED',
  NOT_ACCEPTED = 'NOT_ACCEPTED',
  NONE = 'NONE'
}

export enum DrivingLicenceCategory {
  A, A1, B, B1, BE, C, C1, C1E, CE, D, D1, D1E, DE, F, G, M
}

export enum Canton {
  AG, AI, AR, BE, BL, BS, FR, GE, GL, GR, JU, LU, NE, NW, OW, SG, SH, SO, SZ, TG, TI, UR, VD, VS, ZG, ZH
}

export enum Language {
  DE = 'de',
  FR = 'fr',
  IT = 'it',
  EN = 'en',
  DE_CH = 'de-ch',
  BG = 'bg',
  BS = 'bs',
  CH = 'ch',
  CS = 'cs',
  DA = 'da',
  EL = 'el',
  ES = 'es',
  FA = 'fa',
  FI = 'fi',
  HE = 'he',
  HR = 'hr',
  HU = 'hu',
  JA = 'ja',
  KM = 'km',
  KU = 'ku',
  LT = 'lt',
  MK = 'mk',
  NL = 'nl',
  NLD = 'nld',
  NO = 'no',
  PL = 'pl',
  PRS = 'prs',
  PT = 'pt',
  RM = 'rm',
  RO = 'ro',
  RU = 'ru',
  SK = 'sk',
  SL = 'sl',
  SQ = 'sq',
  SR = 'sr',
  SR_HR = 'sr-hr',
  SV = 'sv',
  TA = 'ta',
  TH = 'th',
  TI = 'ti',
  TR = 'tr',
  VI = 'vi',
  ZH = 'zh'

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
