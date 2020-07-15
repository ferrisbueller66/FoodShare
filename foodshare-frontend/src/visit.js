

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


