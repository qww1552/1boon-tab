const $tabs = document.querySelectorAll("li");

let selectedTab = $tabs[0];

function selectTab() {
    for (const $tab of $tabs) {
        $tab.addEventListener("click", (event)=>{
            activateTab(event.target.parentElement);
            loadData();
        });
    }
}

function activateTab(tab) {
    selectedTab.classList.remove("active");
    tab.classList.add("active");
    selectedTab = tab;
}

function loadData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", './recent.json', false);
    xhr.send();
    console.log(xhr.responseText);
    return JSON.parse(xhr.responseText);
}

selectTab();