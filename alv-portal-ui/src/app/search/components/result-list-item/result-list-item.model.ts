export interface ResultListItem {
  title: string;
  subtitle: string;
  badges: Badge[];
  header: string;
  description: string;
  routerLink: string[];
  // maybe in the future we will need to add queryParams and  fragment properties
  // visited: boolean; //first let's try to use css :visited attribute
}

export interface Badge {
  label: string;
  description?: string;
  cssClass: string;
}

export const badgeMock: Badge = {
  label: "100%",
  cssClass: 'badge-secondary'
};

export const resultListItemMock: ResultListItem = {
  title: "Digital applications full-stack Developer - New project within an international and tech environment",
  subtitle: 'Academic Work Switzerland SA',
  header: 'Nov 16, 2018',
  description: 'Il y a 2 semainesAdvert-ID: 15014787 Digital applications full-stack Developer - New project within an international and tech environment Save job To save a job, please login Share this ad Quick facts City:Lausanne Extent:Full time, 100% Type of work:Temp job, Poste fixe Job Category:Application Developer Start date:1er janvier 2019Apply here!Apply here',
  badges: [badgeMock],
  routerLink: ['job-detail/ed2079b0-ea03-11e8-b009-005056ac086d']
};
