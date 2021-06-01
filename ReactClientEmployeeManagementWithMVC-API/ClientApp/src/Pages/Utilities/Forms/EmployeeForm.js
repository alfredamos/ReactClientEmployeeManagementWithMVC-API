import React, {useState} from 'react';
import DatePicker from 'react-date-picker';
import "react-datetime/css/react-datetime.css";
import "react-dates/lib/css/_datepicker.css";



export const EmployeeForm = (props) => {    
    const { departments, backToListHandler, heading, imageSRC, upsertButton, onEmployeeChange, initialEmployeeData } = props;

    const [employee, setEmployee] = useState(initialEmployeeData);
    const [imageSrc, setImageSrc] = useState(imageSRC);


    const formSubmitHandler = (event) => {
        event.preventDefault();
        onEmployeeChange(employee);
    }


    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    }


    const inputDateChangeHandler = (date) => {             
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
        } else {
            setEmployee({ ...employee, photoPath: "" });          
        }

    }


    const ConvertBase64 = async (file) => { 
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
                        <DatePicker className="form-control"
                            selected={employee.dateOfBirth}
                            placeholderText="Select Date"
                            showPopperArrow={false}
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
                        <img src={imageSrc === "" ? imageSRC : imageSrc} style={{ height: "200px" }} alt="" />
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