/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
//AIMING FOR EXCEEDS GRADE ON PROJECT>
/******************************************
  Global variable declaration.
*****************************************/
const listAll = document.querySelectorAll("ul li.student-item");
let page = 0;

/***********************************************
DOM element Creation, Pagination Div and Search.
************************************************/

// this function removes redundancy in creating elements.
function createElementFunc(element,property,value){
  const newElement= document.createElement(element);
      newElement[property]=value;
      return newElement;
};
// function creates all elements for search bar appenrs them and creates the div for pagination.
// the function also adds the event listeners to the button and search input.
const appendSearchBar = ()=>{
  let pageDiv= document.querySelector("div.page");
  let pageHeaderDiv= document.querySelector("div.page-header");
  let searchDiv= createElementFunc("div","className","student-search");
  let searchButton= createElementFunc("button","textContent","Search");
      searchButton.id="searchButton";
  let searchInput = createElementFunc("input","type","text");
      searchInput.id="searchInput";
      searchInput.placeholder= "Search for students...";

          searchDiv.appendChild(searchInput);
          searchDiv.appendChild(searchButton);
          pageHeaderDiv.appendChild(searchDiv);

// adding key up and on click event listeners to the button and search input.
// The search button is disabled if there isnt anything in the inputbox.
// if the user deletes all characters from the input it reverts to default page.
// I made the background color change if the text field is blank as well as the message when clicked, then reverted it back after 1.5 seconds.
// to provide visual feedback that there needs to be input in order to search.
    searchButton.addEventListener("click",(e)=>{
      paginationDiv.innerHTML="";
      if(e.target.tagName="BUTTON" && searchInput.value.length>0){
        let ul =document.querySelector("ul.student-list");
        searchNames(searchInput.value,listAll);
      }else if (searchInput.value.length==0) {
          searchInput.style.backgroundColor= "#FFB3AE";
          searchInput.placeholder = "Enter a valid Search";
          setTimeout(()=>{
            searchInput.style.backgroundColor= ""
            searchInput.placeholder = "Search for students..."
        },1500);
      }

    });
    searchInput.addEventListener("keyup",(e)=>{
      if(e.target.tagName="INPUT"){
      paginationDiv.innerHTML="";
        searchNames(searchInput.value,listAll);
      }
      if(searchInput.value==""){
        let headingText= document.querySelector("div.page-header h2");
        headingText.textContent="STUDENTS";
        showPage(listAll,0);

      }
    });
    let paginationDiv= createElementFunc("div","className","pagination");
    pageDiv.appendChild(paginationDiv);
};
appendSearchBar();

/******************************************
            Show page Function.
*****************************************/
// function sets display property to none for all students.
function hideAllStudents() {
  for(let student of listAll) {
    student.style.display = "none";
  }
}
// function shows students based on the input of page and the list provided.
function showPage(list,page){
  hideAllStudents();
  for (var i = 0; i < list.length; i++) {
    if(i >= page*10 && i < (page+1)*10){
      list[i].style.display="";
    }else{
      list[i].style.display="none";
    }
  }
};
/******************************************
    AppendPageLinks function.
*****************************************/
// this function dynamically adds pages and adds the active class to the currently clicked page.
//

const appendPageLinks = (list)=>{
  let paginationDiv= document.querySelector("div.pagination");
  let numOfPages = parseInt(Math.ceil(list.length/10));
  const pageList= document.createElement("ul","className","pageLink");
        paginationDiv.appendChild(pageList);
          for (var i = 0; i < numOfPages; i++) {
            let pageListLinks = document.createElement("li");
                pageList.appendChild(pageListLinks);
                pageListLinks.innerHTML = `<a href="#">${i+1}</a>`;
                  };
                  showPage(list,page);
              paginationDiv.addEventListener("click",(e)=>{
                let pageLinkList= document.querySelectorAll("a");
                for (var i = 0; i < pageLinkList.length; i++) {
                  pageLinkList[i].classList.remove("active");
                }
                if(e.target.tagName=="A"){
                  e.target.className="active";
                  page = parseInt(e.target.innerHTML)-1;
                  showPage(list,page);
                        }
            });
};

/******************************************
            Search Name Function.
*****************************************/
// this function set all elements to hidden and then based on search results it shows matching index elements.
// it also appends pages based on the list created by the search results.
// if no results are returned or in this case the array has 0 values in it. The heading text is changed.
// the heading is reset each time the button is clicked and the condition is checked again
function searchNames(inputSearch,list){
  const headingText= document.querySelector("div.page-header h2");
        headingText.textContent = "STUDENTS";
  const resultsList=[];
        for (var i = 0; i < list.length; i++) {
            list[i].style.display="none";
              if(inputSearch.length != 0 &&  list[i].textContent.toLowerCase().includes(inputSearch.toLowerCase() )){
                list[i].style.display="";
                resultsList.push(list[i]);
          }
    }
    if(resultsList.length==0){
      headingText.textContent="No Results Found";
    }
    appendPageLinks(resultsList);
  };


/******************************************
  Initial onload calls to create page 1 and page links.
*****************************************/
window.onload= appendPageLinks(listAll);
window.onload=()=>{
  for (var i = 0; i < listAll.length; i++) {
      if(i >= (page*10) && i< ((page+1)*10)){
        listAll[i].style.display="";
          }else{
          listAll[i].style.display="none";
          }
      }
};
