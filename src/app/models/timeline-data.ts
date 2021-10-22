export interface TimelineSummary {
    province : string,
    date_active : string,
    cumulative_cases ?: number,
    cumulative_recovered ?: number,
    cumulative_deaths ?: number,
    active_cases ?: number,
    active_cases_change : number
}