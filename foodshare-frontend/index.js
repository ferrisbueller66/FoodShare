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
	.then(visits => {
        main.innerHTML += visits.map(visit => `
            <li>
            ${visit.date}: <a href="#" data-visit-id="${visit.id}">${visit.food_pantry}</a> 
                - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
            </li>
        `).join("")
        clickableLinks()
    })
}

function clickableLinks(){
    let visits = document.querySelectorAll('li a')
    visits.forEach(visit =>{
        visit.addEventListener('click', displayVisit)
    })
    document.getElementById('newVisit').addEventListener('click', createVisitForm)
    document.getElementById('visits').addEventListener('click', getVisits)      //define these functions
    document.getElementById('items').addEventListener('click', displayItems)        //define these functions
}

function displayVisit(){        //visit show page

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
    document.querySelector("form").addEventListener('submit', createVisit)
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
            </li>
            `
            clearForm()
        })
}






function clearForm(){
    let createVisitForm = document.getElementById('createVisitForm')
    createVisitForm = ""
}

function displayItems(){        //items index page

}