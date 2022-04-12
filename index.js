
 function onSearchFromLanding(event){
    localStorage.setItem("searchedValue", event.target.value)
    window.location.href = `${window.location.origin}/movies.html`
}