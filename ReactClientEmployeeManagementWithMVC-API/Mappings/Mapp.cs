using AutoMapper;
using ReactClientEmployeeManagementWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientEmployeeManagementWithMVC_API.Mappings
{
    public class Mapp : Profile
    {
        public Mapp()
        {                     
            CreateMap<Department, Department>();
            CreateMap<Employee, Employee>();            
        }
    }
}
