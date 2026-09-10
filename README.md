Testmaker is a full-stack web application where users can create, edit, and attempt quizzes. The app also comes with social media like functionality, allowing users
to "like" other quizzes, as well as search for public quizzes based on keywords, number of plays, likes, or specific terms that may appear as tags. 

This web application is a personal project by Aidan Tang, and was developed using React (NextJS) and TailwindCSS for the frontend, while its database functionality is 
facilitated by a Java (Spring Boot) backend. While the app is currently a PROTOTYPE, the core functionality (editing/searching/playing quizzes, and evaluating user submissions) has already been COMPLETED. Further commits are incremental refinements for the user experience.



Progress Report:

Week 1: 
  Developed the foundations of the backend and the basic classes (Answer, Question, Quiz, User)
  Developed the Edit and Play functionality of quizzes

Week 2 - 
  - Added automatic evaluation of a user's quiz attempt
  - Added a page where users can see their quiz result history 
  - Created the main toolbar
  - Designed an interface for users to view their own quizzes (self/myquizzes)
  - Added the ability to Like Quizzes
  
Week 3 - 
  - Added a Search menu, allowing users to search by keyword, or sort by most likes/plays and most recently updated 
  - Created a Settings page, where users can change their username
  - Corrected major logical errors
  - Implemented a Delete button for removing unwanted quizzes, alongside a popup to confirm
  a user's decision
  - Added a Confirm popup when the user is about to submit a quiz
  - Created a proper UI for playing quizzes, clearly indicating all the necessary information (timer, submit button, quick traversal to specific questions, etc.)


To-Do Features:

- TOP:
  - Create a new homepage (TOP)
  [CHECKED] Design a new interface for Playing Quizzes
  - Add a "New user" page that allows users to change their username from the default "user_{RANDOM UUID}" (Can already be done in Settings but will appear to new users to make the new user experience better)
  - Allow users to view their own profile and profiles of other users

- MEDIUM
  - New interface for seeing Quiz Results
  - Allow users to edit and delete their own quizzes through its dedicated page (quiz/view/{quizId}) (users can currently only edit quizzes through /self/myquizzes)
  - Allow users to select images to represent their quizzes (due to API constraints, this will most likely be a few select images rather than using an image hosting service)
  
- FUTURE:
  - Comments 

