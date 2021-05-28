using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactClientEmployeeManagementWithMVC_API.Data.Contracts;
using ReactClientEmployeeManagementWithMVC_API.Models;

namespace ReactClientEmployeeManagementWithMVC_API.Controllers.Departments
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {        
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentsController(IDepartmentRepository departmentRepository)
        {            
            _departmentRepository = departmentRepository;
        }

        // GET: api/Departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            try
            {
                return Ok(await _departmentRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Departments/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            try
            {
                var department = await _departmentRepository.GetById(id);

                if (department == null)
                {
                    return NotFound($"Department with Id = {id} not found.");
                }

                return department;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
            
        }

        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Department>> PutDepartment(int id, Department department)
        {
            try
            {
                if (id != department.DepartmentID)
                {
                    return BadRequest("Id mismatch");
                }

                var departmentToUpdate = await _departmentRepository.GetById(id);

                if (departmentToUpdate == null)
                {
                    return NotFound($"Department with Id = {id} not found.");
                }

                return await _departmentRepository.UpdateEntity(department);

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }
           
        }

        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            try
            {
                if (department == null)
                {
                    return BadRequest("Invalid input");
                }

                var createdDepartment = await _departmentRepository.AddEntity(department);

                return CreatedAtAction(nameof(GetDepartment), new { id = createdDepartment.DepartmentID }, createdDepartment);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }

            
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            try
            {
                var departmentToDelete = await _departmentRepository.GetById(id);

                if (departmentToDelete == null)
                {
                    return NotFound($"Department with Id = {id} not found.");
                }

                return await _departmentRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }
           
        }

        // GET: api/Departments
        [HttpGet("search/{search}")]
        public async Task<ActionResult<IEnumerable<Department>>> Search(string search)
        {
            try
            {
                return Ok(await _departmentRepository.Search(search));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
