import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDelete } from '../Utilities/Helpers/ConfirmDelete'
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

}


export const DeleteEmployee = (props) => {   
    const [employee, setEmployee] = useState(initialEmployeeData);    
    const [readyForRender, setReadyForRender] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const apiUrl = `https://localhost:5001/api/employees/${props.match.params.id}`;   


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setEmployee(result.data);
            setReadyForRender(true);
            setIsDelete(false);
        };
        GetData();
    }, [apiUrl]);


    const deleteClick = (event) => {
        event.preventDefault();
        setIsDelete(true);
    }


    const deleteHandler = (deleteConfirmed) =>{                
        if (deleteConfirmed) {
            axios.delete(apiUrl)  
                .then((result) => {                  
                    props.history.push('/')                    
                }); 
        }        
        props.history.replace({
            pathname: '/'
        });
        
    }


    return (
        <>
            <br />
            <br />
            {
                readyForRender &&
                <div className="content-section mt-5" style={{ width: '50%' }}>
                    <form >
                        <div className="border">
                            <div className="card-body">
                                <fieldset className="form-group">

                                    <legend className="border-bottom m-2">Delete Employee</legend>
                                    <h2>Are you sure you want to delete : "{employee.fullName}"?</h2>


                                </fieldset>
                            </div>
                            <div className="form-group card-footer">
                                <button className="btn btn-outline-danger m-2" type="button" onClick={deleteClick}><strong>Yes, Delete</strong></button>
                                <Link
                                    className="btn btn-outline-secondary"
                                    to="/"
                                >
                                    <strong>Cancel</strong>
                                </Link>
                            </div>
                        </div>
                        {
                            isDelete && <ConfirmDelete
                                ConfirmationMessage={`Are you sure you want to delete ${employee.fullName}?`}
                                ConfirmationTitle={"Delete Confirmation"}
                                deleteHandler={deleteHandler}
                            />
                        }
                    </form>
                </div>
            }
        </>
    );

}









