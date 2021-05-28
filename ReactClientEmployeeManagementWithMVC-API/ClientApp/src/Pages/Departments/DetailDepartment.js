import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailDepartment = (props) => {
    const [department, setDepartment] = useState({ departmentName: '' });

    const apiUrl = `https://localhost:5001/api/departments/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setDepartment(result.data);
        };
        GetData();
    }, [apiUrl]);

    
    const backToListHandler = () => {
        props.history.replace({
            pathname: '/departmentList'
        });

    }


    const deleteHandler = async (id) => {
        props.history.push({
            pathname: `/deleteDepartment/${id}`
        });
    }


    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Department Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Department ID : </strong>{department.departmentID}</td>
                        </tr>
                        <tr>
                            <td><strong>Department Name : </strong>{department.departmentName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(department.departmentID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}