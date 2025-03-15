//using System.Drawing;
//using System.Drawing.Printing;

using BillApp.Application.Contracts.Bill;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.IO;

namespace BillApp.Application.Services
{
    //public class PrintService
    //{
    //    private string _printerName;

    //    public PrintService(string printerName)
    //    {
    //        _printerName = printerName;
    //    }

    //    public void PrintInvoice(string invoiceText)
    //    {
    //        PrintDocument pd = new PrintDocument();
    //        pd.PrinterSettings.PrinterName = _printerName;
    //        pd.PrintPage += (sender, e) => PrintPageHandler(e, invoiceText);
    //        pd.Print();
    //    }

    //    private void PrintPageHandler(PrintPageEventArgs e, string invoiceText)
    //    {
    //        Font font = new Font("Arial", 12);
    //        Brush brush = Brushes.Black;
    //        float x = 100; // Yatay başlangıç noktası
    //        float y = 100; // Dikey başlangıç noktası

    //        e.Graphics.DrawString(invoiceText, font, brush, x, y);
    //    }
    //}


}
