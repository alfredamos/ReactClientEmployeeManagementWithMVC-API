using AutoMapper;
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
    public class SQLDepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SQLDepartmentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Department> AddEntity(Department newEntity)
        {
            var department = await _context.Departments.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return department.Entity;
        }

        public async Task<Department> DeleteEntity(int id)
        {
            var departmentToDeplete = await _context.Departments.FindAsync(id);

            if (departmentToDeplete != null)
            {
                _context.Departments.Remove(departmentToDeplete);
                await _context.SaveChangesAsync();
            }

            return departmentToDeplete;
        }

        public async Task<IEnumerable<Department>> GetAll()
        {
            return await _context.Departments.ToListAsync();
        }

        public async Task<Department> GetById(int id)
        {
            return await _context.Departments.FindAsync(id);
        }

        public async Task<IEnumerable<Department>> Search(string searchKey)
        {
            IQueryable<Department> query = _context.Departments;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await query.ToListAsync();
            }

            return await query.Where(x => x.DepartmentName.Contains(searchKey)).ToListAsync();
        }

        public async Task<Department> UpdateEntity(Department updatedEntity)
        {
            var result = await _context.Departments.FirstOrDefaultAsync(x => x.DepartmentID == updatedEntity.DepartmentID);

            _mapper.Map(updatedEntity, result);

            await _context.SaveChangesAsync();

            return result;
        }
    }
}
