using Microsoft.EntityFrameworkCore;
using ReactClientEmployeeManagementWithMVC_API.Data;
using ReactClientEmployeeManagementWithMVC_API.Data.Contracts;
using ReactClientEmployeeManagementWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientEmployeeManagementWithMVC_API.SQL
{
    public class SQLEmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLEmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Employee> AddEntity(Employee newEntity)
        {
            var employee = await _context.Employees.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return employee.Entity;
        }

        public async Task<Employee> DeleteEntity(int id)
        {
            var employeeToDeplete = await _context.Employees.FindAsync(id);

            if (employeeToDeplete != null)
            {
                _context.Employees.Remove(employeeToDeplete);
                await _context.SaveChangesAsync();
            }

            return employeeToDeplete;
        }

        public async Task<IEnumerable<Employee>> GetAll()
        {
            return await _context.Employees.Include(x => x.Department)
                                 .ToListAsync();
        }

        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.Include(x => x.Department)
                                 .FirstOrDefaultAsync(x => x.EmployeeID == id);
        }

        public async Task<IEnumerable<Employee>> Search(string searchKey)
        {
            IQueryable<Employee> employees = _context.Employees.Include(x => x.Department);
            


            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await employees.ToListAsync();
            }

            return await employees.Where(x => x.Department.DepartmentName.Contains(searchKey) ||
                         x.Email.Contains(searchKey) || x.FullName.Contains(searchKey) ||
                         x.PhoneNumber.Contains(searchKey)).ToListAsync();
        }

        public async Task<IEnumerable<HeadCount>> DeptSearcher(string searchKey = null)
        {
            return await DeptSearcherHelper(searchKey);
        }

        private async Task<IEnumerable<HeadCount>> DeptSearcherHelper(string searchKey = null)
        {
            var headCounts = new List<HeadCount>();

            var employees = await _context.Employees.Include(x => x.Department)
                                                 .ToListAsync();
            var GroupByDepartments = !string.IsNullOrWhiteSpace(searchKey) ? employees
                                     .Where(x => x.Department.DepartmentName.Contains(searchKey))
                                     .GroupBy(x => x.Department)
                                     .Select(g => new { Department = g.Key, Count = g.Count() }) :
                                      employees
                                     .GroupBy(x => x.Department)
                                     .Select(g => new { Department = g.Key, Count = g.Count() });

            foreach (var group in GroupByDepartments)
            {
                var headCount = new HeadCount
                {
                    Department = group.Department,
                    Count = group.Count
                };
                headCounts.Add(headCount);
            }

            return headCounts;
        }

        public async Task<Employee> UpdateEntity(Employee updatedEntity)
        {
            var result = _context.Employees.Attach(updatedEntity);
            result.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return updatedEntity;
        }

    }
}
