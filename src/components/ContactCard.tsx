
import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Contact } from '../types/directory';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="bg-background border rounded-lg p-6 shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 group">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
          {contact.name}
        </h3>
        <p className="text-primary font-medium text-sm mt-1">
          {contact.designation}
        </p>
        <p className="text-muted-foreground text-sm">
          {contact.department}
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-3">
        {/* Phone */}
        <div className="flex items-center gap-3 group/item">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Phone className="h-4 w-4 text-primary" />
          </div>
          <a 
            href={`tel:${contact.phone}`}
            className="text-sm text-foreground hover:text-primary transition-colors group-hover/item:underline"
          >
            {contact.phone}
          </a>
        </div>

        {/* Office Location */}
        {contact.office && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">
              {contact.office}
            </span>
          </div>
        )}
      </div>

      {/* Quick Action Button */}
      <div className="mt-4 pt-4 border-t">
        <a
          href={`tel:${contact.phone}`}
          className="w-full bg-primary text-primary-foreground text-xs py-2 px-3 rounded-md hover:bg-primary/90 transition-colors text-center font-medium inline-block hover:shadow-md"
        >
          Call Now
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
