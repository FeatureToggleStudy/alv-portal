export interface CandidateSearchRequest {
  page: number;
  size: number;
  sort?: string;
  body: CandidateSearchRequestBody;
}

export interface CandidateSearchResponse {
  totalCount: number;
  result: Candidate[];
}

export interface CandidateSearchRequestBody {
  // todo: add implementation
}

export interface Candidate {
  id: string;
  // todo: add implementation
}
