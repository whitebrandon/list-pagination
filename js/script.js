/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const listItem = document.getElementsByClassName("student-item");
const itemsPerPage = 10;
const pageDiv = document.querySelector(".page");


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

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

showPage(listItem, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');
   const pagesNeeded = Math.ceil(list.length/itemsPerPage); // Determines number pagination links needed
   let i = 1;
   while (i <= pagesNeeded) {
      const a = document.createElement('a');
      a.textContent = i;
      const li = document.createElement('li');
      a.href = '#';
      li.appendChild(a);
      ul.appendChild(li);
      div.addEventListener('click', (e) => {
         const activeLinks = document.querySelectorAll('.active');
         for (let i = 0; i < activeLinks.length; i++) {
            activeLinks[i].classList.remove('active');
         }
         e.target.className = 'active';
         showPage(listItem, e.target.textContent);
      });
// This is the end of the Event Listener Call Back Function        
      if (i === 1)   {
         a.className = 'active';
      }
      i++;
   }
   div.appendChild(ul);
   pageDiv.appendChild(div);
}

appendPageLinks(listItem);




// Remember to delete the comments that came with this file, and replace them with your own code comments.