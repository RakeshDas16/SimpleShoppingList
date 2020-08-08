using SimpleShoppingList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SimpleShoppingList.Controllers
{
    public class ItemController : ApiController
    {
        // GET: api/Item

        // POST: api/Item
        public IHttpActionResult Post([FromBody]Item item)
        {
            ShoppingList shopp = ShoppingListController.shoppingLists.Where(c => c.Id == item.ShoppingListId).FirstOrDefault();

            if(shopp ==null)
            {
                return NotFound();
            }
            item.Id = shopp.Items.Max(i => i.Id) + 1;
            shopp.Items.Add(item);

            return Ok(shopp);
        }

        // PUT: api/Item/5
        public IHttpActionResult Put(int id, [FromBody]Item item)
        {
            ShoppingList shopp = ShoppingListController.shoppingLists.Where(c => c.Id == item.ShoppingListId).FirstOrDefault();

            if (shopp == null)
            {
                return NotFound();
            }
            Item changedItem = shopp.Items.Where(i => i.Id == id).FirstOrDefault();

            if(changedItem==null)
            {
                return NotFound();
            }
            changedItem.Checked = item.Checked;

            return Ok(shopp);
        }

        // DELETE: api/Item/5
        public IHttpActionResult Delete(int id)
        {
            ShoppingList shopp = ShoppingListController.shoppingLists[0];

            Item item = shopp.Items.FirstOrDefault(i => i.Id == id);

            if(item==null)
            {
                return NotFound();

            }
            shopp.Items.Remove(item);

            return Ok(shopp);
        }
    }
}
