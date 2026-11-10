import React from 'react';
import { SchoolDepartmentsPage, SchoolPageProps } from './components/SchoolDepartmentsPage';
import { schoolsConfigMap } from './data/schoolsData';

export const ScienceDepartmentsPage: React.FC<SchoolPageProps> = (props) => {
  return <SchoolDepartmentsPage config={schoolsConfigMap.science} {...props} />;
};

export default ScienceDepartmentsPage;
