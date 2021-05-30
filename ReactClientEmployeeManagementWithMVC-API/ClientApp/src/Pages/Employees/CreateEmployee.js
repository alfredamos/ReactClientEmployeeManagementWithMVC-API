import React, { useState, useEffect } from 'react';
import { EmployeeForm } from '../Utilities/Forms/EmployeeForm'
import axios from 'axios';


const initialEmployeeData = {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    departmentID: '',
    dateOfBirth: '',
    photoPath: '',
    photoFile: '',
}

export const CreateEmployee = (props) => {
    const [departments, setDepartments] = useState([]);    
    const [isLoading, setIsLoading] = useState(false);
    const [imageSRC] = useState('');
    const employeeApiUrl = `https://localhost:5001/api/employees`;
    const departmentApiUrl = `https://localhost:5001/api/departments`;


    useEffect(() => {
        const GetDepartments = async () => {
            const result = await axios(departmentApiUrl);
            setDepartments(result.data);
            setIsLoading(true);           
        };
        GetDepartments();
    }, [departmentApiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }


    const employeeCreateHandler = (employee) => {        
        axios.post(employeeApiUrl, employee)
            .then(res => {
                props.history.replace('/')
            });
    }

    

    return (
        <>
        {
            isLoading ?
            < EmployeeForm
                        departments={departments}
                        backToListHandler={backToListHandler}
                        heading={"Employee Create Form"}
                        imageSRC={imageSRC}
                        upsertButton={"Create"}
                        onEmployeeChange={employeeCreateHandler}
                        initialEmployeeData={initialEmployeeData}
                        
                    />
                    :
                    <h3>Loading....</h3>
         }  
        </>
    );
}