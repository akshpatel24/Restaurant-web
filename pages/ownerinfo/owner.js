//display menu
let menu = document.getElementById('menu1')


let order = document.getElementById('orderNumber').value

let quantity = document.getElementById('orderQuantity').value

let userlist=document.getElementById('userlist')
let removeitem=document.getElementById('foodid').value

// getMenuItems();


function getMenuItems() {
    fetch('http://localhost:8083/menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        //this is meant to parse the data.
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Failed to fetch menu');
        }
    }).then(data => {
        let table = document.createElement('table');
        menu.innerHTML=''
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Food Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody> 
                       ${data.map(dish => `
                        <tr>
                        <td>${dish.id}</td>
                        <td>${dish.food_item}</td>
                        <td>${dish.category}</td>
                        <td>${dish.price}</td>
                        <td>${dish.quantity}</td>
                    </tr>
                `).join('')} 
            </tbody>
        `;
        menu.append(table)
    }).catch((error) => {
        console.log('Error:', error);
        alert(error.message || 'An unexpected error occurred.');
    });
}
getMenuItems();








function user()
{
    fetch('http://localhost:8083/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        //this is meant to parse the data.
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            alert('Failed to fetch userlist');
            return;
        }
    }).then(data => {
        let table2 = document.createElement('table');
        userlist.innerHTML='' //this is the master copy of the table
        table2.innerHTML = `//child table
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody> 
                       ${data.map(dish2 => `
                        <tr>
                        <td>${dish2.id}</td>
                        <td>${dish2.username}</td>
                        <td>${dish2.password}</td>
                        <td>${dish2.role}</td>
                
                    </tr>
                    
                `).join('')} 
            </tbody>
        `;

        userlist.append(table2)
    })



}
user();












let food_item_id;
let order_quantity;
//normal order food
function catering() {
    var food_item_ids = document.getElementById('orderNumber').value.split(','); //(2,3) [2,3]
    var order_quantitys = document.getElementById('orderQuantity').value.split(',');
    
    if (!food_item_ids || !order_quantitys) {
        alert("Please enter both order number and quantity.");
        return;
    }
    
    for (let i = 0; i < food_item_ids.length; i++) {
        food_item_id = food_item_ids[i].trim();
         order_quantity = order_quantitys[i].trim();
        
        if (!food_item_id || !order_quantity) {
            alert("Please enter both order number and quantity for all items.");
            return;
        }

        fetch(`http://localhost:8083/order?food_item_id=${food_item_id}&order_quantity=${order_quantity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(data => {
                if (data.status == 200) {
                    alert("Order will be there in fifteen minutes");
                    getMenuItems(); // Call function to refresh the menu items
                } else if (data.status === 422) {
                    alert("Unprocessable Entity: Check your input data.");
                } else {
                    alert(`Failed to place order for food item ID: ${food_item_id}`);
                }
            })
            
    }
    // -------------------------------- Owners api
    //
}
   
function resetQuantity() {
    let food_item_id = document.getElementById('orderID').value
    if (food_item_id=='') {
        alert("Please enter food id.");
        return;
    }
   
  
    fetch(`http://localhost:8083/menu/reset_quantity/?food_item_id=${food_item_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            
        })
       
        .then(data => { 
            if (data.status === 200) {
                alert("Quantity reset successfully");
                getMenuItems();
            } else if (data.status === 422) {
                alert("Unable to reset. The quantity may not be 0 or the item doesn't exist.");
            } else {
              alert('Failed to reset quantity');
            }
            
        })        
    }
               
    let userData = {};

    function additem()  {
            // let id = document.getElementById('foodId').value;
            
            let food_item = document.getElementById('Foodname').value;
            let price = document.getElementById('price').value;
            let category = document.getElementById('foodCategory').value;
            let quantity = document.getElementById('quantity').value;
        
            if (food_item == '' || price === '' || category === '' || quantity === '') {
                alert('All fields are required.');
                return;
            }
    
            
            let userData = {
                food_item: food_item,
                price: price,
                category: category,
                quantity:quantity
            };
        
        fetch('http://localhost:8083/menu/add', {        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include authorization header if needed
                // 'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userData)
        })
        .then(data => {
            if(data.status==200)
                console.log('Success:', data);
                alert('Menu item added successfully');
        })
        .then(response => {
            if (response.ok) {
                getMenuItems();
                return response.json();
            } else {
                alert('not ok to insert');
            }
        })
    
    }

    function removemenuitem() {
        let  food_item_ids = document.getElementById('foodid').value.split(',');        
        // if(!food_item_ids.trim())
        //     {
        //         alert("Enter again")
        //         return;
        //     }
        for (let i = 0; i < food_item_ids.length; i++) {
            let food_item_id = food_item_ids[i].trim();
            
            fetch(`http://localhost:8083/menu/delete?food_item_id=${food_item_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        
        
            .then(data => {
                if (data.status==200) {
                    alert(`Item with ID ${food_item_id} deleted successfully`);
                    getMenuItems()
                } else {
                    alert(`Failed to delete item with ID ${food_item_id}`);
                }
        
            })
       
       
        }    
        // Refresh the menu after all deletions
    }
    



// owner should reset quntity

    