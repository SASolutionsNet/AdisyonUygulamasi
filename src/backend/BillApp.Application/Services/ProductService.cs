using AutoMapper;
using BillApp.Application.Contracts.Product;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Utilities;
using BillApp.Domain.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace BillApp.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _productRepository = productRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<ProductDto>> Create(ProductDto dto)
        {
            if (dto == null)
                return new ServiceResponse<ProductDto> { Data = null, Message = "Invalid Model", Success = false };

            var mappedModel = _mapper.Map<ProductDto, Product>(dto);


            mappedModel.CreatedUser = _currentUserService.Username ?? "";

            var createdProduct = await _productRepository.CreateAsync(mappedModel);

            var mappedReturnModel = _mapper.Map<Product, ProductDto>(createdProduct);

            return new ServiceResponse<ProductDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Product created successfully."
            };
        }

        public async Task<ServiceResponse<ProductDto>> Delete(Guid id)
        {
            if (id == Guid.Empty)
                return new ServiceResponse<ProductDto> { Message = "Invalid Model", Success = false };

            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
            {
                return new ServiceResponse<ProductDto>
                {
                    Success = false,
                    Message = "Product not found."
                };
            }

            product.UpdatedUser = _currentUserService.Username ?? "";
            product.UpdatedDate = DateTime.UtcNow;

            var deletedProduct = await _productRepository.DeleteAsync(product);

            var mappedReturnModel = _mapper.Map<Product, ProductDto>(deletedProduct);

            return new ServiceResponse<ProductDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Product deleted (soft delete applied)."
            };
        }

        public async Task<ServiceResponse<IEnumerable<ProductDto>>> GetAll()
        {
            var products = await _productRepository.GetAllAsync();

            var mappedReturnModel = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDto>>(products);
            return new ServiceResponse<IEnumerable<ProductDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Products retrieved successfully."
            };
        }

        public async Task<ServiceResponse<ProductDto>> GetById(Guid id)
        {
            if (id == Guid.Empty)
                return new ServiceResponse<ProductDto> { Message = "Invalid Model", Success = false };

            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
            {
                return new ServiceResponse<ProductDto>
                {
                    Success = true,
                    Message = "Product not found."
                };
            }

            var mappedReturnModel = _mapper.Map<Product, ProductDto>(product);

            return new ServiceResponse<ProductDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Product retrieved successfully."
            };
        }

        public async Task<ServiceResponse<IEnumerable<ProductDto>>> GetFavoriteProducts()
        {
            var products = _productRepository.GetQueryable().Where(x => x.IsFavorite == true).ToListAsync();

            var mappedReturnModel = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDto>>(products.Result);
            return new ServiceResponse<IEnumerable<ProductDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Favorite products found"
            };
        }

        public async Task<ServiceResponse<ProductDto>> Update(ProductDto dto)
        {
            if (dto == null)
                return new ServiceResponse<ProductDto> { Message = "Invalid Model", Success = false };

            var product = await _productRepository.GetByIdAsync(dto.Id);

            if (product == null)
            {
                return new ServiceResponse<ProductDto>
                {
                    Success = false,
                    Message = "Product not found."
                };
            }

            if (!dto.Name.IsNullOrEmpty())
                product.Name = dto.Name;
            if (!dto.Price.Equals(product.Price))
                product.Price = dto.Price;
            if (!dto.CategoryId.Equals(Guid.Empty))
                product.CategoryId = dto.CategoryId;
            if (!dto.IsFavorite.Equals(product.IsFavorite))
                product.IsFavorite = dto.IsFavorite;
            product.UpdatedDate = DateTime.UtcNow;
            product.UpdatedUser = _currentUserService.Username ?? "";

            var updatedCategory = await _productRepository.UpdateAsync(product);

            var mappedReturnModel = _mapper.Map<Product, ProductDto>(updatedCategory);

            return new ServiceResponse<ProductDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Category updated successfully."
            };
        }
    }
}
