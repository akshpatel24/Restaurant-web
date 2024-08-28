//display menu
let menu = document.getElementById('menu1')
let order = document.getElementById('orderNumber').value
let quantity = document.getElementById('orderQuantity').value
let table = document.createElement('table');




// get menu
function getMenuItems() {
    fetch('http://localhost:8083/menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        //this is meant to parse the data.
    }).then(response => {
        if (response.status === 200) {
            return response.json(); //this returns promise.
        } else {
            alert ('Failed to fetch menu');
        }
    }).then(data => {
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

//normal order food







let food_item_id;
let order_quantity;
let food_item_ids
let order_quantitys
//normal order food
function catering() {
     food_item_ids = document.getElementById('orderNumber').value.split(','); //(2,3) [2,3]
     order_quantitys = document.getElementById('orderQuantity').value.split(',');
    
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



