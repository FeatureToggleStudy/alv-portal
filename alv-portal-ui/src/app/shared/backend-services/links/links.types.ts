export interface Link {
  title: string;
  url: string;
  type?: 'PRIMARY';
}

export interface LinkPanelData {
  title: string;
  links: Link[];
}
