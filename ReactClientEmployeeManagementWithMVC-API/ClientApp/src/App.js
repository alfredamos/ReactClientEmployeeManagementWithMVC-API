import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { CreateDepartment } from './Pages/Departments/CreateDepartment';
import { DepartmentList } from './Pages/Departments/DepartmentList';
import { DeleteDepartment } from './Pages/Departments/DeleteDepartment';
import { DetailDepartment } from './Pages/Departments/DetailDepartment';
import { EditDepartment } from './Pages/Departments/EditDepartment';
import { CreateEmployee } from './Pages/Employees/CreateEmployee';
import { EmployeeList } from './Pages/Employees/EmployeeList';
import { DeleteEmployee } from './Pages/Employees/DeleteEmployee';
import { DetailEmployee } from './Pages/Employees/DetailEmployee';
import { EditEmployee } from './Pages/Employees/EditEmployee';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>                    
        <Route path='/createDepartment' component={CreateDepartment} />
        <Route path='/departmentList' component={DepartmentList} />
        <Route path='/deleteDepartment/:id' component={DeleteDepartment} />
        <Route path='/detailDepartment/:id' component={DetailDepartment} />
        <Route path='/editDepartment/:id' component={EditDepartment} />
        <Route path='/createEmployee' component={CreateEmployee} />
         <Route exact path='/' component={EmployeeList} />
        <Route path='/deleteEmployee/:id' component={DeleteEmployee} />
        <Route path='/detailEmployee/:id' component={DetailEmployee} />
        <Route path='/editEmployee/:id' component={EditEmployee} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
