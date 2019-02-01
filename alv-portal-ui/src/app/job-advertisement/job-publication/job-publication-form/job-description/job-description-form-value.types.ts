export interface JobDescriptionFormValue {
  title: string;
  numberOfJobs: number;
  jobDescription: string;
}

export function emptyJobDescriptionFormValue(): JobDescriptionFormValue {
  return {
    title: null,
    numberOfJobs: 1,
    jobDescription: null
  };
}
