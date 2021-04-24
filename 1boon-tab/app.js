const $tabs = document.querySelectorAll("li");

let selectedTab = $tabs[0];

function selectTab() {
    for (const $tab of $tabs) {
        $tab.addEventListener("click", (event)=>{
            activateTab(event.target.parentElement);
        });
    }
}

function activateTab(tab) {
    selectedTab.classList.remove("active");
    tab.classList.add("active");
    selectedTab = tab;
}

selectTab();