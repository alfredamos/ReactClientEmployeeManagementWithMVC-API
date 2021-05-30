import React, { useState, useEffect } from 'react';
import { SearchItem } from '../Utilities/Helpers/SearchItem'
import axios from 'axios';


export const DepartmentList = (props) => {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('');

    const apiUrl = "https://localhost:5001/api/departments";


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setDepartments(result.data);
            setIsLoading(true);
        };
        GetData();
    }, [apiUrl, isLoading]);



    const deleteHandler = (id) => {
        props.history.replace({
            pathname: `deleteDepartment/${id}`
        })
    }

    const detailHandler = (id) => {
        props.history.replace({
            pathname: `detailDepartment/${id}`
        })
    }

    const editHandler = (id) => {
        props.history.replace({
            pathname: `editDepartment/${id}`
        })
    }


    const createHandler = (id) => {
        props.history.replace({
            pathname: "createDepartment"
        })
    }


    const filterHandler = (event) => {
        const {value} = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        if (filter !== "") {
            const searchApiUrl = `${apiUrl}/search/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setDepartments(res.data)
                });
        } else {
            axios.get(apiUrl)
                .then(res => {
                    setDepartments(res.data)
                });
        }
    }


    return (
        <>
            {
                isLoading &&
                <div className="border">
                    <div className="card-header text-center">
                        <h3>List of Departments</h3>
                    </div>
                    <div className="card-body">
                        <br />
                        <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                        <br />
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Department ID</th>
                                    <th>Department Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departments.map(department => (
                                        <tr key={department.departmentID}>
                                            <td>{department.departmentID}</td>
                                            <td>{department.departmentName}</td>
                                            <td>
                                                <button className="btn btn-warning m-1" onClick={() => editHandler(department.departmentID)}><strong>Edit</strong></button>
                                                <button className="btn btn-danger m-1" onClick={() => deleteHandler(department.departmentID)}><strong>Delete</strong></button>
                                                <button className="btn btn-primary m-1" onClick={() => detailHandler(department.departmentID)}><strong>Detail</strong></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary btn-block" onClick={createHandler}><strong>Create Department</strong></button>
                    </div>
                </div>
            }
        </>
    );
}