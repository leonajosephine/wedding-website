export type RsvpResponse = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    attending: 'yes' | 'no';
    polterabend: boolean;
    menu: 'meat' | 'vegetarian' | 'vegan' | '';
    allergies: string;
    songWish: string;
    submittedAt: string;
  };
  
  const STORAGE_KEY = 'wedding-rsvp-responses';
  
  export const mockResponses: RsvpResponse[] = [
    {
      id: '1',
      firstName: 'Leona',
      lastName: 'Redmann',
      email: 'leona@example.com',
      attending: 'yes',
      polterabend: true,
      menu: 'vegetarian',
      allergies: 'Gluten',
      songWish: 'Dancing Queen',
      submittedAt: new Date().toISOString()
    },
    {
      id: '2',
      firstName: 'Alex',
      lastName: 'Klaus',
      email: 'alex@example.com',
      attending: 'yes',
      polterabend: true,
      menu: 'meat',
      allergies: '',
      songWish: 'Mr. Brightside',
      submittedAt: new Date().toISOString()
    },
    {
      id: '3',
      firstName: 'Anna',
      lastName: 'Hansen',
      email: 'anna@example.com',
      attending: 'no',
      polterabend: false,
      menu: '',
      allergies: '',
      songWish: '',
      submittedAt: new Date().toISOString()
    }
  ];
  
  export function getRsvpResponses(): RsvpResponse[] {
    if (typeof window === 'undefined') return [];
  
    const stored = window.localStorage.getItem(STORAGE_KEY);
  
    const savedResponses: RsvpResponse[] = stored
      ? JSON.parse(stored)
      : [];
  
    // Mock-Daten + echte Antworten
    return [...savedResponses, ...mockResponses];
  }
  
  export function saveRsvpResponse(
    response: Omit<RsvpResponse, 'id' | 'submittedAt'>
  ) {
    const responses = getRsvpResponses().filter(
      (item) => !mockResponses.some((mock) => mock.id === item.id)
    );
  
    const newResponse: RsvpResponse = {
      ...response,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString()
    };
  
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newResponse, ...responses])
    );
  
    return newResponse;
  }