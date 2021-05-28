import React from 'react';
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";


export const EmployeeForm = (props) => {
    
    const { departments, employee, backToListHandler, formSubmitHandler, heading, inputChangeHandler,
        inputImageChangeHandler, imageSrc, upsertButton, inputDateChangeHandler, dateOfBirth } = props;


    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="fullName" className="form-control-label">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={employee.fullName}
                            placeholder="Full Name"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-control-label">Phone Number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={employee.phoneNumber}
                            placeholder="Phone Number"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-control-label">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={employee.email}
                            placeholder="Email Address"
                            className="form-control"
                            onChange={inputChangeHandler}
                        />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="gender" className="form-control-label">
                            Gender :
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={employee.gender}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="departmentID" className="form-control-label">
                            Department :
                        </label>
                        <select
                            id="departmentID"
                            name="departmentID"
                            value={employee.departmentID}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Department</option>
                            {
                                departments.map(department => (

                                    <option
                                        key={department.departmentID}
                                        value={department.departmentID}

                                    >
                                        {department.departmentName}
                                    </option>

                                ))}
                        </select>
                    </div>                         
                    <div className="form-group">
                        <label htmlFor="dateOfBirth" className="form-control-label">
                            Date of Birth:
                        </label>                        
                        <DatePicker
                            className="form-control"
                            selected={dateOfBirth}                                                      
                            showTimeSelect
                            dateFormat="MMMM d, yyyy"
                            onChange={inputDateChangeHandler}  
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">
                            Photo:
                        </label>
                        <input
                            type="file"
                            accept="image/*"                           
                            placeholder="Choose Photo"
                            onChange={inputImageChangeHandler}
                            className="form-control-file"
                        />
                        <img src={imageSrc} style={{ height: "200px" }} alt="" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{upsertButton}</strong></button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Employee List</strong></button>
            </div>
        </div>
    );
}