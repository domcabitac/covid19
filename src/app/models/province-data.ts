export interface ProvinceDataSummary {
    province ?: string,
    cumulative_cases ?: number,
    cumulative_deaths ?: number  | undefined,
    cumulative_recovered ?: number  | undefined,
    active_cases ?: number  | undefined
}