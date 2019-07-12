/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// Creates an element and gives it a property and value
const createElement = (tag, property, value) => {
   const element = document.createElement(tag);
   element[property] = value;
   return element;
}

// Appends up to three nested elements
const threeGenNest = (parent, child, grandchild1, grandchild2) => {
   parent.appendChild(child); 
   child.appendChild(grandchild1);
      if (grandchild2) {
         child.appendChild(grandchild2);
      }
}

// GLOBAL VARIABLES
const listItem = document.getElementsByClassName("student-item"); // Grabs list of students from HTML
const itemsPerPage = 10;
const pageDiv = document.querySelector(".page");
const div = createElement('div', 'className', 'pagination'); // Creates DIV w/ class of pagination 
                                                             // to hold UL
const ul = document.createElement('ul');   // A UL to hold pagination links

// Adds search bar
const pageHeaderDiv = document.querySelector('.page-header');
const searchDiv = createElement('div', 'className', "student-search"); // Creates DIV w/ class of sudent-search
                                                                       // to hold input and button
const input = createElement('input', 'type', 'text');
const button = createElement('button', 'textContent', 'Search Students');
threeGenNest(pageHeaderDiv, searchDiv, input, button)

// Function to hide/show list of students
const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = "";
      } else {
         list[i].style.display = "none";
      }
   } 
}

// Function to create pagination links and add functionality to them
const appendPageLinks = (list) => {
   const pagesNeeded = Math.ceil(list.length/itemsPerPage); // Determines number pagination links needed
   threeGenNest(pageDiv, div, ul);
   let i = 1;
   while (i <= pagesNeeded) {
      const li = document.createElement('li');
      const a = createElement('a', 'href', '#');
      a.textContent = i;
      threeGenNest(ul, li, a);
/*       The following is a condition that makes sure pagination link "1" receives appropriate styling
         on initial load since link would not have been clicked yet | Also calls showPage
         function to make sure student list displays */
      if (i === 1)   {
         a.className = 'active'; // .active is added to pagination link #1
         showPage(listItem, i);
      }
      i++; // Breaks while loop
   }
/*    // Listens for click on DIV and chngs pagination styling as 
      well as the list of students that are displayed */
   div.addEventListener('click', (e) => {
      const clickedLink = e.target;
      const active = document.querySelectorAll('.active');
         for (let i = 0; i < active.length; i++) {
            active[i].classList.remove('active'); // Remove class name: 'active' for all <a>'s
         }
      clickedLink.className = 'active'; // Adds class name: 'active' back to appropriate pagination link
      showPage(listItem, clickedLink.textContent);
   });
}

appendPageLinks(listItem);