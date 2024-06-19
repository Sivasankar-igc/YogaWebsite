                                                                                    YOGA PROJECT


# PROJECT INTRODUCTION

**Author** - *Lipsa Mohanty* 
**Date** - *17 June 2024*

##### Contributors
> ###### Ritik Ranjan Sahoo (*Frontend Developer*) (https://www.linkedin.com/in/ritik-ranjan-sahoo-407893250/)
> ###### Lipsa Mohanty (*Frontend Developer*) (https://www.linkedin.com/in/lipsa-mohanty-30668523a/)
> ###### Siva Sankar Sahoo (*Backend Developer*) (https://www.linkedin.com/in/siva-sankar-sahoo-6b648a23a/)

##### About Our Project
```Welcome to our serene digital sanctuary where the ancient art of yoga meets modern convenience. Our website is a haven for those seeking balance, wellness, and tranquility in their busy lives. Explore a rich tapestry of yoga classes, guided meditations, and enlightening articles that cater to both beginners and seasoned yogis. Join our community to embark on a transformative journey that stretches beyond the mat, nurturing mind, body, and soul in harmony with the timeless wisdom of yoga.```

<!-- ************************************************************************************************************************************************************************** -->

# BACKEND INFORMATION

**Backend Framework** - *Node.js*
**Database** - *MongoDB*
**API** - *RESTful API*
**Server** - *Express.js*
**Authentication** - *JSON Web Tokens (JWT)*
**Authorization** - *Role-Based Access Control (RBAC)*
**Cloud - (Imgae Storing)** - *Cloudinary*
**E-Mail Management** - *Node Mailer*

### Folder Structure 

**index.mjs** -- `It is the index i.e. the starting file that the node looks for whenever it start the server`
**Models** -- `This folder contains all the schema of the database`
**Controllers** -- `This folder contains all the logic of the application which are used as callback methods at API calling.`
**Routes** -- `This folder contains all the API routes of the application`
**Utils** -- `This folder contains all the utility functions of the application`
**dist** -- `Contains the production-ready version of the clientside code. This includes all the compiled, minified, and bundled files.`

###### Files in Models Folder
>>>generateCommentId.mjs - `To generate the comment id of a particular yoga class whenever an user tries to add a comment to it`
>>>generateContentId.mjs - `To generate the yoga content id whenever a new content is added by the admin`
>>>generateDate.mjs - `To generate easy to read date`
>>>generateencryptedPassword - `To decrypt the password i.e. converting normal text password to hash password`
>>>generateMail.mjs - `To send mail`
>>>generateOTP.mjs - `To genreate alphanumeric OTPs`
>>>generateRefferalCode.mjs - `TO generate unique Referral code for every user whenever he/she tries to create an account`
>>>generateTime.mjs - `To generate easy to read time`

###### Files in Routes Folder
>>>adminRoutes.mjs - `Contains all the routes that are called by the admin`
>>>userRoutes.mjs - `Contains all the routes that are called by both user and admin as well`

###### Files in Controllers
>>>AdminControllers - `Contains all the api callback methods used by the admin apis`
>>>UserControllers - `Contains all the api callback methods used by the user api`
>>>OtherControllers - `Contains general purpose api callback methods`

###### Files in dist
>>>assets - `Contains minified javascript and css file`
>>>index.html - `Contains the .html file`

###### Run Script
```node index.mjs```
or
```nodemon index.mjs``` (if nodemon is installed on your system)

After running the above command, the below message should be displayed

```Server listening at port number 8000```
```Yoga Database connected```

************************************************************************************************************************************************************************


# FRONTEND INFORMATION

**Frontend Framework** - *React.js , HTML, Tailwind css, javascript*


---------------------------------------------------------------------------APP..JS----------------------------------------------------------------------------------
 * Component Structure

The App component consists of the following parts:

1.Imports: Importing necessary libraries, components, and utilities.
2.Initialization: Setting up Redux dispatch and fetching initial data.
3.Routing: Defining routes for different parts of the application using React Router.
4.Conditional Rendering: Displaying different content based on the application’s state.


* IMPORT

1.React and Hooks: useEffect for side effects.
2.React Router: Route, BrowserRouter, Routes for routing.
3.Pages and Components: Various pages like User, Home, Classes, etc.
4.Authentication: AuthProvider and PrivateRoute for protected routes.
5.Redux: useDispatch and useSelector for state management.
6.Utilities: statusCode for status constants.
7.Axios: For HTTP requests.
8.React Toastify: For displaying toast notifications.



* Using useEffect to dispatch actions that fetch initial data when the component mounts.
* Using useSelector to get the status of various slices from the Redux store.


------------------------------------------------------------------------LOGIN & SIGNUP-----------------------------------------------------------------------------------
  
*****ForgotPassword Componen: The ForgotPassword component allows users to request a password reset link by entering their email address.

*****LOGIN: The SignInSignUp component provides a user interface for signing in or signing up users. It includes forms for both signing in (SignInForm) and signing up (SignUpForm), toggled by user interaction.  


-----------------------------------------------------------------------------------REDUX---------------------------------------------------------------------------------
--------FEATURES---------


****ABOUTPAGESLICE.MJS: The aboutPageSlice is a Redux slice created using Redux Toolkit that manages the state of the "About Page" content in a web application. This slice includes an initial state, reducers, and asynchronous actions to fetch and update the About Page contents from a server.

****ADMINSLICE.MJS: The adminSlice is a Redux slice created using Redux Toolkit. It manages the state related to the admin user in your application, including their data and status. This slice includes an initial state, reducers, and actions for adding an admin user.

****BLOGSLICE.MJS: The blogSlice manages the state related to blogs in your application using Redux Toolkit. It includes initial state, reducers for adding, modifying, and removing blogs, as well as asynchronous actions to fetch blog data from an API.

****CONTACTPAGESLICE.MJS: The contactPageSlice manages the state related to the contact page content in your application using Redux Toolkit. It includes initial state, reducers for modifying contact page data, and an asynchronous action to fetch contact page content from an API.

****HOMEPAGESLICE.MJS: The homePageSlice manages the state related to the home page content in your application using Redux Toolkit. It includes initial state, reducers for modifying home page data, and an asynchronous action to fetch home page content from an API.

****PREMIUMSLICE.MJS: The premiumSlice manages the state related to premium data in your application using Redux Toolkit. It includes initial state, reducers for adding premium data, and an asynchronous action to fetch premium data from an API.

****USERSLICE.MJS: The userSlice manages user-related state in your application using Redux Toolkit. It includes initial state, reducers for modifying user data, and an asynchronous action to fetch user data from an API.

****VIDEOSLICE.MJS: The videosSlice manages state related to video data in your application using Redux Toolkit. It includes initial state, reducers for adding, updating, and deleting videos, and an asynchronous action to fetch video data from an API.

****YOGACONTENTSLICE.MJS: The yogaContentSlice manages state related to yoga content in your application using Redux Toolkit. It includes initial state, reducers for managing yoga content, and an asynchronous action to fetch yoga content data from an API.

****YOGAINSTRUCTORSSLICE.MJS: The yogaInstructorSlice manages state related to yoga instructors in your application using Redux Toolkit. It includes initial state, reducers for adding, modifying, and removing yoga instructors, and an asynchronous action to fetch yoga instructor data from an API.



----------------------------------------------------------------------------PAGE-----------------------------------------------------------------------------------------


****ABOUT.JSX: The About component is a React functional component designed to render the "About" page of a website. It includes various sections such as page information, team details, and photo gallery, utilizing Redux for state management.

****BLOG.JSX: The Blogs component is a React functional component that renders a "Blogs" page. Depending on the userType prop, it conditionally displays either the BlogsManager component for admins or the BlogTypes component for other users.

****BLOGDETAILS.JSX: The BlogsDetails component is a React functional component designed to display detailed information about a specific blog topic. It uses the useParams hook from react-router-dom to retrieve dynamic route parameters and renders corresponding content based on the title and description parameters.

****CLASSES.JSX: The Classes component is a React functional component designed to render a "Classes" page. Depending on the userType prop, it conditionally displays either the ClassManager component for admin users or the TypesOfClasses component for other users.

****CONTACT.JSX: The Contact component is a React functional component designed to display a contact page where users can view contact information and submit a contact form. It utilizes data from the Redux store and handles form submission via an API request.

****HOME.JSX: The Home component is a React functional component that serves as the landing page of a yoga-related application. It aggregates several other components to display a comprehensive home page, including a hero section, types of yoga, place information, types of classes, instructors, and pricing details.

*****RECORDINGS.JSX: The Recordings component is a React functional component designed to display a list of video recordings. It allows an admin user to add, update, and delete videos. The component uses Redux for state management and features a modal form for video operations.


****USER.JSX: The User component is a React functional component designed to render a consistent layout for different user types based on the userType prop. It includes a navigation bar (Navbar), dynamic content based on routing (Outlet), and a footer (Footer). This component ensures a structured user interface experience across different sections of the application.

*****YOGACLASSDETAILS.JSX: The YogaClassDetails component in React is designed to display detailed information about different types of yoga classes based on the title parameter obtained from the URL using useParams from react-router-dom. It renders the title and corresponding description of the selected yoga class dynamically.


*****PAYMENTFORM.JSX: The PaymentForm component in React is designed to facilitate user payments by displaying user details, content details, and an option to upload files for payment processing. It integrates with Redux for user data retrieval and uses Axios for making HTTP requests to handle file uploads.


----------------------------------------------------------------------------------------------COMPONENTS-----------------------------------------------------------------


***ABOUTTEAM: The Aboutteam component is a React functional component designed to display a section of a webpage that introduces a team or provides information about a team. It uses                    Tailwind CSS for styling, ensuring a responsive and modern design. The component takes in a props object which contains three main properties: heading, subHeading, and description. These                    Properties  are used to dynamically populate the content of the  component.

****ALLPHOTOS: The Allphotos component is a React functional component that displays a gallery of photos, specifically showcasing yoga instructors. The component includes a "Show More" button that toggles the display between showing a limited number of photos and all available photos. The component leverages the Redux state to fetch the data for display and uses Tailwind CSS for styling.

****BLOGTYPES: The Blog component is a React functional component that displays a list of blog posts. It allows users to search through the posts and view filtered results. The component fetches blog data from a Redux store and provides a user interface for interacting with the blog content. The component uses Tailwind CSS for styling.

****BLOGMANAGER: The Blog component is a React functional component for managing blog posts. It allows users to search, add, edit, and delete blog posts. The component interacts with a Redux store to fetch and manage blog data and uses Axios for API calls. It also includes a modal for adding or editing blog posts.

****CLASSMANAGER: The ClassManager component is a React functional component designed to manage yoga content. It enables users to add, edit, and delete yoga content. The component leverages Redux for state management and Axios for API interactions. A modal is used for adding and editing content.

****ERR404: The Err404 component is a React functional component that serves as a 404 error page. It displays a message indicating that the page the user is looking for cannot be found and provides an option to navigate back to the previous page or to the homepage.

****FOOTER: The Footer component is a customizable and responsive footer for a React application. It is built using functional components and leverages Tailwind CSS for styling. This component includes various sections such as "Resources" and "About", with options for adding additional sections if needed. Additionally, it features social media icons for enhanced connectivity.

****HERO: The Hero component is a functional React component that displays a hero section on a webpage. It is designed to be used with Redux for state management and React Router for navigation.

****INSTRUCTOR: This component is a functional React component that displays a showcase of yoga instructors. It retrieves data from a Redux store and displays the information in a structured layout

****MODAL: The Modal component is a React functional component that provides a form to add a new entry with details such as name, recordings, image, and description. The form is designed using Tailwind CSS for styling and includes an icon from react-icons for closing the modal.

****NAVBAR: The Navbar component is a React functional component that serves as the navigation bar for a web application. It includes links to various sections of the application and a search input, with responsive behavior for smaller screens. Additionally, it incorporates a profile dropdown menu based on the user type.

****PAGEINFO: The Pageinfo component in React is designed to display information about a page, including a background image, page title, and breadcrumb navigation links.

****PLACE: The Place component in React displays information about a yoga studio, including its heading, description, address, and a link to find the studio on a map.

****PRICING: The Premium Pricing component fetches data from Redux state to display various premium plans available for purchase. Users can view plan details, including features and prices, and initiate a purchase via a "Buy now" button.

****TYPES OF CLASSES: The Types of Classes component fetches yoga content data from Redux state and displays a list of classes. Users can view details for each class and choose to show more or less content based on their preference.

****TYPES OF YOGA: The Types of Yoga component fetches yoga content data from Redux state and displays a list of yoga types. Users can view details for each yoga type and choose to show more or less content based on their preference.

****WEBSITE MANAGEMENT FORM: This component serves as the main control panel for editing different sections of the website.It manages state to display forms for editing the Home, Contact, About, and Yoga Instructor pages.

****YOGA INSTRUCTOR FORM: It manages yoga instructor data, including adding, editing, and deleting functionalities.



----------------------------------------------------------------------------------------SECURITY-------------------------------------------------------------------------


*****AUTOCONTEXT: The AuthProvider component establishes an authentication context and manages the user state (user). It provides the login and logout functions to update this state, which can be accessed by consuming components using the useAuth hook.

****PRIVATEROUTE: The PrivateRoute component acts as a higher-order component (HOC) that wraps around routes in your application. It checks whether the user is authenticated (user exists) and whether the authenticated user's userType matches the expected userType for accessing the route.

###### Run Script
  "npm run dev" 

After running the above command, the below message should be displayed

> vite

 VITE v5.2.11  ready in 2708 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help



*************************************************************Happy Coding**********************************************************************************************





