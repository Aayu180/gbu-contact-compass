
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import CategoryDropdown from '../components/CategoryDropdown';
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { contactsData } from '../data/contactsData';
import { Contact } from '../types/directory';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contactsData);
  const [isLoading, setIsLoading] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Header scroll behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter contacts based on search and category
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = contactsData;

      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(contact => contact.category === selectedCategory);
      }

      // Filter by subcategory
      if (selectedSubcategory) {
        filtered = filtered.filter(contact => contact.subcategory === selectedSubcategory);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredContacts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedSubcategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with smooth slide animation */}
      <header className={`bg-primary text-primary-foreground py-6 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Gautam Buddha University</h1>
            <p className="text-xl opacity-90">Contact Directory</p>
          </div>
        </div>
      </header>

      {/* Sticky Navbar with Search Bar and Contact Count */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Contact Count */}
            <div className="order-2 lg:order-1">
              <p className="text-sm text-muted-foreground font-medium">
                {filteredContacts.length} Contact{filteredContacts.length !== 1 ? 's' : ''} Found
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center order-1 lg:order-2">
              <CategoryDropdown
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={setSelectedCategory}
                onSubcategoryChange={setSelectedSubcategory}
              />
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <Phone className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No contacts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or category selection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContacts.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
