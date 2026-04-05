/**
 * Service keys sent to Railway API (snake_case).
 * Matches GET /api/services on Railway (Phase 4).
 */
export const API_SERVICE_OPTIONS = [
  { value: 'car_lockout', label: 'Car lockout', urgency: 'emergency' },
  { value: 'house_lockout', label: 'House lockout', urgency: 'emergency' },
  { value: 'office_lockout', label: 'Office lockout', urgency: 'emergency' },
  { value: 'lost_car_key', label: 'Lost car key replacement', urgency: 'urgent' },
  { value: 'car_key_duplication', label: 'Car key duplication', urgency: 'flexible' },
  { value: 'car_key_programming', label: 'Car key programming', urgency: 'urgent' },
  { value: 'broken_key_extraction', label: 'Broken car key extraction', urgency: 'urgent' },
  { value: 'house_key_replacement', label: 'House key replacement', urgency: 'urgent' },
  { value: 'house_key_duplication', label: 'House key duplication', urgency: 'flexible' },
  { value: 'lock_repair', label: 'Lock repair', urgency: 'flexible' },
  { value: 'lock_replacement', label: 'Lock replacement', urgency: 'flexible' },
  { value: 'lock_upgrade', label: 'Lock upgrade', urgency: 'flexible' },
  { value: 'safe_opening', label: 'Safe opening', urgency: 'urgent' },
  { value: 'gate_motor', label: 'Gate motor repair', urgency: 'flexible' },
  { value: 'access_control', label: 'Access control', urgency: 'flexible' },
  { value: 'padlock_removal', label: 'Padlock removal', urgency: 'urgent' },
  { value: 'garage_door', label: 'Garage door', urgency: 'flexible' },
  { value: 'ignition_repair', label: 'Ignition repair', urgency: 'urgent' },
] as const

export type ApiServiceKey = (typeof API_SERVICE_OPTIONS)[number]['value']

export function getServiceLabel(value: string): string {
  return API_SERVICE_OPTIONS.find((s) => s.value === value)?.label ?? value
}

export function getServiceUrgency(value: string): string {
  return API_SERVICE_OPTIONS.find((s) => s.value === value)?.urgency ?? 'flexible'
}

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
