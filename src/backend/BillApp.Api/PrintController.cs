//using BillApp.Application.Services;
//using Microsoft.AspNetCore.Mvc;

//namespace BillApp.Api
//{
//    //[Route("api/[controller]")]
//    //[ApiController]
//    //public class PrintController : ControllerBase
//    //{
//    //    private readonly PrintService _printService;

//    //    public PrintController()
//    //    {
//    //        _printService = new PrintService("Canon e414"); // Yazıcının adını gir
//    //    }

//    //    [HttpPost("print")]
//    //    public IActionResult PrintInvoice([FromBody] InvoiceDto invoice)
//    //    {
//    //        if (string.IsNullOrWhiteSpace(invoice.Content))
//    //        {
//    //            return BadRequest("Fatura içeriği boş olamaz.");
//    //        }

//    //        _printService.PrintInvoice(invoice.Content);
//    //        return Ok("Fatura yazdırıldı.");
//    //    }
//    //}

//    //public class InvoiceDto
//    //{
//    //    public string Content { get; set; }
//    //}
//    [Route("api/[controller]")]
//    [ApiController]
//    public class PrintController : ControllerBase
//    {
//        private readonly PrintService _printService;

//        public PrintController(PrintService printService)
//        {
//            _printService = printService;
//        }

//        [HttpPost("save-pdf")]
//        public IActionResult SaveInvoiceAsPdf([FromBody] InvoiceDto invoice)
//        {
//            // Fatura içeriği kontrolü
//            if (string.IsNullOrWhiteSpace(invoice.Content))
//            {
//                return BadRequest("Fatura içeriği boş olamaz.");
//            }

//            // PDF dosyasının kaydedileceği yol
//            string directoryPath = Directory.GetCurrentDirectory();
//            string filePath = Path.Combine(directoryPath, "fatura.pdf");

//            if (!Directory.Exists(directoryPath))
//            {
//                Directory.CreateDirectory(directoryPath); // Gerekirse dizini oluştur
//            }

      
//            try
//            {
//                // Fatura içeriği ile PDF kaydetme
//                _printService.SaveInvoiceAsPdf(invoice.Content, filePath);
//                return Ok(new { message = "Fatura PDF olarak kaydedildi", filePath });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, new { message = "PDF oluşturulurken bir hata oluştu", error = ex.Message });
//            }
//        }
//    }

//    // Fatura içeriği modelini temsil eden DTO
//    public class InvoiceDto
//    {
//        public string Content { get; set; }
//    }
//}
