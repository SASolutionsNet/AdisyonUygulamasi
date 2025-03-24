using AutoMapper;
using BillApp.Application.Contracts.Bill;
using BillApp.Application.Interfaces.IRepositories;
using BillApp.Application.Interfaces.IServices;
using BillApp.Application.Utilities;
using BillApp.Domain.Bill;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


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

            var createdBill = await _billRepository.CreateAsync(mappedModel);

            var mappedReturnModel = _mapper.Map<Bill, BillDto>(createdBill);

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


            var deletedBill = await _billRepository.DeleteAsync(bill);

            var mappedReturnModel = _mapper.Map<Bill, BillDto>(deletedBill);

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

        public async Task<ServiceResponse<IEnumerable<BillDto>>> GetAllOpenTables()
        {
            var bills = _billRepository.GetQueryable().Where(x => x.IsClosed == false).Include(p => p.Orders);

            var mappedReturnModel = _mapper.Map<IEnumerable<Bill>, IEnumerable<BillDto>>(bills);
            return new ServiceResponse<IEnumerable<BillDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Open tables retrieved successfully."
            };
        }

        public async Task<ServiceResponse<IEnumerable<BillDto>>> GetAllClosedTables()
        {
            var bills = _billRepository.GetQueryable().Where(x => x.IsClosed == true);

            var mappedReturnModel = _mapper.Map<IEnumerable<Bill>, IEnumerable<BillDto>>(bills);
            return new ServiceResponse<IEnumerable<BillDto>>
            {
                Data = mappedReturnModel,
                Success = true,
                Message = "Open tables retrieved successfully."
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
            if (!dto.TotalPrice.Equals(bill.TotalPrice))
                bill.TotalPrice = dto.TotalPrice;
            if (!dto.CashPaidTotalPrice.Equals(bill.CashPaidTotalPrice))
                bill.CashPaidTotalPrice = dto.CashPaidTotalPrice;
            if (!dto.CreditCardPaidTotalPrice.Equals(bill.CreditCardPaidTotalPrice))
                bill.CreditCardPaidTotalPrice = dto.CreditCardPaidTotalPrice;

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

        public byte[] GenerateInvoicePdf(BillDto bill)
        {
            using (var memoryStream = new MemoryStream())
            {
                var pageSize = new PageSize(226.77f, 566.93f); // 1mm ≈ 2.83f points

                // PDF oluştur
                using (var writer = new PdfWriter(memoryStream))
                {
                    using (var pdf = new PdfDocument(writer))
                    {
                        pdf.SetDefaultPageSize(pageSize);
                        var document = new Document(pdf);

                        // **Başlık**
                        document.Add(new Paragraph("HESAP")
                            .SetTextAlignment(TextAlignment.CENTER)
                            .SetBold()
                            .SetFontSize(14)
                            .SetMarginBottom(10));

                        // **Masa Bilgisi**
                        document.Add(new Paragraph($"Masa: {bill.Table}")
                            .SetBold()
                            .SetFontSize(12)
                            .SetMarginBottom(5));

                        // **Sipariş Listesi**
                        Table table = new Table(UnitValue.CreatePercentArray(new float[] { 70, 30 }))
                                           .UseAllAvailableWidth();
                        table.AddHeaderCell("Ürün");
                        table.AddHeaderCell("Adet");

                        foreach (var order in bill.Orders)
                        {
                            table.AddCell(order.Product.Name);
                            table.AddCell(order.Quantity.ToString());
                        }

                        document.Add(table);

                        // **Toplam Fiyat**
                        document.Add(new Paragraph($"\nToplam Fiyat: {bill.TotalPrice} ₺")
                            .SetBold()
                            .SetFontSize(12)
                            .SetMarginTop(10));

                        document.Close();
                    }
                }
                return memoryStream.ToArray();
            }
        }
    }
}
