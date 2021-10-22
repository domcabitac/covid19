export interface ProvinceDataSummary {
    province : string,
    health_region : string, 
    date_report : Date,
    cases: number,
    cumulative_cases ?: number
}