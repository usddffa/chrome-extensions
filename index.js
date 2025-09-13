// chrome://extensions

let myLeads = []
const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector('#ul-el')
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})


// tabBtn.addEventListener("click", async function(){
//     const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(myLeads);
// })

function render(leads) {
    let listItems = ''
    for (let i = 0; i < leads.length; i++) {
        //listItems += '<li>' + '<a href="' + myLeads[i] + '" target="_blank">' + myLeads[i] + '</a>' + '</li>'
        //use template string
            listItems += `
                <li>
                    <a href='${leads[i]}' target='_blank'>
                        ${leads[i]}
                    </a>
                </li>
            `
        // const li = document.createElement('li')
        // li.textContent = myLeads[i]
        // ulEl.append(li)
     console.log(listItems)
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener('click', function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    inputEl.value= ' '
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    localStorage.getItem("myLeads")

})
