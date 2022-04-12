
 function onSearchFromLanding(event){
    localStorage.setItem("searchedValue", event.target.value)
    window.location.href = `movies.html`
}