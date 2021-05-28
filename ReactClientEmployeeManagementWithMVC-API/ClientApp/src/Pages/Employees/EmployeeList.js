import React, { useState, useEffect } from 'react';
import { EmployeeHeadCount } from './EmployeeHeadCount';
import { SearchItem } from '../Utilities/Helpers/SearchItem'
import axios from 'axios';


export const EmployeeList = (props) => {
    const [employees, setEmployees] = useState([]);
    const [headCounts, setHeadCounts] = useState([]);
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const employeeApiUrl = "https://localhost:5001/api/employees"

    const headCountApiUrl = "https://localhost:5001/api/employees/dello"

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(headCountApiUrl);
            setHeadCounts(result.data);            
        };
        GetData();
    }, [headCountApiUrl])



    useEffect(() => {
        const GetData = async () => {
            const result = await axios(employeeApiUrl);
            setEmployees(result.data);   
            setIsLoading(true);
        };
        GetData();
    }, []);



    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editEmployee/${id}`
        });

    }


    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteEmployee/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createEmployee'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailEmployee/${id}`
        });
    }


    const filterHandler = (event) => {
        const {value} = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();             
        if (filter !== "") {
            const searchApiUrl = `${employeeApiUrl}/search/${filter}`;  
            axios.get(searchApiUrl)
                .then(res => {
                    setEmployees(res.data)
                });
        } else {
            axios.get(employeeApiUrl)
                .then(res => {
                    setEmployees(res.data)
                });
        }
    }


    return (
        <>
            {
                isLoading &&
                <div className="border">                    
                    <div className="card-header text-center">
                        <h1>List of Employees</h1>
                    </div>
                    <div className="card-body">      
                        <br/>
                        <EmployeeHeadCount headCounts={headCounts} />
                        <br />
                        <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                        <br/>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Department</th>
                                    <th>Phone Number</th>
                                    <th>Email Address</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map(item => (
                                        <tr key={item.employeeID}>
                                            <td>{item.fullName}</td>
                                            <td>{item.department.departmentName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.email}</td>
                                            <td>{item.gender}</td>

                                            <td>
                                                <button
                                                    className="btn btn-primary m-1"
                                                    style={{ fontWeight: "bold" }}
                                                    onClick={() => detailHandler(item.employeeID)}>View
                                    </button>
                                                <button
                                                    className="btn btn-warning m-1"
                                                    style={{ fontWeight: "bold" }}
                                                    onClick={() => editHandler(item.employeeID)}>Edit
                                    </button>
                                                <button
                                                    className="btn btn-danger m-1"
                                                    style={{ fontWeight: "bold" }}
                                                    onClick={() => deleteHandler(item.employeeID)}>Delete
                                    </button>

                                            </td>
                                        </tr>
                                    ))}

                            </tbody>
                        </table >
                    </div >
                    <div className="card-footer">
                        <button className="btn btn-outline-dark btn-block" onClick={createHandler} style={{ fontWeight: "bold" }}>Create Employee</button>
                    </div>
                </div>

            }
        </>
    );
} 