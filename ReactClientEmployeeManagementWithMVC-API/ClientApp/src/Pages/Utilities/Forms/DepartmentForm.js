import React from 'react'


export const DepartmentForm = (props) => {
    const { department, formSubmitHandler, inputFormHandler, backToListHandler, upsertButton, heading } = props;
    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="departmentName" className="form-control-label">Department Name</label>
                        <input
                            type="text"
                            id="departmentName"
                            name="departmentName"
                            value={department.departmentName}
                            placeholder="Department Name"
                            className="form-control"
                            onChange={inputFormHandler}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{upsertButton}</strong></button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Department List</strong></button>
            </div>
        </div>
    );
}