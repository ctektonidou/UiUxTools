export interface SubmitReviewRequest {
    toolId: number;
    totalRating: number;
    easyToUse: number;
    trueToChars: number;
    comment: string;
    userId: number;
}