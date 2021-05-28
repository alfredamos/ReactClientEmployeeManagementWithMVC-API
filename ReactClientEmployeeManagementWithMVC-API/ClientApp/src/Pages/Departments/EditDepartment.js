import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DepartmentForm } from '../Utilities/Forms/DepartmentForm';


export const EditDepartment = (props) => {
    const [department, setDepartment] = useState({ departmentName: '' });

    const apiUrl = `https://localhost:5001/api/departments/${props.match.params.id}`;    


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setDepartment(result.data);
        };
        GetData();
    }, [apiUrl]);


    const inputFormHandler = (event) => {
        const { name, value } = event.target;
        setDepartment({ ...department, [name]: value })
    }


    const formSubmitHandler = (event) => {
        event.preventDefault();
        axios.put(apiUrl, department)
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
            upsertButton={"Save"}
            heading={"Edit Department Form"}
        />
    );

}