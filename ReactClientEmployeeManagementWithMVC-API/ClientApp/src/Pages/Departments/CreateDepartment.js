import React, { useState } from 'react';
import axios from 'axios';
import { DepartmentForm } from '../Utilities/Forms/DepartmentForm';


export const CreateDepartment = (props) => {
    const [department, setDepartment] = useState({ departmentName: '' });

    const apiUrl = "https://localhost:5001/api/departments";


    const inputFormHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setDepartment({ ...department, [name]: value })
    }


    const formSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(apiUrl, department)
            .then(res => {
                props.history.replace('/departmentList')
            });
    }


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/departmentList'
        });

    }


    return (
        <DepartmentForm
            department={department}
            formSubmitHandler={formSubmitHandler}
            inputFormHandler={inputFormHandler}
            backToListHandler={backToListHandler}
            upsertButton={"Create"}
            heading={"Create Department Form"} 
        />    
    );

}