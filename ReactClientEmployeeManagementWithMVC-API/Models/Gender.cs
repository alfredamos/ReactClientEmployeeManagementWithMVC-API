using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactClientEmployeeManagementWithMVC_API.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Gender
    {
        None,
        Female,
        Male
    }
}
