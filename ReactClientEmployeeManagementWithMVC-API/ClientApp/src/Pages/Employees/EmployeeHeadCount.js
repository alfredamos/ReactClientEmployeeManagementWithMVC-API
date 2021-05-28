import React from 'react';



export const EmployeeHeadCount = (props) => {
    const { headCounts } = props;



    return (

        <table className="table table-striped, table-bordered">
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Head Count</th>
                </tr>
            </thead>
            <tbody>                
                {
                    headCounts.map(item => (

                        <tr key={item.department.departmentID}>
                            {
                                item.count > 0 &&
                               <>
                                    <td>{item.department.departmentName}</td>
                                    <td>{item.count}</td>    
                               </>
                            }
                        </tr>
                    ))}
            </tbody>
        </table>

    );
}