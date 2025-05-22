import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {(title || action) && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action && <div className="mt-4 sm:mt-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;