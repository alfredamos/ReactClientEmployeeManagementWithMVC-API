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
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

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
            //setDateOfBirth(result.data.dateOfBirth)
            if (result.data.photoPath !== null) {
                const imageUrl = result.data.photoPath;
                setImageSrc(imageUrl);                      
            }
        };
        GetEmployee();
    }, [employeeApiUrl]);



    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log("employee : ", employee);
        axios.put(employeeApiUrl, employee)
            .then(res => {
                props.history.replace('/')
            });
    }

    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    }


    const inputDateChangeHandler = (date) => {
        console.log("date : ", date);
        setDateOfBirth(date)
        setEmployee({ ...employee, dateOfBirth: date })
    }


    const inputImageChangeHandler = async (event) => { //----> async removed
        event.persist();
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageSource = await ConvertBase64(file); //----> await removed
            setImageSrc(imageSource);
            const fileArray = imageSource.split(","); //----> Extract the base64 string ftom the combination of data type and base64 string.
            const fileURL = fileArray[fileArray.length - 1];
            setEmployee({ ...employee, photoPath: fileURL });
            //setEmployee({ ...employee, photoFile: file })
        } else {
            setEmployee({ ...employee, photoPath: "" });
            //setEmployee({ ...employee, photoFile: "" })
        }

    }


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }


    const ConvertBase64 = async (file) => { //----> async removed
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }


    return (
        <>
            {
                isLoading ?
                    < EmployeeForm
                        departments={departments}
                        employee={employee}
                        backToListHandler={backToListHandler}
                        formSubmitHandler={formSubmitHandler}
                        heading={"Edit Employee Form"}
                        inputChangeHandler={inputChangeHandler}
                        inputImageChangeHandler={inputImageChangeHandler}
                        imageSrc={imageSrc}
                        upsertButton={"Save"}
                        inputDateChangeHandler={inputDateChangeHandler}
                        dateOfBirth={dateOfBirth}

                    />
                    :
                    <h3>Loading....</h3>
            }
        </>
    );
}