using BillApp.Application.Interfaces.Services;
using BillApp.Application.Utilities;
using BillApp.Domain.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Services
{
    public class CategoryService : ICategoryService
    {
        public Task<ServiceResponse<Category>> Create(Category dto)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<Category>> Delete(Category dto)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<Category>> GetAll(Category dto)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<Category>> GetById(Category dto)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<Category>> Update(Category dto)
        {
            throw new NotImplementedException();
        }
    }
}
