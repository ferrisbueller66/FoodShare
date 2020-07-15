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
     
    
    let editVisits = document.getElementsByClassName('edit-visit-link')
    for (const element of editVisits) {
        element.addEventListener('click', editVisit)                            
    }
      
    let deleteVisits = document.getElementsByClassName('delete-visit-link')
    for (const element of deleteVisits) {
        element.addEventListener('click', deleteVisit)                           
    }

    let editItems = document.getElementsByClassName('edit-item-link')
    for (const element of t) {
        element.addEventListener('click', editItem)                            //define this functions
    }
      
    let deleteItems = document.getElementsByClassName('delete-item-link')
    for (const element of deleteItems) {
        element.addEventListener('click', deleteItem)                           //define this functions
    }
    
}


function clearPlaceHolderOnClick(textField){
    event.target.value = ""
}


function clearForm(){
    let createVisitForm = document.getElementById('createVisitForm')
    createVisitForm.innerHTML = ""
}



