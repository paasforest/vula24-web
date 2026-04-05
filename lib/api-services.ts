/**
 * Service keys sent to Railway API (snake_case).
 * Labels are for UI only.
 */
export const API_SERVICE_OPTIONS = [
  { value: 'car_lockout', label: 'Car lockout' },
  { value: 'house_lockout', label: 'House lockout' },
  { value: 'key_duplication', label: 'Key duplication' },
  { value: 'lock_replacement', label: 'Lock replacement' },
  { value: 'lock_repair', label: 'Lock repair' },
  { value: 'safe_opening', label: 'Safe opening' },
  { value: 'emergency_24h', label: 'Emergency / 24-hour' },
  { value: 'commercial', label: 'Commercial / office' },
  { value: 'security_access', label: 'Security & access control' },
  { value: 'gate_garage', label: 'Gate & garage' },
  { value: 'onsite_mobile', label: 'Onsite / mobile' },
  { value: 'other', label: 'Other' },
] as const

export type ApiServiceKey = (typeof API_SERVICE_OPTIONS)[number]['value']

/** Customer lead urgency → API */
export const CUSTOMER_URGENCY_OPTIONS = [
  { value: 'emergency', label: 'Right now — emergency' },
  { value: 'urgent', label: 'Within the hour' },
  { value: 'flexible', label: 'Today — flexible time' },
] as const

export type CustomerUrgencyKey = (typeof CUSTOMER_URGENCY_OPTIONS)[number]['value']

export const SUBURBS: Record<'GP' | 'WC', string[]> = {
  GP: [
    'Sandton',
    'Randburg',
    'Midrand',
    'Centurion',
    'Pretoria CBD',
    'Menlyn',
    'Soweto',
    'Roodepoort',
    'Boksburg',
    'Germiston',
    'Edenvale',
    'Fourways',
    'Bryanston',
    'Parktown',
    'Johannesburg CBD',
    'Rosebank',
    'Bedfordview',
    'Alberton',
    'Kempton Park',
  ],
  WC: [
    'Cape Town CBD',
    'Sea Point',
    'Green Point',
    'Camps Bay',
    'Claremont',
    'Rondebosch',
    'Mitchells Plain',
    'Bellville',
    'Tygervalley',
    'Stellenbosch',
    'Paarl',
    'Worcester',
    'George',
    'Franschhoek',
    'Somerset West',
    'Strand',
    'Brackenfell',
    'Kuils River',
  ],
}
