import React from 'react';
import { SchoolHero } from './SchoolHero';
import { schoolsConfigMap } from '../data/schoolsData';

interface EngineeringHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const EngineeringHero: React.FC<EngineeringHeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}) => {
  const config = schoolsConfigMap.engineering;

  return (
    <SchoolHero
      schoolName={config.name}
      searchPlaceholder={config.searchPlaceholder}
      filterTabs={config.filterTabs}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
    />
  );
};
