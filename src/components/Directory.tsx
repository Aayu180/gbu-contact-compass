
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import LoadingSpinner from './LoadingSpinner';
import { contactsData } from '../data/contactsData';
import { Contact, MainCategory, SubCategory } from '../types/directory';

const Directory = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MainCategory | SubCategory | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Simulate loading and initialize data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContacts(contactsData);
      setFilteredContacts(contactsData);
      
      // Initialize all categories as expanded
      const initialExpanded = contactsData.reduce((acc, contact) => {
        acc[contact.category] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setExpandedCategories(initialExpanded);
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Filter contacts based on search term and category
  useEffect(() => {
    if (isLoading) return;

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
      // Check if it's a main category or subcategory
      filtered = filtered.filter(contact => 
        contact.category === selectedCategory || contact.department === selectedCategory
      );
    }

    setFilteredContacts(filtered);
  }, [searchTerm, selectedCategory, contacts, isLoading]);

  // Group contacts by main category
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const category = contact.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(contact);
    return groups;
  }, {} as Record<MainCategory, Contact[]>);

  const toggleCategory = (category: MainCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const mainCategories: MainCategory[] = ['Administrative Officials', 'Hostels', 'Support Staff', 'Schools', 'Admin'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-8 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Gautam Buddha University Directory
            </h1>
            <p className="text-center opacity-90 text-sm md:text-base">
              Comprehensive Contact Information for Faculty, Staff, and Administration
            </p>
          </div>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-6 px-4 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Gautam Buddha University Directory
          </h1>
          <p className="text-center opacity-90 text-sm md:text-base">
            Comprehensive Contact Information for Faculty, Staff, and Administration
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-[120px] z-30 bg-card/95 backdrop-blur-sm border-b px-4 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              className="flex-1"
            />
            <CategoryDropdown
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          {/* Results count with enhanced styling */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-primary">{filteredContacts.length}</span> contact{filteredContacts.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && (
                <span> in <span className="font-medium text-foreground">"{selectedCategory}"</span></span>
              )}
              {searchTerm && (
                <span> matching <span className="font-medium text-foreground">"{searchTerm}"</span></span>
              )}
            </div>
            
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Directory Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {Object.keys(groupedContacts).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-xl mb-2">
              No contacts found matching your criteria.
            </div>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {mainCategories.map((category) => {
              const categoryContacts = groupedContacts[category];
              if (!categoryContacts || categoryContacts.length === 0) return null;

              return (
                <div key={category} className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-5 bg-gradient-to-r from-muted/80 to-muted/40 hover:from-muted hover:to-muted/60 transition-all duration-300 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category}
                      </h2>
                      <span className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                        {categoryContacts.length}
                      </span>
                    </div>
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {expandedCategories[category] ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Category Content with smooth animation */}
                  <div className={`transition-all duration-500 ease-in-out ${
                    expandedCategories[category] ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryContacts.map((contact, index) => (
                          <div
                            key={contact.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <ContactCard contact={contact} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-30"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Directory;
