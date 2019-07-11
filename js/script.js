/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// GLOBAL VARIABLES
const listItem = document.getElementsByClassName("student-item"); // Grabs list of students from HTML
const itemsPerPage = 10;
const pageDiv = document.querySelector(".page");
const div = document.createElement('div'); // Creates DIV to hold UL
div.className = 'pagination';              // adds .pagination class to DIV
const ul = document.createElement('ul');   // An UL to hold pagination links

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
   pageDiv.appendChild(div);
   div.appendChild(ul);
   let i = 1;
   while (i <= pagesNeeded) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      a.href = '#';
      ul.appendChild(li);
      li.appendChild(a);

/*       The following is a condition that makes sure pagination link "1" receives appropriate styling
         on initial load since link would not have been clicked yet | Also calls showPage
         function to make sure student list displays */
      if (i === 1)   {
         a.className = 'active'; // If run only one <a> has been created | .active is added to it
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