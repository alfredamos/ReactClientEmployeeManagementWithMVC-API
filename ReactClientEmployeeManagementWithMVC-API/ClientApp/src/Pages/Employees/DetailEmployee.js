import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialEmployeeData = {
    fullName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    departmentID: '',
    dateOfBirth: '',
    photoPath: '',

}


export const DetailEmployee = (props) => {
    const [employee, setEmployee] = useState(initialEmployeeData);    
    const [isLoading, setIsLoading] = useState(false);

    const employeeApiUrl = `https://localhost:5001/api/employees/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(employeeApiUrl);
            const resultData = result.data;
            setEmployee(resultData);
            setIsLoading(true);
        };
        GetData();
    }, [employeeApiUrl]);

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteEmployee/${id}`
        });
    }


    const backToListHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: "/"
        });
    }


    const editHandler = async (id) => {
        console.log(id);
        console.log("Click me Edit");
        props.history.push({
            pathname: `/editEmployee/${id}`
        });
    }


    return (
        <>
            {
                isLoading &&
                <>
                    <div className="card m-3" style={{ minWidth: "18rem", maxWidth: "30.5%" }}>
                        <div className="card-header">
                            <h3>{employee.fullName}</h3>
                        </div>
                        <div className="card-body text-left">
                            <img className="card-img-top" src={employee.photoPath} alt="" />
                            <br />
                            <br/>
                            <h6><strong>Department</strong> : {employee.department.departmentName}</h6>
                            <h6><strong>Email Address</strong> : {employee.email}</h6>
                            <h6><strong>Phone Number</strong> : {employee.phoneNumber}</h6>
                            <h6><strong>Date of Birth</strong> : {employee.dateOfBirth.toString()}</h6>
                            <h6><strong>Gender</strong> : {employee.gender}</h6>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-primary m-1" onClick={backToListHandler} style={{ fontWeight: "bold" }}>Back</button>
                            <button className="btn btn-warning m-1" onClick={() => editHandler(employee.employeeID)} style={{ fontWeight: "bold" }}>Edit</button>
                            <button className="btn btn-danger m-1" onClick={() => deleteHandler(employee.employeeID)} style={{ fontWeight: "bold" }}> Delete</button >
                        </div >
                    </div >
                </>
            }
        </>
    );

}









