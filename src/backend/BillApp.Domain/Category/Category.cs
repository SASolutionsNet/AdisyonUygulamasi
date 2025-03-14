﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillApp.Domain.Category
{
    public class Category : BaseModel
    {
        public string CategoryCode { get; set; }
        public string Name { get; set; }
        public List<Product.Product>? Products { get; set; } = new();

    }
}
