using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesApplication.WebAPI.Entities.Entities
{
    public class Post:BaseEntity
    {
        public string Title { get; set; }
        public string ImgURL { get; set; }
        public string Text { get; set; }
    }
}
