export interface KarirOpportunityInterface {
  id: number
  description: string
  company_name: string
  job_position: string
  posted_at: Date
}

export interface KarirResponseInterface {
  code: number
  message?: string
  data: {
    total_opportunities: 9
    opportunities: KarirOpportunityInterface[]
  }
}
