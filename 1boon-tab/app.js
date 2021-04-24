const $tabs = document.querySelectorAll("li");
const $list = document.getElementById("list");
const $loadButton = document.getElementById("load-more");

const tabName = {0:"recent",1:"view",2:"popular"};
let tabNumber=0;
let selectedTab = $tabs[tabNumber];
function selectTab() {
    for (const $tab of $tabs) {
        $tab.addEventListener("click", (event)=>{
            tabNumber = activateTab(event.target.parentElement);
            let contents = loadData(tabName[tabNumber]);
            drawPage(contents,10);
        });
    }
}
$loadButton.addEventListener("click",() => {
    loadMorePage();
});
function activateTab(tab) {
    selectedTab.classList.remove("active");
    tab.classList.add("active");
    selectedTab = tab;
    const tabNumber = Array.from($tabs).indexOf(tab);
    return tabNumber;
}

function loadData(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `./${name}.json`, false);
    xhr.send();
    console.log(xhr.responseText);
    return JSON.parse(xhr.responseText);
}

function drawPage(contents, pages) {
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
    let contents = loadData(tabName[tabNumber]);
    drawPage(contents,contents.length);
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
selectTab();