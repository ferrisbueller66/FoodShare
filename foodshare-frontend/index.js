const BASE_URL = 'http://localhost:3000'
//import { deleteVisit } from "./src/visit.js";

window.addEventListener('load', () => {
    getVisits()
    
})

function clickableLinks(){
    let visits = document.querySelectorAll('.visit-li')
    visits.forEach(visit =>{
        visit.addEventListener('click', showVisit)
    })
    document.getElementById('newVisit').addEventListener('click', createVisitForm)
    document.getElementById('visits').addEventListener('click', getVisits)  
    document.getElementById('items').addEventListener('click', displayItems)
    let visitLinks = document.querySelectorAll('#itemsOl li ul li a')
    visitLinks.forEach(link => link.addEventListener('click', showVisit))
     
    
    let edits = document.getElementsByClassName('edit-visit-link')
    for (const element of edits) {
        element.addEventListener('click', editVisit)                            //define this functions
    }
      
    let deletes = document.getElementsByClassName('delete-visit-link')
    for (const element of deletes) {
        element.addEventListener('click', deleteVisit)                           //define this functions
    }
    
}


function clearPlaceHolderOnClick(textField){
    event.target.value = ""
}


function clearForm(){
    let createVisitForm = document.getElementById('createVisitForm')
    createVisitForm.innerHTML = ""
}



