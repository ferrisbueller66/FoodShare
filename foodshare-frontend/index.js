const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    getVisits()
    
})

function getVisits(){
    //clearForm()
    let main = document.querySelector('#main')
    main.innerHTML = ""

    fetch(BASE_URL+"/visits")
	.then(response => response.json())
    .then(main.innerHTML += `<h2> Here's a List of your Visits</h2>`)
    .then(visits => {
        main.innerHTML += visits.map(visit => `
     
            <li>
            ${visit.date}: <a href="#" class="visit-li" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
                - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
                <a href="#" class='edit-visit-link' data-edit-id="${visit.id}">  Edit</a> 
                <a href="#" class='delete-visit-link' data-delete-id="${visit.id}">  Delete</a> 
            </li>
        `).join("")
        clickableLinks()
    })
}

function clickableLinks(){
    let visits = document.querySelectorAll('.visit-li')
    visits.forEach(visit =>{
        visit.addEventListener('click', displayVisit)
    })
    document.getElementById('newVisit').addEventListener('click', createVisitForm)
    document.getElementById('visits').addEventListener('click', getVisits)  
    document.getElementById('items').addEventListener('click', displayItems)        //define these functions
    
    let edits = document.getElementsByClassName('edit-visit-link')
    for (const element of edits) {
        element.addEventListener('click', editVisit)                            //define this functions
    }
      
    let deletes = document.getElementsByClassName('delete-visit-link')
    for (const element of deletes) {
        element.addEventListener('click', deleteVisit)                           //define this functions
    }
    
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

function clearPlaceHolderOnClick(textField){
    event.target.value = ""
}

function createVisit(){                 //create Visit Action
    event.preventDefault();
    const visit = {
        food_pantry: document.getElementById('food-pantry-name').value,
        date: document.getElementById('food-pantry-date').value,
        completed: document.getElementById('food-pantry-completed').checked
    }

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

function clearForm(){
    let createVisitForm = document.getElementById('createVisitForm')
    createVisitForm.innerHTML = ""
}

function displayVisit(){        //visit show page
    console.log(event.target.dataset.visitId)
    let id = event.target.dataset.visitId                           //refractor out
    let main = document.querySelector('#main')

    fetch(BASE_URL+`/visits/${id}`)
	.then(response => response.json())
	.then(visit => {
        visit

        main.innerHTML = `
    <h2>Visit Location: ${visit.food_pantry}</h2>
    <h3>Date Visited: ${visit.date}</h3>
    <h3>Food Delivered? ${visit.completed ? "Delivered" : "Not Yet Delivered"} </h3> 
    `
    })
}

function editVisit(){        //visit edit action
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

    const visit = {
        food_pantry: document.getElementById('food-pantry-name').value,
        date: document.getElementById('food-pantry-date').value,
        completed: document.getElementById('food-pantry-completed').checked
    }
    
    fetch(BASE_URL+`/visits/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(visit)
    })
            // .then(response => response.json())
            // .then(visit => {
    //         document.querySelector("#main").innerHTML += `
    //         <li>
    //         ${visit.date}: <a href="#" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
    //             - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
    //         </li>
    //         `
    //         clickableLinks()
    //         //why do I need to add back in the eventListeners?
    //         clearForm() 
    
    // const visit = {
    //     food_pantry: document.getElementById('food-pantry-name').value,
    //     date: document.getElementById('food-pantry-date').value,
    //     completed: document.getElementById('food-pantry-completed').checked
    // }

}

function deleteVisit(){        //visit delete action
    event.preventDefault();
    event.preventDefault
    fetch(BASE_URL+`/visits/${event.target.dataset.deleteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(event.target.parentElement.remove())
}


function displayItems(){        //items index page

}