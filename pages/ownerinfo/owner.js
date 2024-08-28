//display menu
let menu = document.getElementById('menu1')


// it's preferable to get these values when you need them, typically within the function that uses them. This approach ensures you're always working with the current values in the input fields, r












function getMenuItems() {
    fetch('http://localhost:8083/menu', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        //this is meant to parse the data.
    }).then(response => {
        if (response.status ===200) {
            return response.json();
        } else {
            alert('Failed to fetch menu');
        }
    /**
     * Fetches the menu items from the server and displays them in a table.
     * 
     * This function is responsible for making a GET request to the '/menu' endpoint on the server,
     * and then rendering the returned menu items in a table element within the DOM.
     * 
     * The table is created dynamically and appended to the element with the ID 'menu1'.
     * Each row in the table represents a single menu item, with columns for the ID, food item name,
     * category, price, and quantity.
     */
    }).then(data => {
        if (data.status = 200) {
            let table = document.createElement('table');
            menu.innerHTML = ''
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
        }
    }).catch((error) => {
        console.log('Error:', error);
        alert(error.message || 'An unexpected error occurred.');
    });
}
getMenuItems();








function user() {
    let userlist = document.getElementById('userlist')

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
        }
    }).then(data => {
        let table2 = document.createElement('table');
    
        
        userlist.innerHTML = '' //this is the master copy of the table
        table2.innerHTML = `
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

            //  this uses query parameters
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
    if (food_item_id == '') {
        alert("Please enter food id.");
        return;
    }


    fetch(`http://localhost:8083/menu/reset_quantity/?food_item_id=${food_item_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

    })


        .then(response => {
            if (response.status === 200) {
                alert("Quantity reset successfully");
                getMenuItems();
            } else if (response.status === 422) {
                alert("Unable to reset. The quantity may not be 0 or the item doesn't exist.");
            } else {
                alert('Failed to reset quantity');
            }

        })
}


function additem() {
    // Get form values

    let food_item = document.getElementById('Foodname').value.trim();
    let price = document.getElementById('price').value.trim();
    let category = document.getElementById('foodCategory').value.trim();
    let quantity = document.getElementById('quantity').value.trim();
    // Validate inputs





    if (food_item === '' || price === '' || category === '' || quantity === '') {
        alert('All fields are required.');
        return;
    }
    if (quantity < 0) {
        alert("Quantity cannot be negative");
        return;
    }

    // Disable the button to prevent multiple clicks
    // Data to be sent to the server

    let userData = {
        food_item: food_item,
        price: price,
        category: category,
        quantity: quantity
    };

    // Check for duplicates before adding
    // If the item doesn't exist, proceed with adding it
    fetch('http://localhost:8083/menu/addfood', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.status === 200) {
                alert("Menu added successfully");
                getMenuItems(); // Refresh the menu items
                return response.json(); // Return the promise for JSON parsing
            } else {
                alert("Menu not added");
            }
        })
        .catch(error => {
            console.error("Error adding menu item:", error);
        })


}

// Example usage

function removemenuitem() {
    let food_item_ids = document.getElementById('foodid').value.split(',');
    //take foodid then convert into array so that way it can be used for multiple deletion


    for (let i = 0; i < food_item_ids.length; i++) {
        let food_item_id = food_item_ids[i].trim();
        fetch(`http://localhost:8083/menu/delete?food_item_id=${food_item_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

            .then(response => {
                if (response.status == 200) {
                    alert('Selected items have been deleted.');
                    // console.log(data)
                    getMenuItems()
                } else {
                    alert(`Failed to delete item with ID ${food_item_id}`);
                }
            })
            .catch((error) => {
                console.log('Error:', error);
                alert(error.message || 'An unexpected error occurred.');
            });
    }
}

function removeuseritem() {
    console.log("alert")
    
    let user_ids = document.getElementById('userid').value.split(',');
    if (!user_ids) {
        alert("Please enter user id.");
        return;
    }
    for (let i = 0; i < user_ids.length; i++) {
        let user_id = user_ids[i].trim();
        fetch(`http://localhost:8083/users/delete?user_id=${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
                if (response.status == 200) {
                    alert('Selected user has been deleted.');
                    // console.log(data)
                    user()
    }})
}

}






