/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Name: Brandon White
Date of Last Modification: 30/07/2019
******************************************/

document.addEventListener('DOMContentLoaded', () => {
   // ↓ Function creates an element and gives it a property and value
   const createElement = (tag, property, value) => {
      const element = document.createElement(tag);
      element[property] = value;
      return element;
   }

   // Function appends up to three nested elements
   const threeGenNest = (parent, child, grandchild1, grandchild2) => {
      parent.appendChild(child); 
      child.appendChild(grandchild1);
         if (grandchild2) {
            child.appendChild(grandchild2);
         }
   }

   /* ==================================================
      ================ GLOBAL VARIABLES ================
      ================================================== */

   const listItem = document.getElementsByClassName("student-item"); // ← Grabs list of students from HTML
   const itemsPerPage = 10;
   const pageDiv = document.querySelector(".page"); // ← Wraps page header and unordered student list
   const div = createElement('div', 'className', 'pagination'); // ← Creates div w/ class of pagination 
   const ul = document.createElement('ul');   // Creates a ul to hold pagination links
   const studentList = document.querySelector('.student-list'); // ← Grabs ul that holds student list
   let matchList = []; // An empty array to hold search matches
   const listDifferential = studentList.children.length - matchList.length; 
   // ↑ Ref number (the original number of students in list)
   const studentNames = document.querySelectorAll('.student-details h3'); // ← Grabs all students' names

   // ↓ The following adds a search bar to the page
   const pageHeaderDiv = document.querySelector('.page-header');
   const searchDiv = createElement('div', 'className', "student-search"); // ← Creates div to hold seach bar
   const input = createElement('input', 'type', 'text'); // ← Search bar
   const button = createElement('button', 'textContent', 'Search Students');
   threeGenNest(pageHeaderDiv, searchDiv, input, button)

   // ↓ Function to hide/show list of students
   const showPage = (list, page) => {
      const startIndex = (page * itemsPerPage) - itemsPerPage; // ← ex. if page = 2, startIndex = 10
      const endIndex = page * itemsPerPage; // ← ex. if page = 2, endIndex = 20
      if (list === matchList) {
         // ↓ No matter what, all the original students are hidden so that students will
         // display on page in an order that's primarily alphabetical
         for (let i = 0; i < studentList.children.length; i++) {
            if (i >= startIndex + listDifferential && i < endIndex + listDifferential) {
               studentList.children[i].style.display = "";
            } else {
               studentList.children[i].style.display = "none";
            }
         }
      } else {
         for (let i = 0; i < list.length; i++) {
            if (i >= startIndex && i < endIndex) {
               list[i].style.display = "";
            } else {
               list[i].style.display = "none";
            }
         } 
      }

   }

   // Function to create pagination links and add functionality to them
   const appendPageLinks = (list) => {
      const pagesNeeded = Math.ceil(list.length/itemsPerPage); // Determines number pagination links needed
      threeGenNest(pageDiv, div, ul);
      let i = 1;
      while (i <= pagesNeeded) {
         const li = document.createElement('li'); // ← Creates pagination links
         const a = createElement('a', 'href', '#');
         a.textContent = i;
         threeGenNest(ul, li, a); // ← Appends pagination links to page
         /* ↓ The following is a condition that makes sure pagination link "1" receives appropriate 
            styling on initial load since link would not have been clicked yet | Also calls showPage
            function to make sure student list displays */
         if (i === 1)   {
            a.className = 'active'; // .active is added to pagination link #1
            showPage(list, i);
         }
         i++; // Breaks while loop
      }
         /* ↓ Listens for click on DIV and changes pagination styling as 
            well as the list of students that are displayed */
      div.addEventListener('click', (e) => {
         e.preventDefault;
         const clickedLink = e.target;
         const active = document.querySelectorAll('.active');
            for (let i = 0; i < active.length; i++) {
               active[i].classList.remove('active'); // Remove class name: 'active' for all <a>'s
            }
         clickedLink.className = 'active'; // Adds class name: 'active' back to appropriate pagination link
         if (input.value.length > 0) {
            showPage(matchList, clickedLink.textContent);
         } else {
            showPage(listItem, clickedLink.textContent);
         }
      });
   }

   const searchFilter = () => {
      Event.preventDefault;
      const searchString = input.value.toUpperCase(); // Stores value of search bar after event trigger
      // ↓ Grabs all of the current pagination links to be deleted
      const pageAnchors = document.querySelectorAll('.pagination ul li a');

      /* ================= START OF =======================
         ================= PAGE RESET ===================== */

      // ↓ Removes "NO MATCHES FOUND" messsage if one exists 
      if (document.querySelector('.page-header').children.length > 2) {
         const errorDiv = document.querySelector('.error');
         pageHeaderDiv.removeChild(errorDiv);
      }
      // ↓ Removes cloned students from original list if they exist
      if (matchList.length > 0) {
         for (let i = 0; i < matchList.length; i++) {
            studentList.removeChild(studentList.lastElementChild);
         }
      }
      matchList = []; // ← List of matches from prev search is cleared out
      for (let i = 0; i < listItem.length; i++) {    // ← HIdes all students
         listItem[i].style.display = "none";
      }
      for (let i = 0; i < pageAnchors.length; i++) { // ← Removes all pagination links
         pageAnchors[i].parentNode.parentNode.removeChild(pageAnchors[i].parentNode);
      }
      /* ================= END OF =========================
         ================= PAGE RESET ===================== */

      const p = createElement('p', 'textContent', 'No match found'); // ← Creates no matches found message
      // ↓ If search bar empty, resets page to initial load
      if (searchString.length < 1) {
         appendPageLinks(listItem);
      } else {
      for (let i = 0; i < listItem.length; i++) {
         // ↓ Students whose names start with search string are added to match list
         if (studentNames[i].textContent.toUpperCase().startsWith(searchString)) {         
            matchList.push(listItem[i]);
         }
      }
      for (let i = 0; i < listItem.length; i++) {
         // ↓ Students whose names include search string are added to match list
         if (studentNames[i].textContent.toUpperCase().includes(searchString)
            && !studentNames[i].textContent.toUpperCase().startsWith(searchString)) {         
            matchList.push(listItem[i]);
         }
      }
      for (let i = 0; i < matchList.length; i++) {
         // ↓ All students in match list are appended to original list
         const duplicateNode = matchList[i].cloneNode(true);
         studentList.appendChild(duplicateNode);
      }
         // ↓ If match list is gt 10 students, send match list to appendPageLinks function
      if (matchList.length > itemsPerPage) {
         appendPageLinks(matchList);
         // ↓ If match list is let 10 students, but not zeroed out, all students are
         // displayed on one page
      } else if (matchList.length <= itemsPerPage && matchList.length > 0) {
         for (let i = 0; i < matchList.length; i++) {
            studentList.children[i + listDifferential].style.display = "";
         }
         // ↓ If search yields no matches, appropriate message is printed to page
      } else {
            const errorDiv = createElement('div', 'className', 'error');
            const p = createElement('p', 'textContent', 'No matches found')
            threeGenNest(pageHeaderDiv, errorDiv, p);
      }
      }
   }

   appendPageLinks(listItem);
   input.addEventListener('keyup', searchFilter, false);
   button.addEventListener('click', searchFilter, false);
});
