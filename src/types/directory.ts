
export type MainCategory = 'Administrative Officials' | 'Hostels' | 'Support Staff' | 'Schools' | 'Admin';

export type SubCategory = 
  // Administrative Officials
  | 'VC Secretariat' | 'Registrar Office' | 'Coordinating Deans' | 'Accounts Section' 
  | 'International Convention Center' | 'VC Bungalow' | 'Maintenance Section'
  // Hostels
  | 'Savitri Bai Phule Girls Hostel' | 'Rama Bai Ambedkar Girls Hostel' | 'Maha Maya Girls Hostel'
  | 'Rani Laxmi Bai Girls Hostel' | 'Chhatrapati Sahuji Maharaj Boys Hostel' | 'Sant Ravidas Boys Hostel'
  | 'Narayan Guru Boys Hostel' | 'Hostel Chief Warden' | 'Sant Kabir Das Boys Hostel'
  | 'Birsa Munda Boys Hostel' | 'Guru Ghasi Das Boys Hostel' | 'Malik Mohd. Jaysee Boys Hostel'
  | 'Dr. Ram Manohar Lohia Boys Hostel' | 'Aryabhatt Boys Hostel' | 'Siddharth Boys Hostel'
  // Support Staff
  | 'Central Computer Center' | 'Telephone Exchange' | 'Central Library' | 'Meditation Centre'
  | 'Dispensary' | 'Sports Complex'
  // Schools
  | 'School of Applied Science' | 'School of Engineering' | 'School of ICT' | 'School of Management'
  | 'School of Biotech' | 'School of Buddhist Studies' | 'School of Humanities & Social Sciences' | 'School of Law'
  // Admin
  | 'Exam Control Room' | 'Department of Store' | 'Examination & Admission Department'
  | 'Security Numbers' | 'Corporate Relations' | 'Admin Post Office';

export interface Contact {
  id: string;
  name: string;
  designation: string;
  department: SubCategory;
  phone: string;
  location?: string;
  category: MainCategory;
}

export interface CategoryStructure {
  [key: string]: {
    icon: string;
    subcategories: SubCategory[];
  };
}
