import React, { useState, useEffect } from 'react';
import { EmployeeForm } from '../Utilities/Forms/EmployeeForm'
import axios from 'axios';


const initialEmployeeData = {
    employeeID: 0,
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    departmentID: '',
    dateOfBirth: '',
    photoPath: '',
    photoFile: '',
}

export const EditEmployee = (props) => {
    const [employee, setEmployee] = useState(initialEmployeeData);
    const [departments, setDepartments] = useState([]);    
    const [imageSrc, setImageSrc] = useState('');
    const [isLoading, setIsLoading] = useState(false);   

    const employeeApiUrl = `https://localhost:5001/api/employees/${props.match.params.id}`;
    const departmentApiUrl = `https://localhost:5001/api/departments`;


    useEffect(() => {
        const GetDepartments = async () => {
            const result = await axios(departmentApiUrl);
            setDepartments(result.data);           
        };
        GetDepartments();
    }, [departmentApiUrl]);


    useEffect(() => {
        const GetEmployee = async () => {
            const result = await axios(employeeApiUrl);
            setEmployee(result.data);            
            setIsLoading(true);           
            if (result.data.photoPath !== null) {
                const imageUrl = result.data.photoPath;
                setImageSrc(imageUrl);                      
            }
        };
        GetEmployee();
    }, [employeeApiUrl]);


    const employeeEditHandler = (employee) => {
        console.log("employee edited : ", employee);
        axios.put(employeeApiUrl, employee)
            .then(res => {
                props.history.replace('/')
            });
    }
  

    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }

   
    return (
        <>
            {
                isLoading ?
                    < EmployeeForm
                        departments={departments}
                        backToListHandler={backToListHandler}
                        heading={"Employee Edit Form"}
                        imageSRC={imageSrc}
                        upsertButton={"Save"}
                        onEmployeeChange={employeeEditHandler}
                        initialEmployeeData={employee}

                    />
                    :
                    <h3>Loading....</h3>
            }
        </>
    );
}