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
