
import React, { useState } from 'react';
import { ChevronDown, Building, Home, Users, GraduationCap, Settings } from 'lucide-react';
import { MainCategory, SubCategory, CategoryStructure } from '../types/directory';

interface CategoryDropdownProps {
  selectedCategory: MainCategory | SubCategory | 'all';
  onCategoryChange: (category: MainCategory | SubCategory | 'all') => void;
}

const categoryStructure: CategoryStructure = {
  'Administrative Officials': {
    icon: 'Building',
    subcategories: [
      'VC Secretariat', 'Registrar Office', 'Coordinating Deans', 'Accounts Section',
      'International Convention Center', 'VC Bungalow', 'Maintenance Section'
    ]
  },
  'Hostels': {
    icon: 'Home',
    subcategories: [
      'Savitri Bai Phule Girls Hostel', 'Rama Bai Ambedkar Girls Hostel', 'Maha Maya Girls Hostel',
      'Rani Laxmi Bai Girls Hostel', 'Chhatrapati Sahuji Maharaj Boys Hostel', 'Sant Ravidas Boys Hostel',
      'Narayan Guru Boys Hostel', 'Hostel Chief Warden', 'Sant Kabir Das Boys Hostel',
      'Birsa Munda Boys Hostel', 'Guru Ghasi Das Boys Hostel', 'Malik Mohd. Jaysee Boys Hostel',
      'Dr. Ram Manohar Lohia Boys Hostel', 'Aryabhatt Boys Hostel', 'Siddharth Boys Hostel'
    ]
  },
  'Support Staff': {
    icon: 'Users',
    subcategories: [
      'Central Computer Center', 'Telephone Exchange', 'Central Library', 'Meditation Centre',
      'Dispensary', 'Sports Complex'
    ]
  },
  'Schools': {
    icon: 'GraduationCap',
    subcategories: [
      'School of Applied Science', 'School of Engineering', 'School of ICT', 'School of Management',
      'School of Biotech', 'School of Buddhist Studies', 'School of Humanities & Social Sciences', 'School of Law'
    ]
  },
  'Admin': {
    icon: 'Settings',
    subcategories: [
      'Exam Control Room', 'Department of Store', 'Examination & Admission Department',
      'Security Numbers', 'Corporate Relations', 'Admin Post Office'
    ]
  }
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building': return <Building className="h-4 w-4" />;
      case 'Home': return <Home className="h-4 w-4" />;
      case 'Users': return <Users className="h-4 w-4" />;
      case 'GraduationCap': return <GraduationCap className="h-4 w-4" />;
      case 'Settings': return <Settings className="h-4 w-4" />;
      default: return null;
    }
  };

  const getDisplayText = () => {
    if (selectedCategory === 'all') return 'All Categories';
    return selectedCategory;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[250px] px-4 py-3 text-left bg-background border border-input rounded-lg hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all shadow-sm"
      >
        <span className="text-foreground font-medium truncate">
          {getDisplayText()}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-1">
            <button
              onClick={() => {
                onCategoryChange('all');
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left rounded-md hover:bg-accent transition-colors ${
                selectedCategory === 'all' ? 'bg-accent text-accent-foreground' : 'text-foreground'
              }`}
            >
              All Categories
            </button>
            
            {Object.entries(categoryStructure).map(([category, { icon, subcategories }]) => (
              <div key={category} className="my-1">
                <button
                  onClick={() => {
                    onCategoryChange(category as MainCategory);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left rounded-md hover:bg-accent transition-colors flex items-center gap-2 font-medium ${
                    selectedCategory === category ? 'bg-accent text-accent-foreground' : 'text-foreground'
                  }`}
                >
                  {getIcon(icon)}
                  {category}
                </button>
                
                <div className="ml-6 space-y-1">
                  {subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => {
                        onCategoryChange(subcategory);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-sm rounded-md hover:bg-accent/50 transition-colors ${
                        selectedCategory === subcategory ? 'bg-accent/70 text-accent-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
