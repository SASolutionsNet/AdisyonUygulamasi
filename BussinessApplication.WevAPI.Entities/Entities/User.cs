using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesApplication.WebAPI.Entities.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfilePicURL { get; set; }


        public string Job { get; set; }
        public string Title { get; set; }
        
        public string Adress { get; set; }
       
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string PostalCode { get; set; }

        public string Instagram { get; set; }
        public string Facebook { get; set; }
        public string Linkedln { get; set; }

        public string UniversityName { get; set; }
        public int GraduatedYear { get; set; }
    }
}
