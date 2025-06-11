
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Contact } from '../types/directory';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="bg-background border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-foreground leading-tight">
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
        {/* Email */}
        <div className="flex items-center gap-3 group">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <a 
            href={`mailto:${contact.email}`}
            className="text-sm text-foreground hover:text-primary transition-colors truncate group-hover:underline"
            title={contact.email}
          >
            {contact.email}
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 group">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Phone className="h-4 w-4 text-primary" />
          </div>
          <a 
            href={`tel:${contact.phone}`}
            className="text-sm text-foreground hover:text-primary transition-colors group-hover:underline"
          >
            {contact.phone}
          </a>
        </div>

        {/* Office Location */}
        {contact.office && (
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">
              {contact.office}
            </span>
          </div>
        )}
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t">
        <a
          href={`mailto:${contact.email}`}
          className="flex-1 bg-primary text-primary-foreground text-xs py-2 px-3 rounded-md hover:bg-primary/90 transition-colors text-center font-medium"
        >
          Email
        </a>
        <a
          href={`tel:${contact.phone}`}
          className="flex-1 bg-secondary text-secondary-foreground text-xs py-2 px-3 rounded-md hover:bg-secondary/80 transition-colors text-center font-medium"
        >
          Call
        </a>
      </div>
    </div>
  );
};

export default ContactCard;
