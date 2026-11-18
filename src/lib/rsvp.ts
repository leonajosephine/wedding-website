export type RsvpResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  attending: 'yes' | 'no';
  polterabend: boolean;
  vegan: boolean;
  allergies: string;
  songWish: string;
  submittedAt: string;
};
