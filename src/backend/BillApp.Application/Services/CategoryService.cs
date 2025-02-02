using AutoMapper;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Models.Category;
using BillApp.Application.Utilities;
using BillApp.Domain.Category;
using BillApp.Domain.Product;
using Microsoft.IdentityModel.Tokens;


namespace BillApp.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;


        public CategoryService(ICategoryRepository categoryRepository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<CategoryDto>> Create(CategoryDto dto)
        {
            if (dto == null)
                return new ServiceResponse<CategoryDto> { Data = null, Message = "Invalid Model", Success = false };

            var mappedModel = _mapper.Map<CategoryDto, Category>(dto);


            mappedModel.CreatedUser = _currentUserService.Username ?? "";

            var createdCategory = await _categoryRepository.CreateAsync(mappedModel);

            var mappedReturnModel = _mapper.Map<Category, CategoryDto>(createdCategory);

            return new ServiceResponse<CategoryDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Category created successfully."
            };
        }

        public async Task<ServiceResponse<CategoryDto>> Delete(Guid id)
        {
            if (id == Guid.Empty)
                return new ServiceResponse<CategoryDto> { Message = "Invalid Model", Success = false };

            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return new ServiceResponse<CategoryDto>
                {
                    Success = false,
                    Message = "Category not found."
                };
            }

            category.UpdatedUser = _currentUserService.Username ?? "";
            category.UpdatedDate = DateTime.UtcNow;


            var deletedCategory = await _categoryRepository.DeleteAsync(category);

            var mappedReturnModel = _mapper.Map<Category, CategoryDto>(deletedCategory);

            return new ServiceResponse<CategoryDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Category deleted (soft delete applied)."
            };
        }

        public async Task<ServiceResponse<IEnumerable<CategoryDto>>> GetAll()
        {
            var categories = await _categoryRepository.GetAllAsync();

            var mappedReturnModel = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDto>>(categories);
            return new ServiceResponse<IEnumerable<CategoryDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Categories retrieved successfully."
            };
        }

        public async Task<ServiceResponse<CategoryDto>> GetById(Guid id)
        {

            if (id == Guid.Empty)
                return new ServiceResponse<CategoryDto> { Message = "Invalid Model", Success = false };

            var category = await _categoryRepository.GetByIdAsync(id);

            if (category == null)
            {
                return new ServiceResponse<CategoryDto>
                {
                    Success = true,
                    Message = "Category not found."
                };
            }

            var mappedReturnModel = _mapper.Map<Category, CategoryDto>(category);

            return new ServiceResponse<CategoryDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Category retrieved successfully."
            };
        }

        public async Task<ServiceResponse<CategoryDto>> Update(CategoryDto dto)
        {

            if (dto == null)
                return new ServiceResponse<CategoryDto> { Message = "Invalid Model", Success = false };

            var category = await _categoryRepository.GetByIdAsync(dto.Id);

            if (category == null)
            {
                return new ServiceResponse<CategoryDto>
                {
                    Success = false,
                    Message = "Category not found."
                };
            }

            if (!dto.Name.IsNullOrEmpty())
                category.Name = dto.Name;
            if (!dto.CategoryCode.IsNullOrEmpty())
                category.CategoryCode = dto.CategoryCode;

            category.UpdatedUser = _currentUserService.Username ?? "";
            category.UpdatedDate = DateTime.UtcNow;

            var updatedCategory = await _categoryRepository.UpdateAsync(category);

            var mappedReturnModel = _mapper.Map<Category, CategoryDto>(updatedCategory);

            return new ServiceResponse<CategoryDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Category updated successfully."
            };
        }
    }

}
