
export type Category = 'Administrative Officials' | 'Academic Heads' | 'Faculty Members' | 'Support Staff';

export interface Contact {
  id: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  office?: string;
  category: Category;
}
