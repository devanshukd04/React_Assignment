
export type CandidateExperience={
    id:number
    name:string
    status:CandidateStatus
    feedback:string
    rating:number
}

export enum CandidateStatus {
    Pending,
    Completed
}