﻿using AutoMapper;
using BillApp.Application.Contracts.Bill;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Models.Category;
using BillApp.Application.Utilities;
using BillApp.Domain.Bill;
using BillApp.Domain.Category;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Application.Services
{
    public class BillService : IBillService
    {
        private readonly IBillRepository _billRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public BillService(IBillRepository repository, ICurrentUserService currentUserService, IMapper mapper)
        {
            _billRepository = repository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<BillDto>> Create(BillDto dto)
        {
            if (dto == null)
                return new ServiceResponse<BillDto> { Data = null, Message = "Invalid Model", Success = false };

            var mappedModel = _mapper.Map<BillDto, Bill>(dto);


            mappedModel.CreatedUser = _currentUserService.Username ?? "";

            var createdCategory = await _billRepository.CreateAsync(mappedModel);

            var mappedReturnModel = _mapper.Map<Bill, BillDto>(mappedModel);

            return new ServiceResponse<BillDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Bill created successfully."
            };
        }
        public async Task<ServiceResponse<BillDto>> Delete(Guid id)
        {
            if (id == Guid.Empty)
                return new ServiceResponse<BillDto> { Message = "Invalid Model", Success = false };

            var bill = await _billRepository.GetByIdAsync(id);

            if (bill == null)
            {
                return new ServiceResponse<BillDto>
                {
                    Success = false,
                    Message = "Bill not found."
                };
            }

            bill.UpdatedUser = _currentUserService.Username ?? "";
            bill.UpdatedDate = DateTime.UtcNow;


            var deletedCategory = await _billRepository.DeleteAsync(bill);

            var mappedReturnModel = _mapper.Map<Bill, BillDto>(deletedCategory);

            return new ServiceResponse<BillDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Bill deleted (soft delete applied)."
            };
        }
        public async Task<ServiceResponse<IEnumerable<BillDto>>> GetAll()
        {
            var bills = await _billRepository.GetAllAsync();

            var mappedReturnModel = _mapper.Map<IEnumerable<Bill>, IEnumerable<BillDto>>(bills);
            return new ServiceResponse<IEnumerable<BillDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Bills retrieved successfully."
            };
        }

        public async Task<ServiceResponse<BillDto>> GetById(Guid id)
        {

            if (id == Guid.Empty)
                return new ServiceResponse<BillDto> { Message = "Invalid Model", Success = false };

            var bill = await _billRepository.GetByIdAsync(id);

            if (bill == null)
            {
                return new ServiceResponse<BillDto>
                {
                    Success = true,
                    Message = "Bill not found."
                };
            }

            var mappedReturnModel = _mapper.Map<Bill, BillDto>(bill);

            return new ServiceResponse<BillDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Bill retrieved successfully."
            };
        }

        public async Task<ServiceResponse<BillDto>> Update(BillDto dto)
        {

            if (dto == null)
                return new ServiceResponse<BillDto> { Message = "Invalid Model", Success = false };

            var bill = await _billRepository.GetByIdAsync(dto.Id);

            if (bill == null)
            {
                return new ServiceResponse<BillDto>
                {
                    Success = false,
                    Message = "Bill not found."
                };
            }

            if (!dto.Table.IsNullOrEmpty())
                bill.Table = dto.Table;
            if (!dto.IsClosed.Equals(bill.IsClosed))
                bill.IsClosed = dto.IsClosed;

            bill.UpdatedUser = _currentUserService.Username ?? "";
            bill.UpdatedDate = DateTime.UtcNow;

            var updatedBill = await _billRepository.UpdateAsync(bill);

            var mappedReturnModel = _mapper.Map<Bill, BillDto>(updatedBill);

            return new ServiceResponse<BillDto>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Bill updated successfully."
            };
        }
    }
}
