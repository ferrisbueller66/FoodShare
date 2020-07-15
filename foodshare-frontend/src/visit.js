class Visit{
    constructor(food_pantry, date, completed){
    this.food_pantry = food_pantry
    this.date = date
    this.completed = completed
    }
}

function getVisits(){
    clearForm()
    let main = document.querySelector('#main')
    main.innerHTML = ""

    fetch(BASE_URL+"/visits")
	.then(response => response.json())
    .then(main.innerHTML += `<h2> Here's a List of your Visits</h2>`)
    .then(visits => {
        visits.forEach(visit => {
            let li = `
                <li id="visitLi-${visit.id}">               
                
                ${visit.date}: <a href="#" class="visit-li" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
                     ${visit.completed ? "(Delivery Status: Delivered)" : "(Delivery Status: Not Yet Delivered)"}
                    <a href="#" class='edit-visit-link' data-edit-id="${visit.id}">  Edit</a> 
                    <a href="#" class='delete-visit-link' data-delete-id="${visit.id}">  Delete</a> 
                        <ol id="items-ol"> <strong>Items to Deliver</strong>
                        
                        </ol>
                </li>
            `
            main.innerHTML += li
            let ol = document.querySelector(`li#visitLi-${visit.id} #items-ol`)
            visit.items.forEach(item => ol.innerHTML += `<li><a href="#" class="item-li" data-item-id="${item.id}">${item.name}</a>  (${item.quantity})</li>`)
            
        })
        clickableLinks()
    })
}

function showVisit(){        //visit show page
    console.log(event.target.dataset.visitId)
    let id = event.target.dataset.visitId                           //refractor out
    let main = document.querySelector('#main')

    fetch(BASE_URL+`/visits/${id}`)
	.then(response => response.json())
	.then(visit => {
        main.innerHTML = `
            <h2>Visit Location: ${visit.food_pantry}</h2>
            <h3>Date Visited: ${visit.date}</h3>
            <ol id="items-ol"><strong>Items to Deliver</strong>
                
            </ol>
            <h3>Delivery Status: ${visit.completed ? "Delivered" : "Not Yet Delivered"} </h3> 
        `

        let ol = document.querySelector(`#items-ol`)
        visit.items.forEach(item => ol.innerHTML += `<li>${item.name} (${item.quantity})
            <a href="#" class='edit-item-link' data-edit-item-id="${item.id}">  Edit</a> 
            <a href="#" class='delete-item-link' data-delete-item-id="${item.id}">  Delete</a>
            </li>
        `)
        clickableLinks()
    })
}

function createVisitForm(){        
    let createVisitForm = document.getElementById('createVisitForm')
    let html = `
            <form>
                <label for="name">Enter the next Food Pantry you plan to donate:</label><br><br>
                <input type="text" id="food-pantry-name" name="food-pantry" value="Type Food Pantry Here"><br><br>

                <label for="date">Enter the date of your next trip:</label><br><br>
                <input type="date" id="food-pantry-date" name="date" min="2015-01-01" max="2118-12-31"><br><br>
                
                <label for="completed">Is Visit Completed?</label>
                <input type="checkbox" id="food-pantry-completed" name="completed" ><br><br>

                <input type="submit" value="Submit">
            </form> 
    `
    createVisitForm.innerHTML = html
        let textField = document.getElementById('food-pantry-name')
        textField.addEventListener('click', clearPlaceHolderOnClick)
        document.querySelector("form").addEventListener('submit', createVisit)
}

function createVisit(){                 //create Visit Action                           //write class function here?
    event.preventDefault();
    let visit = new Visit(document.getElementById('food-pantry-name').value, document.getElementById('food-pantry-date').value, document.getElementById('food-pantry-completed').checked)

    fetch(BASE_URL+"/visits", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(visit)
    })
        .then(response => response.json())
        .then(visit => {
            document.querySelector("#main").innerHTML += `
            <li>
            ${visit.date}: <a href="#" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
                - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
                <a href="#" class='edit-visit-link' data-edit-id="${visit.id}">  Edit</a> 
                <a href="#" class='delete-visit-link' data-delete-id="${visit.id}">  Delete</a> 
            </li>
            `
            clickableLinks()
            //why do I need to add back in the eventListeners?
            clearForm()
        })
}

function editVisit(){        //visit edit action
    clearForm()
    event.preventDefault();
    let id = event.target.dataset.editId
    fetch(BASE_URL+`/visits/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
    })
        .then(response => response.json())
        .then(visit => {
            let createVisitForm = document.getElementById('createVisitForm')

            let html = `
                <form data-id=${id}>
                    <label for="name">Edit the Organization ${visit.food_pantry} Below:</label><br><br>
                    <input type="text" id="food-pantry-name" name="food-pantry" value="${visit.food_pantry}"><br><br>

                    <label for="date">Edit the date of your next trip:</label><br><br>
                    <input type="date" id="food-pantry-date" name="date" value="${visit.date}" min="2015-01-01" max="2118-12-31"><br><br>
                    
                    <label for="completed">Is Visit Completed?</label>
                    <input type="checkbox" id="food-pantry-completed" name="completed" ${visit.completed ? "checked" : ""}><br><br>

                    <input type="submit" value="Submit">
                </form> 
            `
            createVisitForm.innerHTML = html
                let textField = document.getElementById('food-pantry-name')
                textField.addEventListener('click', clearPlaceHolderOnClick)
                document.querySelector("form").addEventListener('submit', updateVisit)
        })
}

function updateVisit(){
    event.preventDefault();
    let id = event.target.dataset.id
    let visit = new Visit(document.getElementById('food-pantry-name').value, document.getElementById('food-pantry-date').value, document.getElementById('food-pantry-completed').checked)


    fetch(BASE_URL+`/visits/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(visit)
    })
    .then(response => response.json())
    .then(visit => {
            document.querySelector(`li#visitLi-${visit.id}`).innerHTML =
           `
   
            ${visit.date}: <a href="#" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
            - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
            <a href="#" class='edit-visit-link' data-edit-id="${visit.id}">  Edit</a> 
            <a href="#" class='delete-visit-link' data-delete-id="${visit.id}">  Delete</a> 
                <ol id="items-ol">   
                </ol>
           `
           let ol = document.querySelector(`li#visitLi-${visit.id} #items-ol`)
            visit.items.forEach(item => ol.innerHTML += `<li>${item.name} (${item.quantity})</li>`)
            clickableLinks()
            clearForm()
    })
}

function deleteVisit(){        //visit delete action
    clearForm()
    event.preventDefault();
    let id = event.target.dataset.deleteId
        fetch(BASE_URL+`/visits/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(event.target.parentElement.remove())
}