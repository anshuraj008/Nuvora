export interface StateLocationData {
  state: string;
  name: string;
  cities: { value: string; label: string; colleges?: string[] }[];
}

export const US_STATES = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'IL', label: 'Illinois' },
  { value: 'WA', label: 'Washington' },
  { value: 'FL', label: 'Florida' },
];

export const CITIES_BY_STATE: Record<string, { value: string; label: string; colleges: string[] }[]> = {
  CA: [
    {
      value: 'san-francisco',
      label: 'San Francisco',
      colleges: ['UC San Francisco', 'San Francisco State University', 'University of San Francisco'],
    },
    {
      value: 'los-angeles',
      label: 'Los Angeles',
      colleges: ['UCLA', 'USC', 'Loyola Marymount University'],
    },
    {
      value: 'berkeley',
      label: 'Berkeley',
      colleges: ['UC Berkeley', 'Berkeley City College'],
    },
    {
      value: 'san-diego',
      label: 'San Diego',
      colleges: ['UC San Diego', 'San Diego State University'],
    },
  ],
  NY: [
    {
      value: 'new-york-city',
      label: 'New York City',
      colleges: ['Columbia University', 'NYU', 'Fordham University', 'Hunter College'],
    },
    {
      value: 'ithaca',
      label: 'Ithaca',
      colleges: ['Cornell University', 'Ithaca College'],
    },
    {
      value: 'buffalo',
      label: 'Buffalo',
      colleges: ['University at Buffalo', 'Buffalo State University'],
    },
  ],
  TX: [
    {
      value: 'austin',
      label: 'Austin',
      colleges: ['UT Austin', 'St. Edward’s University'],
    },
    {
      value: 'houston',
      label: 'Houston',
      colleges: ['Rice University', 'University of Houston'],
    },
    {
      value: 'dallas',
      label: 'Dallas',
      colleges: ['SMU', 'UT Dallas'],
    },
  ],
  MA: [
    {
      value: 'boston',
      label: 'Boston',
      colleges: ['Harvard University', 'MIT', 'Boston University', 'Northeastern University'],
    },
    {
      value: 'cambridge',
      label: 'Cambridge',
      colleges: ['Harvard University', 'MIT'],
    },
  ],
  IL: [
    {
      value: 'chicago',
      label: 'Chicago',
      colleges: ['University of Chicago', 'Northwestern University', 'DePaul University', 'UIC'],
    },
  ],
  WA: [
    {
      value: 'seattle',
      label: 'Seattle',
      colleges: ['University of Washington', 'Seattle University'],
    },
  ],
  FL: [
    {
      value: 'miami',
      label: 'Miami',
      colleges: ['University of Miami', 'FIU'],
    },
    {
      value: 'gainesville',
      label: 'Gainesville',
      colleges: ['University of Florida'],
    },
  ],
};

export const POPULAR_VIBES = [
  { id: 'tech', label: 'Tech & Startups', emoji: '💻' },
  { id: 'music', label: 'Live Concerts & Music', emoji: '🎧' },
  { id: 'nightlife', label: 'Nightlife & Parties', emoji: '🍸' },
  { id: 'coffee', label: 'Café Hopping & Study', emoji: '☕' },
  { id: 'fitness', label: 'Gym, Running & Fitness', emoji: '🏃' },
  { id: 'art', label: 'Art, Design & Fashion', emoji: '🎨' },
  { id: 'gaming', label: 'Gaming & Esports', emoji: '🎮' },
  { id: 'foodie', label: 'Foodie & Dining', emoji: '🍜' },
  { id: 'outdoors', label: 'Hiking & Outdoors', emoji: '🏔️' },
  { id: 'books', label: 'Book Clubs & Writing', emoji: '📚' },
  { id: 'cinema', label: 'Movies & Film', emoji: '🎬' },
  { id: 'travel', label: 'Road Trips & Travel', emoji: '✈️' },
];

export const PRONOUN_OPTIONS = [
  { value: 'she/her', label: 'She / Her' },
  { value: 'he/him', label: 'He / Him' },
  { value: 'they/them', label: 'They / Them' },
  { value: 'she/they', label: 'She / They' },
  { value: 'he/they', label: 'He / They' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];
