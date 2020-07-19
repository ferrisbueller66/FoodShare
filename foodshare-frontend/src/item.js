class Item{
    constructor(name, quantity, visit_id){
    this.name = name
    this.quantity = quantity
    this.visit_id = visit_id
    }


    static displayItems(){        //items index page
        clearForm()
        let main = document.querySelector('#main')
        main.innerHTML = ""

        fetch(BASE_URL+"/items")
        .then(response => response.json())
        .then(main.innerHTML += `<h2> Here's a List of Items to Donate</h2> <ol id="itemsOl"></ol>`)
        .then(items => {
            items.forEach(item => {
                let li = `
                    <li id="itemLi-${item.id}">               
                    
                    <a href="#" class="item-li" data-item-id="${item.id}">${item.name}</a> 
                        <a href="#" class='edit-item-link' data-edit-item-id="${item.id}">  Edit</a> 
                        <a href="#" class='delete-item-link' data-delete-item-id="${item.id}">  Delete</a>
                        <ul>
                            <li> Quantity: ${item.quantity} </li>
                            <li id="itemVisit"> Going to: <a href="#" data-visit-id="${item.visit.id}">${item.visit.food_pantry}</a></li>
                        </ul>
                    </li>
                `
                document.querySelector("#itemsOl").innerHTML += li
            })
            
            clickableLinks()
        })
    }
}

function showItem(){        //visit show page
    let id = event.target.dataset.itemId                           //refractor out
    let main = document.querySelector('#main')

    fetch(BASE_URL+`/items/${id}`)
	.then(response => response.json())
	.then(item => {
        main.innerHTML = `
            <h2>Item: ${item.name}</h2>
            <h3>Quantity: ${item.quantity}</h3>
            <h3>Deliver to: ${item.visit.food_pantry}</h3>
            <h3>Delivery Status: ${item.visit.completed ? "Delivered" : "Not Yet Delivered"} </h3> 
            <a href="#" class='edit-item-link' data-edit-item-id="${item.id}">  Edit Item</a> 
            <a href="#" class='delete-item-link' data-delete-item-id="${item.id}">  Delete Item</a>
            <a href="#" class="visit-li" data-visit-id="${item.visit_id}">See ${item.visit.food_pantry}</a> 
        `
    })
    clickableLinks()
}

function createItemForm(){      
    let id = event.target.dataset.visitId
    let form = document.getElementById('createItemForm')
    let html = `
            <form>
                <label for="name">Enter the Item You Plan to Donate:</label><br><br>
                <input type="text" id="item-name" name="name" value="Type Item Here"><br><br>

                <label for="quantity">Enter the Quantity for This Item:</label><br><br>
                <input type="text" id="item-quantity" name="quantity" value="Type Quantity Here"><br><br>
                
                <input type="hidden" id="item-visit_id" name="visit_id" value="${id}"><br><br>

                <input type="submit" value="Submit">
                <br>
            </form> 
    `
    form.innerHTML = html
        let nameField = document.getElementById('item-name').addEventListener('click', clearPlaceHolderOnClick)
        let quantityField = document.getElementById('item-quantity')
        quantityField.addEventListener('click', clearPlaceHolderOnClick)
        document.querySelector("form").addEventListener('submit', createItem)
}

function createItem(){                 //create Visit Action                           //write class function here?
    event.preventDefault();
    let num1 = parseInt(document.getElementById('item-quantity').value)
    let num2 = parseInt(document.getElementById('item-visit_id').value)
    let item = new Item(document.getElementById('item-name').value, num1, num2)

    fetch(BASE_URL+"/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(item => {
            document.querySelector("#items-ol").innerHTML += `
            <li>
            <a href="#" class="item-li" data-item-id="${item.id}">${item.name}</a>  (${item.quantity}) 
            <a href="#" class='delete-item-link' data-delete-item-id="${item.id}">  Delete</a>
            </li>
            `
            clickableLinks()
            //why do I need to add back in the eventListeners?
            clearItemForm()
        })
}

function editItem(){        //item edit action
    event.preventDefault();
    console.log("edit click works, but function is not yet built out")
// //     event.preventDefault();
// //     let id = event.target.dataset.editId
// //     fetch(BASE_URL+`/visits/${id}`, {
// //         method: "GET",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Accept": "application/json"
// //         }
        
// //     })
// //         .then(response => response.json())
// //         .then(visit => {
// //             let createVisitForm = document.getElementById('createVisitForm')

// //             let html = `
// //                 <form data-id=${id}>
// //                     <label for="name">Edit the Organization ${visit.food_pantry} Below:</label><br><br>
// //                     <input type="text" id="food-pantry-name" name="food-pantry" value="${visit.food_pantry}"><br><br>

// //                     <label for="date">Edit the date of your next trip:</label><br><br>
// //                     <input type="date" id="food-pantry-date" name="date" value="${visit.date}" min="2015-01-01" max="2118-12-31"><br><br>
                    
// //                     <label for="completed">Is Visit Completed?</label>
// //                     <input type="checkbox" id="food-pantry-completed" name="completed" ${visit.completed ? "checked" : ""}><br><br>

// //                     <input type="submit" value="Submit">
// //                 </form> 
// //             `
// //             createVisitForm.innerHTML = html
// //                 let textField = document.getElementById('food-pantry-name')
// //                 textField.addEventListener('click', clearPlaceHolderOnClick)
// //                 document.querySelector("form").addEventListener('submit', updateVisit)
// //         })
}

// // function updateItem(){
// //     event.preventDefault();
// //     let id = event.target.dataset.id
// //     let visit = new Visit(document.getElementById('food-pantry-name').value, document.getElementById('food-pantry-date').value, document.getElementById('food-pantry-completed').checked)


// //     fetch(BASE_URL+`/visits/${id}`, {
// //         method: "PATCH",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Accept": "application/json"
// //         },
// //         body: JSON.stringify(visit)
// //     })
// //     .then(response => response.json())
// //     .then(visit => {
// //             document.querySelector(`li#visitLi-${visit.id}`).innerHTML =
// //            `
   
// //             ${visit.date}: <a href="#" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
// //             - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
// //             <a href="#" class='edit-visit-link' data-edit-id="${visit.id}">  Edit</a> 
// //             <a href="#" class='delete-visit-link' data-delete-id="${visit.id}">  Delete</a> 
// //                 <ol id="items-ol">   
// //                 </ol>
// //            `
// //            let ol = document.querySelector(`li#visitLi-${visit.id} #items-ol`)
// //             visit.items.forEach(item => ol.innerHTML += `<li>${item.name} (${item.quantity})</li>`)
// //             clickableLinks()
// //             //why do I need to add back in the eventListeners?
// //             clearForm()
// //     })
// // }

function deleteItem(){        //item delete action
    event.preventDefault();
    fetch(BASE_URL+`/items/${event.target.dataset.deleteItemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(event.target.parentElement.remove())
}

