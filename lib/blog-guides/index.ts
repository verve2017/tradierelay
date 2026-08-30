import type { BlogArticle } from '@/lib/blog';
import { bookingGuides } from './bookings';
import { customerCommunicationGuides } from './customer-communication';
import { localGrowthGuides } from './local-growth';
import { revenueMeasurementGuides } from './revenue-measurement';
import { safetyReliabilityGuides } from './safety-reliability';
import { teamOperationsGuides } from './team-operations';
import { tradePlaybookGuides } from './trade-playbooks';

export const completionGuides: BlogArticle[] = [
  ...tradePlaybookGuides,
  ...bookingGuides,
  ...customerCommunicationGuides,
  ...teamOperationsGuides,
  ...revenueMeasurementGuides,
  ...safetyReliabilityGuides,
  ...localGrowthGuides,
];
