
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Category } from '../types/directory';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  categories 
}) => {
  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
        className="appearance-none bg-background border border-input rounded-lg px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all min-w-[200px]"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
};

export default CategoryFilter;
