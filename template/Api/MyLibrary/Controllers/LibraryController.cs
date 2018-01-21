using MyLibrary.Models;
using System.Web.Http;

namespace MyLibrary.Controllers
{
    [Authorize]
    [RoutePrefix("api/library")]
    public class LibraryController : ApiController
    {
        [HttpGet]
        public SummaryModel Summary()
        {
            var username = this.RequestContext.Principal.Identity.Name;
            
            var result = new SummaryModel
            {
                NumberOfAuthors = 8,
                NumberOfBooks = 21,
                NumberOfSeries = 4
            };
            return result;
        }
    }
}
