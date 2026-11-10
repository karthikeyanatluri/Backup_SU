import React from 'react';
import { SchoolDepartmentsPage, SchoolPageProps } from './components/SchoolDepartmentsPage';
import { schoolsConfigMap } from './data/schoolsData';

export const LawDepartmentsPage: React.FC<SchoolPageProps> = (props) => {
  return <SchoolDepartmentsPage config={schoolsConfigMap.law} {...props} />;
};

export default LawDepartmentsPage;
