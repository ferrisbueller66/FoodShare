class Item{
    constructor(name, quantity, visit_id, visit){
    this.name = name
    this.quantity = quantity
    this.visit_id = visit_id
    this.visit = visit
    }


    static displayItems(){        //items index page
        clearForm()
        createItemForm
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

    renderItem(){
        main.innerHTML = `
        <div id="item-show-page">
            <h2>Item: ${this.name}</h2>
            <h3>Quantity: ${this.quantity}</h3>
            <h3>Deliver to: ${this.visit.food_pantry}</h3>
            <h3>Delivery Status: ${this.visit.completed ? "Delivered" : "Not Yet Delivered"} </h3> 
            <a href="#" class='delete-item-link' data-delete-item-id="${this.id}">  Delete Item</a>
            <a href="#" class="visit-li" data-visit-id="${this.visit.id}">See ${this.visit.food_pantry}</a>
        </div>
        `
        clickableLinks()
    }
    
}

function showItem(){        //visit show page
    let main = document.querySelector('#main')

    fetch(BASE_URL+`/items/${this.dataset.itemId}`)
	.then(response => response.json())
	.then(item => {
        let itemObject = new Item(item.name, item.quantity, item.visit_id, item.visit)
        itemObject.renderItem()
        
    })
    
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

function createItem(){                 //create Visit Action                      
    event.preventDefault();
    let item = new Item(document.getElementById('item-name').value, parseInt(document.getElementById('item-quantity').value), parseInt(document.getElementById('item-visit_id').value))

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
           
            clearItemForm()
        })
}

function deleteItem(){        //item delete action
    event.preventDefault();
    fetch(BASE_URL+`/items/${this.dataset.deleteItemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(this.parentElement.remove())
}

