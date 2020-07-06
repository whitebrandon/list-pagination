/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Name: Brandon White
Date of Last Modification: 06/07/2020
******************************************/

'use strict';

document.addEventListener('DOMContentLoaded', () => {
   // ↓ Creates an element and gives it a property and value
   const createElement = (tag, property, value) => {
      const element = document.createElement(tag);
      element[property] = value;
      return element;
   }

   // Appends up to three nested elements
   const multiNesting = (parent, child, ...grandchild) => {
      parent.appendChild(child);
      grandchild.forEach(el => child.appendChild(el)); 
   }

   /* ==================================================
      ================ GLOBAL VARIABLES ================
      ================================================== */

   const listItem = Array.from(document.getElementsByClassName("student-item")); // ← Grabs list of students
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
   multiNesting(pageHeaderDiv, searchDiv, input, button)

   // ↓ Function to hide/show list of students
   const showPage = (list, page) => {
      const startIndex = (page * itemsPerPage) - itemsPerPage; // ← ex. if page = 2, startIndex = 10
      const endIndex = page * itemsPerPage; // ← ex. if page = 2, endIndex = 20
      if (list === matchList) {
         // ↓ No matter what, all the original students are hidden so that students will
         // display on page in an order that's primarily alphabetical
         for (let i = 0, n = studentList.children.length; i < n; i++) {
            i >= startIndex + listDifferential && i < endIndex + listDifferential ? studentList.children[i].style.display = "" : studentList.children[i].style.display = "none";
         }
      } else {
         for (let i = 0, n = list.length; i < n; i++) {
            i >= startIndex && i < endIndex ? list[i].style.display = "" : list[i].style.display = "none";
         } 
      }

   }

   // Function to create pagination links and add functionality to them
   const appendPageLinks = (list) => {
      const pagesNeeded = Math.ceil(list.length/itemsPerPage); // Determines number pagination links needed
      multiNesting(pageDiv, div, ul);
      for (let i = 1; i <= pagesNeeded; i++) {
         const li = document.createElement('li'); // ← Creates pagination links
         const a = createElement('a', 'href', '#');
         a.textContent = i;
         multiNesting(ul, li, a); // ← Appends pagination links to page
         if (i === 1) {
            a.className = 'active'; // .active is added to pagination link #1
            showPage(list, i);
         }
      }
      div.addEventListener('click', getPage); // ← On click displays students for given page
   }

   function getPage (event) {
      const target = event.target;
      const active = document.querySelectorAll('.active');
         for (let i = 0, n = active.length; i < n; i++) {
            active[i].classList.remove('active'); // Remove class name: 'active' for all <a>'s
         }
      target.className = 'active'; // Adds class name: 'active' back to appropriate pagination link
      input.value.length > 0 ? showPage(matchList, target.textContent) : showPage(listItem, target.textContent);
   }

   const searchFilter = () => {
      const searchString = input.value.toUpperCase(); // Stores value of search bar after event trigger
      pageReset();
      // ↓ If search bar empty, resets page to initial load
      if (searchString.length < 1) {
         appendPageLinks(listItem);
      } else {
         findMatches(searchString);
         printResults();
      }
   }

   function pageReset () {
      const pageAnchors = document.querySelectorAll('.pagination ul li a'); // ← Grabs all pagination links
      document.querySelector('.error') && document.querySelector('.error').remove(); // ← Removes "no match" msg
      matchList.forEach(() => studentList.lastElementChild.remove()); // ← Removes cloned students from original list
      matchList = []; // ← List of matches from prev search is cleared out
      listItem.forEach(student => student.style.display = "none") // ← Hides all students
      pageAnchors.forEach(anchor => anchor.parentNode.parentNode.removeChild(anchor.parentNode))
   }

   function findMatches (searchString) {
      for (let i = 0, n = listItem.length; i < n; i++) {
         // ↓ Students whose names start with search string are added to match list
         if (studentNames[i].textContent.toUpperCase().startsWith(searchString)) matchList.push(listItem[i]);
      }
      for (let i = 0, n = listItem.length; i < n; i++) {
         // ↓ Students whose names include search string are added to match list
         studentNames[i].textContent.toUpperCase().includes(searchString) && !studentNames[i].textContent.toUpperCase().startsWith(searchString) && matchList.push(listItem[i]);
      }
      for (let i = 0, n = matchList.length; i < n; i++) {
         studentList.appendChild(matchList[i].cloneNode(true));
      }
   }
   
   function printResults () {
      if (matchList.length > itemsPerPage) appendPageLinks(matchList);
      else if (matchList.length <= itemsPerPage && matchList.length > 0) {
         for (let i = 0, n = matchList.length; i < n; i++) {
            studentList.children[i + listDifferential].style.display = "";
         }
      } else createErrorMessage(); // ← If search yields no results, appropriate message is printed to page
   }

   function createErrorMessage () {
      const errorDiv = createElement('div', 'className', 'error');
      const p = createElement('p', 'textContent', 'No matches found')
      multiNesting(pageHeaderDiv, errorDiv, p);
   }

   appendPageLinks(listItem);
   input.addEventListener('keyup', searchFilter, false);
   button.addEventListener('click', searchFilter, false);
});
