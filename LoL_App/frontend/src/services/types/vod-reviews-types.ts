export interface VODReviewComment{
    id:string,
    timestamp:number,///this might need to be a number
    text:string
}

export interface VODReviewCommentsState{
    comments: VODReviewComment[],
    currentTimestamp: number,
    responseStatus: string|null,
}
