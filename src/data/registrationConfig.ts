import { CompetitionEvent, DepartmentItem } from './engineeringDepartments';
import { SchoolId, schoolsConfigMap } from './schoolsData';

export interface RegistrationSelection {
  schoolId: SchoolId;
  deptId: string;
  eventIds: string[];
}

export interface SquadMember {
  name: string;
  identifier: string;
}

export interface FeeSummary {
  subtotal: number;
  concession: number;
  accommodationFee: number;
  total: number;
}

export type InstitutionType = 'internal' | 'external';
export type PaymentMethod = 'upi' | 'counter' | 'institutional';
export type AuthMode = 'google' | 'manual';
export type PassDurationId = '1-day' | '2-days';

export interface PassDurationOption {
  id: PassDurationId;
  title: string;
  price: number;
  priceLabel: string;
  badge?: string;
  perks: string[];
}

export const PASS_DURATION_OPTIONS: PassDurationOption[] = [
  {
    id: '1-day',
    title: '1 Day Registration Pass',
    price: 299,
    priceLabel: '₹299',
    perks: [
      'Full single-day entry across all SUPRAGNA 2K27 arenas',
      'Eligible for department competitions & pro workshops',
      'Official stamped delegate pass & participation certificate',
    ],
  },
  {
    id: '2-days',
    title: '2 Days Registration Pass',
    price: 499,
    priceLabel: '₹499',
    badge: 'Best Value • Full Fest',
    perks: [
      'Unrestricted 2-day access across all Schools & stages',
      'Includes cultural nights, pro-shows & hackathon finals',
      'Priority check-in wristband & verified festival certificate',
    ],
  },
];

export function normalizeDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function isValidMobileNumber(phone: string): boolean {
  const digits = normalizeDigits(phone);
  // Accepts 10-digit Indian mobile numbers (with optional leading 0 or +91 prefix)
  const core = digits.length === 12 && digits.startsWith('91')
    ? digits.slice(2)
    : digits.length === 11 && digits.startsWith('0')
      ? digits.slice(1)
      : digits;
  return /^[6-9]\d{9}$/.test(core);
}

export const CATEGORY_FEE_MAP: Record<CompetitionEvent['category'], number> = {
  Flagship: 300,
  Hackathon: 350,
  'Robotics / Combat': 350,
  'Design & Build': 250,
  Technical: 200,
  Management: 250,
  Cultural: 200,
  Legal: 250,
};

export const ACCOMMODATION_FEE = 400;
export const INTERNAL_CONCESSION_RATE = 0.25;

export function getEventRegistrationFee(event: CompetitionEvent): number {
  return CATEGORY_FEE_MAP[event.category] ?? 200;
}

export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function parseTeamBounds(teamSize: string): { min: number; max: number } {
  const normalized = teamSize.toLowerCase();
  if (normalized.includes('individual')) {
    return { min: 1, max: 1 };
  }
  const numbers = normalized.match(/\d+/g)?.map(Number) ?? [];
  if (numbers.length === 1) {
    return { min: numbers[0], max: numbers[0] };
  }
  if (numbers.length >= 2) {
    return { min: numbers[0], max: numbers[1] };
  }
  return { min: 1, max: 4 };
}

export function calculateFeeSummary(
  selectedEvents: CompetitionEvent[],
  institutionType: InstitutionType,
  needsAccommodation: boolean
): FeeSummary {
  const subtotal = selectedEvents.reduce((sum, evt) => sum + getEventRegistrationFee(evt), 0);
  const concession =
    institutionType === 'internal' ? Math.round(subtotal * INTERNAL_CONCESSION_RATE) : 0;
  const accommodationFee =
    institutionType === 'external' && needsAccommodation ? ACCOMMODATION_FEE : 0;
  const total = Math.max(0, subtotal - concession + accommodationFee);

  return { subtotal, concession, accommodationFee, total };
}

/**
 * Checks whether two selected competitions share the same festival day and exact start window.
 */
export function findScheduleNotice(selectedEvents: CompetitionEvent[]): string | null {
  if (selectedEvents.length < 2) return null;

  for (let i = 0; i < selectedEvents.length; i++) {
    for (let j = i + 1; j < selectedEvents.length; j++) {
      const a = selectedEvents[i].schedule;
      const b = selectedEvents[j].schedule;
      if (a === b) {
        return `"${selectedEvents[i].name}" and "${selectedEvents[j].name}" share the exact slot (${a}). Ensure separate squad members or verify slot coordination at check-in.`;
      }
    }
  }
  return null;
}

export function generatePassReference(schoolId: SchoolId, fullName: string): string {
  const prefixMap: Record<SchoolId, string> = {
    engineering: 'ENG',
    science: 'SCI',
    management: 'MGT',
    'arts-commerce': 'ARC',
    law: 'LAW',
  };
  const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  let hash = 2027;
  for (let i = 0; i < cleanName.length; i++) {
    hash = (hash * 31 + cleanName.charCodeAt(i)) % 9000 + 1000;
  }
  return `SUP27-${prefixMap[schoolId]}-${hash}`;
}

export function resolveInitialRegistrationSelection(
  override?: Partial<RegistrationSelection>
): RegistrationSelection {
  const params = new URLSearchParams(window.location.search);
  const querySchool = (override?.schoolId ?? params.get('school') ?? 'engineering') as SchoolId;
  const schoolConfig = schoolsConfigMap[querySchool] ?? schoolsConfigMap.engineering;

  const queryDept = override?.deptId ?? params.get('dept');
  const dept: DepartmentItem =
    schoolConfig.departments.find((d) => d.id === queryDept) ?? schoolConfig.departments[0];

  const queryEvent = params.get('event');
  const eventIds =
    override?.eventIds && override.eventIds.length > 0
      ? override.eventIds
      : queryEvent && dept.events.some((e) => e.id === queryEvent)
        ? [queryEvent]
        : [dept.events[0].id];

  return {
    schoolId: schoolConfig.id,
    deptId: dept.id,
    eventIds,
  };
}
