using ReactClientEmployeeManagementWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientEmployeeManagementWithMVC_API.Data.Contracts
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Task<IEnumerable<HeadCount>> DeptSearcher(string searchKey = null);
    }
}
