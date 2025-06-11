
import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Contact } from '../types/directory';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {contact.name}
        </h3>
        <p className="text-primary font-medium text-sm mt-1 group-hover:text-primary/80 transition-colors">
          {contact.designation}
        </p>
        <p className="text-muted-foreground text-sm group-hover:text-foreground/70 transition-colors">
          {contact.department}
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-3">
        {/* Phone */}
        <div className="flex items-center gap-3 group/item">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Phone className="h-4 w-4 text-primary group-hover:text-primary" />
          </div>
          <a 
            href={`tel:${contact.phone}`}
            className="text-sm text-foreground hover:text-primary transition-colors group-hover/item:underline group-hover:font-medium"
          >
            {contact.phone}
          </a>
        </div>

        {/* Office Location */}
        {contact.location && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
              <MapPin className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
              {contact.location}
            </span>
          </div>
        )}
      </div>

      {/* Quick Action Button */}
      <div className="mt-6 pt-4 border-t border-border group-hover:border-primary/30 transition-colors">
        <a
          href={`tel:${contact.phone}`}
          className="w-full bg-primary text-primary-foreground text-sm py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-all duration-300 text-center font-medium inline-block hover:shadow-lg hover:shadow-primary/30 group-hover:scale-105 active:scale-95"
        >
          Call Now
        </a>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ContactCard;
