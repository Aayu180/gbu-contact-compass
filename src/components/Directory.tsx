
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { contactsData } from '../data/contactsData';
import { Contact, Category } from '../types/directory';

const Directory = () => {
  const [contacts, setContacts] = useState<Contact[]>(contactsData);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contactsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<Category, boolean>>({
    'Administrative Officials': true,
    'Academic Heads': true,
    'Faculty Members': true,
    'Support Staff': true
  });

  // Filter contacts based on search term and category
  useEffect(() => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }

    setFilteredContacts(filtered);
  }, [searchTerm, selectedCategory, contacts]);

  // Group contacts by category
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    if (!groups[contact.category]) {
      groups[contact.category] = [];
    }
    groups[contact.category].push(contact);
    return groups;
  }, {} as Record<Category, Contact[]>);

  const toggleCategory = (category: Category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const categories: Category[] = ['Administrative Officials', 'Academic Heads', 'Faculty Members', 'Support Staff'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Gautam Buddha University Directory
          </h1>
          <p className="text-center opacity-90 text-sm md:text-base">
            Contact Information for Faculty, Staff, and Administration
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-card border-b px-4 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              className="flex-1"
            />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>
      </div>

      {/* Directory Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {Object.keys(groupedContacts).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No contacts found matching your criteria.
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryContacts = groupedContacts[category];
              if (!categoryContacts || categoryContacts.length === 0) return null;

              return (
                <div key={category} className="bg-card rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-4 bg-muted/50 hover:bg-muted transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-foreground">
                        {category}
                      </h2>
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {categoryContacts.length}
                      </span>
                    </div>
                    {expandedCategories[category] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </button>

                  {/* Category Content */}
                  {expandedCategories[category] && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryContacts.map((contact) => (
                          <ContactCard key={contact.id} contact={contact} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
