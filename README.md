# TECH DEGREE PROJECT #2 | LIST PAGINATION && FILTERING

a COURSE BY TREEHOUSE

JS Code by Brandon White | white.brandonsean@gmail.com

## Objective: 
The objective of this project was to take a long list of items and dynamically group and paginate the list to provide a better UX for those persons who would have need to search through the list.

## Summary of Results:
* I split the list into sections of ten, so that a maximum of ten students would be displayed on the page at a time. The remainder can be displayed by moving from page to page. The pagination links are created dynamically, so whether the list of students is twelve names long, two hundred names long, or in the case of this project's "index.html"—fifty-four—names long, the code in "script.js" will handle it all the same.
* Furthermore, I dynamically added a search bar feature in the top-right corner of the user browser. The search bar will check user input—as it's being typed—against the students in the list, and return the results/options in real-time. In addition, the results are in primarily alphabetical order; meaning, if the user types an "A" into the search bar, although all students that have an "A" included in their name will be returned as a potential match, those students whose name STARTS with "A" will be the first students displayed on the page.
* Depending on how many results are found, the correct number of new pagination links will be dynamically added to the page; or in the case where matching results are less than ten students, no pagination links will appear on the page.
* If no results are found, a message: "No matches found" will be printed on the page in a red text color.

Explanation of Techniques Used:
Five Functions Were Primarily Used in the Coding of this Project.
<!-- The first two of the five are used primarily for refactoring purposes. -->
1. The createElement function has three parameters, which it uses to create an element and give it a property and value.
2. The threeGenNest function has up to four parameters, and is used to append elements to one another (up to three generations of nodes).

3. The **showPage()** function has a list parameter and page parameter, which it uses to determine which students/list items to hide or display. It includes a conditional which assures that search results are presented to the user in an order that is primarily alphabetical.
4. **The appendPageLinks()** function has a list parameter, and uses the length of that list to determine how many pages are needed to hold all the students/list items. It then adds those pagination links to the bottom of the page. It then calls the **showPage()** function and feeds it one of two arguments: the original list, or the list of matches from the user's search. This function also adds an eventListener to the container that holds the pagination links. The call back function of that eventListener adds an active state to the pagination button that holds the list of students/list items that are contained on that page. It also calls the showPage function and feeds it one of two arguments: the original list, or the list of matches from the user's search.
5. The **searchFilter()** function looks at the string in the search bar and compares it against the list of student names. First it checks to see if any of the student names start with the string in the search bar, and if so it pushes it into a list that holds the matches. Then it checks the list a second time (sans the items that were already declared matches), and if the student names includes the string in the search bar, it pushes those into the match list as well. It then clones those students and appends them to the original student list. If the match list is longer than ten students, the appendPageLinks function is called and the match list is fed into it as an argument. If the match list is less than or equal to ten students, then all of those students are displayed. If the match list is empty because no matches were found, then the message "No matches found" is printed to the left of the search bar. Finally, the searchFilter function resets the page on each input-"keyup"-event or each button-"click"-event. The reset consists of removing the "No matches found" message if one exists, deleting the cloned students from the original list, clearing out the match list, hiding all the students if any are showing, and removing all of the pagination links if any exist.

I decided to add styling to the **"No matches found"** message via a CSS rule selector, but I did dynamically give the `<div>` tag that holds the message a class of error so that it could be styled using CSS.


