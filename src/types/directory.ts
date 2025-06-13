
export interface Contact {
  id: string;
  name: string;
  designation: string;
  department: string;
  category: string;
  subcategory: string;
  location: string;
  mobile: string;
}

export interface Category {
  name: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    name: 'Administrative Officials',
    subcategories: [
      'VC Secretariat',
      'Registrar Office',
      'Coordinating Deans',
      'Accounts Section',
      'International Convention Center',
      'VC Bungalow',
      'Maintenance Section'
    ]
  },
  {
    name: 'Hostels',
    subcategories: [
      'Savitri Bai Phule Girls Hostel',
      'Rama Bai Ambedkar Girls Hostel',
      'Maha Maya Girls Hostel',
      'Rani Laxmi Bai Girls Hostel',
      'Chhatrapati Sahuji Maharaj Boys Hostel',
      'Sant Ravidas Boys Hostel',
      'Narayan Guru Boys Hostel',
      'Hostel Chief Warden',
      'Sant Kabir Das Boys Hostel',
      'Birsa Munda Boys Hostel',
      'Guru Ghasi Das Boys Hostel',
      'Malik Mohd. Jaysee Boys Hostel',
      'Dr. Ram Manohar Lohia Boys Hostel',
      'Aryabhatt Boys Hostel',
      'Siddharth Boys Hostel'
    ]
  },
  {
    name: 'Support Staff',
    subcategories: [
      'Central Computer Center',
      'Telephone Exchange',
      'Central Library',
      'Meditation Centre',
      'Dispensary',
      'Sports Complex'
    ]
  },
  {
    name: 'Schools',
    subcategories: [
      'School of Applied Science',
      'School of Engineering',
      'School of ICT',
      'School of Management',
      'School of Biotech',
      'School of Buddhist Studies',
      'School of Humanities & Social Sciences',
      'School of Law'
    ]
  },
  {
    name: 'Admin',
    subcategories: [
      'Exam Control Room',
      'Department of Store',
      'Examination & Admission Department',
      'Security Numbers',
      'Corporate Relations',
      'Admin Post Office'
    ]
  }
];
