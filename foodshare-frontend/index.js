const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
    getVisits()
})


function getVisits(){
    clearForm()
    let main = document.querySelector('#main')
    main.innerHTML = ""

    fetch(BASE_URL+"/visits")
	.then(response => response.json())
	.then(visits => {
        main.innerHTML += visits.map(visit => `
            <li>
            ${visit.date}: <a href="#" data-id="${visit.id}">${visit.food_pantry}</a> 
                - ${visit.completed ? "Delivered" : "Not Yet Delivered"}
            </li>
        `).join("")
        attach
    })
}

function clearForm(){
    let createVisit = document.getElementById('createVisit')
    createVisit.innerHTML = ""
}

function attachClickToLinks(){
    let visits = document.querySelectorAll('li a')
    visits.forEach(visit =>{
        visit.addEventListener('click', displayVisit)
    })
    document.getElementById('visitForm').addEventListener('click', createVisitForm)
    document.getElementById('visits').addEventListener('click', displayVisits)      //define these functions
    document.getElementById('items').addEventListener('click', displayItems)        //define these functions
}


function displayVisit(){        //show page

}

function createVisitForm(){        //show page

}