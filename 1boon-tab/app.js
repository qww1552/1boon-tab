const $tabs = document.querySelectorAll("li");
const $list = document.getElementById("list");
const $loadButton = document.getElementById("load-more");
const $loadingMark = document.getElementById("loading-mark");

const tabName = {0: "recent", 1: "view", 2: "popular"};
let tabNumber = 0;
let selectedTab = $tabs[tabNumber];
const NUMBER_OF_CARD = 10;
let amountOfCard = NUMBER_OF_CARD;

window.onload = () => {
    displayPage();
    selectTab();
    $loadButton.addEventListener("click", () => {
        loadMorePage();
    });
}

function selectTab() {
    for (const $tab of $tabs) {
        $tab.addEventListener("click", (event) => {
            $list.innerHTML = "";
            tabNumber = activateTab(event.target.parentElement);
            amountOfCard=NUMBER_OF_CARD;
            displayPage();
        });
    }
}

function activateTab(tab) {
    selectedTab.classList.remove("active");
    tab.classList.add("active");
    selectedTab = tab;
    const tabNumber = Array.from($tabs).indexOf(tab);
    return tabNumber;
}

function loadData(name) {
    const xhr = new XMLHttpRequest();
    ////
    // 비동기로 전환
    ////
    xhr.open("GET", `./${name}.json`, false);
    xhr.send();
    return JSON.parse(xhr.responseText);
}

function drawCard(contents, pages) {
    let cardIndex = 0;
    const ul = document.createElement("ul");
    ul.classList.add("list_classify");
    for (const content of contents) {
        if (cardIndex >= pages) break;
        const li = document.createElement("li");
        const card = new Card(content);
        li.innerHTML = card.createDOM(++cardIndex);
        ul.append(li);
    }
    $list.innerHTML = "";
    $list.append(ul);
}

function loadMorePage() {
    amountOfCard+=NUMBER_OF_CARD;
    displayPage();
}

function makeLoadingMark() {
    return `<div class="text-center" id="loading-mark">
                <span class="glyphicon glyphicon-refresh">로딩중</span>
            </div>`
}

function displayPage() {
    $list.innerHTML += makeLoadingMark();
    setTimeout(()=>{
        const contents = loadData(tabName[tabNumber]);
        drawCard(contents, amountOfCard);
    },1000);
}

function Card(object) {
    this.id = object["id"];
    this.title = object["title"];
    this.img = object["img"];
    this.cp = object["cp"];
    this.url = object["url"];
    this.createDOM = (cardIndex) => {
        const card =
            `<a href="${this.url}" class="link_classify">
                <span class="wrap_thumb">
                    <span class="thumb_img">
                        <img src="${this.img}" class="img_thumb">
                    </span>
                </span>
                <div class="info_classify"><span class="emph_number">${cardIndex}</span>
                <strong class="tit_thumb">${this.title}</strong></div>
            </a>`;
        return card;
    };
}