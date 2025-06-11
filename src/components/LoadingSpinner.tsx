
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-primary/30"></div>
      </div>
      <span className="ml-3 text-muted-foreground animate-pulse">Loading contacts...</span>
    </div>
  );
};

export default LoadingSpinner;
