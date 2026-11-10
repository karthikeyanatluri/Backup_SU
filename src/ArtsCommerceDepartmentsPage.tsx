import React from 'react';
import { SchoolDepartmentsPage, SchoolPageProps } from './components/SchoolDepartmentsPage';
import { schoolsConfigMap } from './data/schoolsData';

export const ArtsCommerceDepartmentsPage: React.FC<SchoolPageProps> = (props) => {
  return <SchoolDepartmentsPage config={schoolsConfigMap['arts-commerce']} {...props} />;
};

export default ArtsCommerceDepartmentsPage;
