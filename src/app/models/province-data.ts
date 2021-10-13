export interface ProvinceDataSummary {
    province : string,
    date_active ?: string,
    cumulative_cases: number,
    cumulative_deaths ?: number ,
    cumulative_recovered ?: number,
    active_cases ?: number
}