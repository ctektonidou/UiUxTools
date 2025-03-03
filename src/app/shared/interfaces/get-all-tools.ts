export interface GetAllToolsResponse {
    toolId: number;
    toolname: string;
    descirption: string;
    image: string;
    link: string;
}

export interface Tool {
    toolId: number;
    toolname: string;
    descirption: string;
    image: string;
    link: string;
    // targetAudience: string;
    // platformSupport: string;
    // pricingModel: string;
    // useCases: string;
    // animation: boolean;
    // wireframing: boolean;
    // productLink: string;
}
