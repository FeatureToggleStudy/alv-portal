export interface JobDescriptionFormValue {
  title: string;
  numberOfJobs: number;
  jobDescription: string;
}

export const emptyJobDescriptionFormValue: JobDescriptionFormValue = {
  title: null,
  numberOfJobs: 1,
  jobDescription: null
};
