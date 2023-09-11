let myLead = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage
    render(myLead)
}
if (tabBtn) {
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        render(myLead)
     })
 })}

function render(Lead) { 
    let listItems = ""
    for (let i = 0; i < Lead.length; i++) {
        listItems += `
            <li>
                <a target=''_blank  href='${Lead[i]}'>
                    ${Lead[i]}
                </a>
            </li>
        `
    } 
    ulEl.innerHTML = listItems




deleteBtn.addEventListener("dblclick", function () {

    localStorage.clear
    myLead = []
    render(myLead)
})



inputBtn.addEventListener("clicked", function() {
    myLead.push(inputEl.value )
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))

    render(myLead)

    console.log(localStorage.getItem("myLead"))
   
})
 


}

