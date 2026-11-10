import React from 'react';
import { SchoolDepartmentsPage, SchoolPageProps } from './components/SchoolDepartmentsPage';
import { schoolsConfigMap } from './data/schoolsData';

export const ManagementDepartmentsPage: React.FC<SchoolPageProps> = (props) => {
  return <SchoolDepartmentsPage config={schoolsConfigMap.management} {...props} />;
};

export default ManagementDepartmentsPage;
