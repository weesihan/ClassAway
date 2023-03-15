# ClassAway
**CP 2106 Independent Software Development Project (Orbital)**

**Level of Achievement : Apollo 11**

ClassAway is a cross-platform mobile application that serves as centralised platform that can match consumer’s (young adults) interests to available classes/workshops provided by businesses. Our goal is to help niche, local businesses reach a larger audience and for users to easily find new, unique activities to try.

<img src="https://user-images.githubusercontent.com/62155825/126958606-f7af3471-ec9d-42d8-bbf9-8669cb0873b5.png" alt="ClassAway" width="450"/>


# Video guide link

This video guide will introduce the core features of our application.

https://drive.google.com/file/d/1AGn7eimEvhSPv5QrOi84PhcKj-JKI6op/view?usp=sharing


# Code Base

[https://github.com/weesihan/Classaway](https://github.com/weesihan/Classaway)


# Deployment

**Android**

1. Download the apk file from this link [https://drive.google.com/file/d/1n1ec9msxPOyf3JL76JXWemsW1CL5wMNY/view?usp=sharing](https://drive.google.com/file/d/1n1ec9msxPOyf3JL76JXWemsW1CL5wMNY/view?usp=sharing) 
2. Open an Android Simulator or use an Android device
3. Drag and drop the file into the simulator or download the file directly into your android device

**iOS**

1. Download and unzip the file from this link [https://drive.google.com/file/d/1KWO6Z6uLk3O9Rb2a0r5Wp4PeqMM0PCvo/view?usp=sharing](https://drive.google.com/file/d/1KWO6Z6uLk3O9Rb2a0r5Wp4PeqMM0PCvo/view?usp=sharing) 
2. Open an iOS Simulator i.e. Xcode
3. Drag and drop the file into the simulator to download

**User Test Account**

Email : [johndoe@gmail.com](mailto:johndoe@gmail.com)

Password : johndoe

**Business Test Accoun**t

Email : [lovelybakes@gmail.com](mailto:lovelybakes@gmail.com)

Password : lovelybakes


# Motivation

Ever find yourself googling “Things to do in Singapore” when planning for a day out with your friends or family? Like many others residing in Singapore, we often find ourselves feeling as if there is simply nothing to do. The main tourist sites and popular shopping areas have been so frequently visited that people are constantly seeking new experiences. Despite having a multitude of interesting activities offered by local businesses, such activities are difficult to find through your usual google search. This is usually due to the fact that local businesses often lack the capital to engage in extensive advertising to promote their services. Don’t you wish there was an easier way to find fun activities to do?


# Aim

We hope to make a centralised platform that can match consumer’s (young adults) interests to available classes/workshops provided by businesses through a mobile application. Our goal is to help niche, local businesses reach a larger audience and for users to easily find new, unique activities to try.


# How Are We Different

1. **ClassPass**

    ClassPass allows users to search for and book various fitness classes and services from wellness studios. This differs from ClassAway as our application focuses on a broader range of activities such as crafts and baking whereas ClassPass is founded upon helping users find fitness classes. The objective of our application is to help all local businesses reach out to a greater audience and for users to pick up hobbies that are not limited to fitness related activities.

2. **Klook**

    Klook allows users to discover activities, attractions and things to do wherever users travel. While Klook provides a variety of activities, its main target audience are travellers and the platform focuses on attractive deals for tourist attractions and accommodation. On the other hand, ClassAway provides a more niche scope of activities compared to Klook and allows users to have a more narrowed search within the city itself. For example, activities are broken down into smaller subcategories and locations for easier searching.



# Tech Stack

1. React Native (frontend)
2. Firebase (backend)


# User Stories

## 
Users

1. As a picky user interested in learning a new skill/ picking up a new hobby, I can easily find beginner-friendly classes that are within my budget and near my desired location.
2. As a user planning a fun activity with a group of friends or family, I can choose how many people I would like to book the class for and use a share function that allows me to share details of the class with the group of people.
3. As an indecisive user, I can “favourite” multiple classes that I am interested in attending so that I can compare the various studios and businesses and make a decision later.
4. As a forgetful user, I can view all my booked classes in a single page so that I will not miss my upcoming classes if I book multiple classes.
5. As an unsatisfied user, I can give ratings to my previously attended classes so that other users can make better informed decisions on whether to attend future classes from this particular business.

## 
Businesses (e.g. Dance Studios, Pottery Studios, Coffee/Baking workshops, etc)

1. As a small business providing a niche service, I can display all my available classes to potential customers in a comprehensive way such as including a class photo, timing, price and description so that users can be enticed by our attractive classes.
2. As a growing business who offers multiple classes and workshops, I can keep track of the number of vacancies and the users attending each session so that I will not have an oversubscribed class.
3. As a new business, I can collect user’s feedback on our classes and workshops so that I can improve on our services and increase our customer satisfaction.
4. As a merging or changing business, I can edit my details such as my address and business name in the event that I move my business to a different location or there are changes to my management.

# Development Timeline

**Milestone 1 (31 May)**

**Setup (Registration and Login)**



* Create splash screen, registration and login screen, and homepage
* Set up frontend navigation from login to the respective homepage depending on account type (business or consumer) 
* Set up different navigation bars for business account and consumer account
* Set up backend database (firebase) for registration and login 

**Milestone 2 (28 June)**

**Homepage**



* Business Homepage : Display my current listed classes
* User (Consumer) Homepage : Display all available classes in a flatlist

**Add Classes and View Classes**



* Set up database for business’ classes
* Create screens for businesses to add classes and for consumers to view class details upon clicking a class

**Profile page**



* Allow businesses and user to edit profile and view past classes listed and booked respectively

**Testing (System Testing)**



* We did our own system testing on an Android and iPhone simulator by creating a user and business account on each device and tested all the features in each page.

**Milestone 3 (26 July)**

**Book Class**



* Setup database for bookings (Businesses are able to access list of user accounts that booked the class and Users are able to access list of booked classes) 
* Setup frontend to allow users to book classes (with specified pax) and cancel bookings 

**Rate Class**



* Setup backend ratings system such that each class displays the average of all the ratings given
* Setup frontend to allow users to view their past classes and submit a rating for the class

**Testing (User Testing)**



* Installed the prototype (apk file) into an android device, provided a task list for members of our target group to do and gathered their feedback afterwards 


# Feature Limitations/Constraints



1. **Edit booking** - Once users have confirmed their booking, they are unable to edit it such as change the number of pax and can only cancel the booking then rebook it with the updated number of pax.
2. **Edit class details** - Similarly, businesses cannot edit the details of their classes once they have added it as our backend requires that the class detail information remains constant.
3. **Search by keywords** - Due to the limitations of firebase, users are unable to search for specific classes based on the name of the activity or other related keywords. Thus, we were limited to using a filter instead that would still allow users to narrow their search and would make it possible for us to query the results.
4. **Filtering** - Our filter function requires users to fill up all fields (region, categories and price) due to the querying function in firebase


# Future improvements/added features



1. **Make changes to booking/class details**

    Users can change the number of pax that they have booked for once they have already booked for the class. Businesses should also be able to edit their class details once they have uploaded the class such as changing the description. Changes to date and time or price will be prohibited as users that have already booked the class would be affected. Businesses should also be able to delete a class.

2. **Filter feature in Business Account**

    A similar filter feature can be implemented for businesses in the ‘My Classes’ page such that businesses can selectively view classes by using the search bar or filtering by category, price range, date, etc.

3. **View vacancies**

    Businesses should be able to set and track the number of vacancies of a class. Users will also be unable to book for the class once all vacancies have been filled.

4. **Improvements to Rating System**

    In addition to ratings, a ‘Leave a Review’ feature may be helpful for users so that they can get a better idea of the quality of the class or the business. This way, businesses can also obtain more qualitative feedback on their classes on top of the quantitative rating system. The number of ratings can also be made visible to users so that users can verify the credibility of the class.



# Architectural Diagram

![Architecture](https://user-images.githubusercontent.com/77946288/126960147-83972a8e-f7cd-4b17-9b5b-f64014839f5d.png)

# Quality Assurance (User Testing and System Testing)

**User Testing**

We gave each of our testers this list of scenarios to follow while using our application so that they can provide us with appropriate feedback.

**Role: User**

**Account:**

**Email: [johndoe@gmail.com](mailto:johndoe@gmail.com)**

**Password : johndoe**

**Scenario 1 - Booking a class near the user’s region and changing user’s region:**



1. As a user, John Doe, who lives in the east region, login into an existing account
2. Find a class “Near You” in the “Home” page and book the class for 2 pax
3. Share the class with a friend via telegram
4. Check for the booked class in the “My Bookings” page
5. Assuming John Doe has moved to the central area, go to the “Profile” page and change the region to Central
6. Go back to the “Home” page to reload classes “Near You”

**Scenario 2 - Searching for classes in a specific region and using the favourite function to save classes:**



1. Search for a wellness class in the west region with no price range
2. Like all classes available
3. Go to the “Home” page and book one of the classes in “My Favourites”  for 1 pax
4. Go to the “My Bookings” page and cancel the booking

**Scenario 3 - Leaving a review on previously attended classes and logging out of the account:**



1. Go to the “Profile” page and view past classes
2. Leave a review on the first class found
3. Go back to the “Profile” page and logout

**Role: Business**

**Account:**

**Email: lovelybakes@gmail.com**

**Password : lovelybakes**

**Scenario 1 - Adding a class:**



1. As a business that provides baking lessons in the east, Lovely Bakes, login into an existing account
2. Navigate to the “Add Class” page and upload a photo, insert a description, cost, date and select categories that this class falls under. Click the “Create Class” Button
3. Navigate to the “My Classes” page and refresh the page to find the newly added class

**Scenario 2 - Editing details of the business and logging out:**



1. As an existing business that has changed their contact information, go to the “Profile” page and change the relevant details
2. Wait for the alert that the profile has been updated and logout of the account

**User Evaluation**

<span style="text-decoration:underline;">User Tester 1</span>

Pros



* The app is very intuitive and user friendly
* The interface is visually appealing and the classes are displayed in an enticing manner
* The booking and cancellation process is simple and easy to use

Cons



* It is not possible to filter results by only one field e.g. filtering only by region which would be inconvenient as users would have to fill up the rest of the fields
* It is not possible to edit bookings such as changing the number of pax for each booking
* Leaving reviews instead of ratings might be better as without justification of why a bad rating was given the business cannot improve their services.

<span style="text-decoration:underline;">User Tester 2</span>

Pros



* The application is very nicely designed, the colour scheme works very well together
* The group booking feature is very useful as booking for friends would reduce the hassle of trying to book classes in the same slot using individual accounts
* Leaving ratings is a very handy feature as well as it lets users know whether they should book the class

<span style="text-decoration:underline;">Business Tester 1</span>

Pros



* Pretty intuitive, it is easy to perform tasks such as adding a class. 
* ClassDetails page organises the info well.

Cons



* Businesses cannot edit their class details once uploaded and it doesn’t seem like they are able to delete the class once it has been created as well
* Businesses cannot put a cap on the number of attendees e.g. Stop allowing people to book the class once there are 30 attendees 
* Businesses cannot easily search their listed classes. It might be helpful to have a filter feature or a search bar so that businesses can view classes selectively instead of having to scroll through all the listed classes in the my classes page 

<span style="text-decoration:underline;">Business Tester 2</span>

Pros



* As a business owner, the app is very easy to navigate and has all the features necessary to easily upload details about the classes the business offers.
* It is convenient that businesses can change their region in the edit profile page so that in the event a business moves to another location they would not need to create a new account

Cons



* The description container in the add class page only shows one line at a time and it is difficult to see the whole description container once we’ve finished writing. This would make it difficult to make edits as well thus is not very user friendly
* Businesses cannot see how many ratings were given so the rating might be inaccurate if there is only one rating. It might also be beneficial to the users if they can see how many people have rated to see its popularity.

**System Testing**


<table>
  <tr>
   <td><strong>Feature</strong>
   </td>
   <td><strong>Things to test</strong>
   </td>
   <td><strong>Test</strong>
   </td>
   <td><strong>Expected</strong>
   </td>
   <td><strong>Result</strong>
   </td>
  </tr>
  <tr>
   <td>Splash Screen
   </td>
   <td>Able to Register for a new account
   </td>
   <td>Opening the “Sign up” page
   </td>
   <td>Page should load properly
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering with all empty fields 
   </td>
   <td>Alert with the error message “Enter fields to sign up.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering with an empty field (eg region)
   </td>
   <td>Alert with the error message “Enter fields to sign up.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering with invalid email eg “abc”
   </td>
   <td>Alert with the error message “Please enter a valid Email.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering with an email that is already taken
   </td>
   <td>Alert with the error message “Email already
<p>
exists.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering with password that is too short 
   </td>
   <td>Alert with the error message “Password must be at least 6 characters.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering different account types using the toggle button 
   </td>
   <td>Toggle button works
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Able to Register for a new User account
</li>
</ul>
   </td>
   <td>Registering for User Account with all valid fields
   </td>
   <td>Alert with “Registered successfully.” and navigated to Log in page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Able to Register for a new Business Account
</li>
</ul>
   </td>
   <td>Registering for Business Account with all valid fields
   </td>
   <td>Navigated to “Register Details” page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering Business Details with empty fields
   </td>
   <td>Alert with the error message “Enter fields to sign up.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering Business Details with invalid phone number (non-numeric input) 
   </td>
   <td>Alert with the error message “Invalid phone number”
   </td>
   <td>Non-numeric input is allowed
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Registering Business Details with all valid fields
   </td>
   <td>Alert with “Registered successfully.” and navigated to Log in page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to Log in
   </td>
   <td>Logging in with all empty fields
   </td>
   <td>Alert with the error message “Enter fields to sign in.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Logging in with incorrect/empty password field
   </td>
   <td>Alert with the error message “Password is invalid.”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Logging in with an invalid email
   </td>
   <td>Alert with the error message “Email is invalid”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Logging in with an unregistered email
   </td>
   <td>Alert with the error message “Invalid user”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Able to Login to User Account
</li>
</ul>
   </td>
   <td>Logging in with correct credentials
   </td>
   <td>User Home Screen (“Home”) will be loaded
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Able to Login to Business Account 
</li>
</ul>
   </td>
   <td>Logging in with correct credentials
   </td>
   <td>Business Home Screen (“My Classes”) will be loaded
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td colspan="5" ><strong>BUSINESS ACCOUNT </strong>
   </td>
  </tr>
  <tr>
   <td><strong>Feature</strong>
   </td>
   <td><strong>Things to test</strong>
   </td>
   <td><strong>Test</strong>
   </td>
   <td><strong>Expected</strong>
   </td>
   <td><strong>Result</strong>
   </td>
  </tr>
  <tr>
   <td>Navigation Bar
   </td>
   <td>Able to navigate between screens
   </td>
   <td>Click on My Classes button
   </td>
   <td>My Classes page loads
<p>
when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on Add Class button
   </td>
   <td>Add Class page loads
<p>
when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on Profile button
   </td>
   <td>Profile page loads
<p>
when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Icon of the active page is highlighted 
   </td>
   <td>Icon of the active page should be black and the rest grey
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>My Classes
   </td>
   <td>Able to display classes correctly
   </td>
   <td>Display classes correctly
   </td>
   <td>My upcoming classes should be displayed 
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Pull down to refresh 
   </td>
   <td>My upcoming classes should be reloaded if there are updates/changes to the list of classes
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to browse through my classes
   </td>
   <td>Scroll vertically to look at more classes 
   </td>
   <td>Scroll should allow users to scroll through classes up and down
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on a class for more information 
   </td>
   <td>The Class Details page of the selected class loads
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on the back button on the class details page
   </td>
   <td>Redirected to the My Classes page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Add Class
   </td>
   <td>Able to add new classes
   </td>
   <td>Adding a class with empty field(s)
   </td>
   <td>Alert with “Please fill in blank fields”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Adding a class with non-numeric cost field
   </td>
   <td>Alert with “Invalid Cost”
   </td>
   <td>???
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Adding a class with all valid fields
   </td>
   <td>Alert with “Class created successfully” and redirected to My Classes page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Navigate to My Classes and pulling down to refresh
   </td>
   <td>The newly added class should be displayed in the list
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Photo picker
</li>
</ul>
   </td>
   <td>Click on Choose photo from library
   </td>
   <td>Accesses device Gallery to choose and crop an image, Image then appears on the box
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on Take Photo
   </td>
   <td>Accesses device camera to take a picture and then crop , image appears on box
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on cancel
   </td>
   <td>The pop up menu closes, no image chosen
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Date picker
</li>
</ul>
   </td>
   <td>Click on the calendar icon
   </td>
   <td>A modal date picker appears. Upon selection, chosen date and time is displayed
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
<ul>

<li>Category Dropdown picker
</li>
</ul>
   </td>
   <td>Click on arrow on the categories field
   </td>
   <td>Dropdown picker opens when it is closed and closes when open
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Select one item
   </td>
   <td>Selected item highlighted blue
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Select more than one items
   </td>
   <td>Selected items highlighted blue. Number of items selected in the field.
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Deselect an item 
   </td>
   <td>Item turns back to grey, selected items updated
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Profile
   </td>
   <td>Able to Log out
   </td>
   <td>Click on Log out
   </td>
   <td>Logged out of account and redirected to Splash Screen
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to View Past Classes
   </td>
   <td>Displays Past Classes correctly 
   </td>
   <td>Only displays my classes with dates that have passed
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on a class in the list
   </td>
   <td>Redirected to a class details page of the selected class
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on back button
   </td>
   <td>Redirected to Profile page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to Edit Profile 
   </td>
   <td>Click on Settings
   </td>
   <td>Redirected to Edit Profile menu
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Edit the field(s) and click Update Profile
   </td>
   <td>Alert with “Profile Updated” and redirected to Profile page. Changes displayed on profile page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on back button
   </td>
   <td>Redirected to Profile page 
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td colspan="5" ><strong>USER ACCOUNT </strong>
   </td>
  </tr>
  <tr>
   <td><strong>Feature</strong>
   </td>
   <td><strong>Things to test</strong>
   </td>
   <td><strong>Test</strong>
   </td>
   <td><strong>Expected</strong>
   </td>
   <td><strong>Result</strong>
   </td>
  </tr>
  <tr>
   <td>Navigation Bar
   </td>
   <td>Able to navigate between screens
   </td>
   <td>Click on Home button
   </td>
   <td>Home page loads
<p>
when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on Filter button
   </td>
   <td>Filter page loads
<p>
when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on My Bookings button
   </td>
   <td>My Bookings page loads when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on Profile button
   </td>
   <td>Profile page loads
<p>
when clicked
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Icon of the active page is highlighted 
   </td>
   <td>Icon of the active page should be black and the rest grey
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Home
   </td>
   <td>Classes displayed are not over yet
   </td>
   <td>Check date of each class
   </td>
   <td>Date should be later than current date
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Classes located in user’s region loads in “Near You”
   </td>
   <td>Check location of admin of the classes is the same as user’s (Central) in the database
   </td>
   <td>All class admin’s region is Central
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Classes that users have liked are in “Favourites”
   </td>
   <td>Click on each class and check that class has been liked
   </td>
   <td>Heart in Class details should be opaque
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Class card
   </td>
   <td>Click on individual class cards
   </td>
   <td>Navigates to and loads class details page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Class Details
   </td>
   <td>Back navigation
   </td>
   <td>Click on back arrow button
   </td>
   <td>Navigate to Home page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Like function
   </td>
   <td>Click on heart button (initially uncoloured)
   </td>
   <td>Heart button should turn opaque purple and class is added to user’s Favourites
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Unlike a favourite class
   </td>
   <td>Click on heart button (initially opaque)
   </td>
   <td>Heart button should become uncoloured and class is removed from user’s Favourites
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Share function
   </td>
   <td>Click on person icon with a + sign
   </td>
   <td>IOS or android share options available are shown and “Join me in this class” is the description
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Choose pax for booking
   </td>
   <td>Click on + or - button
   </td>
   <td>Number of pax should change accordingly, minimum booking is 1 and max bookings is 20
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Book
   </td>
   <td>Press book button with no prior booking
   </td>
   <td>Alert with “Class has been booked successfully”, booked class appears in my Bookings page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Press book button with prior booking
   </td>
   <td>Alert with “You have already made a booking for this class!”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Filter
   </td>
   <td>Filter function
   </td>
   <td>Before filter is used
   </td>
   <td>Displays all classes available
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Filter with all fields entered (Central, Wellness, $0 - $20)
   </td>
   <td>Flexibility Training class displayed only
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Filter with region field or category field not entered
   </td>
   <td>Alert with “Please fill in the region and categories fields to filter results!”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Filter with price field not entered (Region: Central, category: Art)
   </td>
   <td>Displays all classes based on category and region field (Hand painted pottery, Basic Pottery, Resin Coasters)
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Cancel function
   </td>
   <td>Press cross in filter modal
   </td>
   <td>Modal is hidden
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>My Bookings
   </td>
   <td>Display number of pax for each booking
   </td>
   <td>Book for 3 pax
   </td>
   <td>Number 3 is displayed next to the person icon
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Navigates to class details from class card
   </td>
   <td>Click on class card
   </td>
   <td>Class details page with cancel function is displayed
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Cancel function in class details
   </td>
   <td>Click on cancel button
   </td>
   <td>Alert with “Cancel Class. Are you sure you want to cancel this class?” option of “OK” which removes class from My Bookings page or “Cancel” which does nothing
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>Profile 
   </td>
   <td>Able to Log out
   </td>
   <td>Click on Log out
   </td>
   <td>Logged out of account and redirected to Splash Screen
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to View Past Classes
   </td>
   <td>Displays Past Classes correctly 
   </td>
   <td>Only displays my booked classes with dates that have passed
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on a class in the list
   </td>
   <td>Redirected to a class details page of the selected class
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on back button
   </td>
   <td>Redirected to Profile page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to leave a rating
   </td>
   <td>Click on a past class and click ‘Leave a rating’
   </td>
   <td>Pop up menu appears
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Choose the number of stars and press submit
   </td>
   <td>Rating for class updated
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click cancel 
   </td>
   <td>Closes the Ratings pop up menu 
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Leave a rating on a previously rated class
   </td>
   <td>Number of stars given displayed on the pop up menu and alert with error message “You have already left a rating!”
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>Able to Edit Profile 
   </td>
   <td>Click on Settings
   </td>
   <td>Redirected to Edit Profile menu
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Edit the field(s) and click Update Profile
   </td>
   <td>Alert with “Profile Updated” and redirected to Profile page. Changes displayed on profile page
   </td>
   <td>✓
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>Click on back button
   </td>
   <td>Redirected to Profile page 
   </td>
   <td>✓
   </td>
  </tr>
</table>
