# Blog Admin

This project is a comprehensive blog administration system that enables users to efficiently manage blog posts. The admin panel facilitates complete control over the CRUD operations: creating, reading, updating, and deleting blog entries.

Key features include:
- **Create**: Add new blog posts with text formatting support and multimedia content.
- **Read**: View a list of all blog posts and select any to view all of its content.
- **Update**: Edit existing blog posts to modify content and/or update images.
- **Delete**: Remove unwanted or outdated blog posts from the system.


## Tech Stack

This project was built using a variety of technologies and tools that make it powerful and easy to maintain. Here's a breakdown of the major components:

- **[Vite](https://vitejs.dev/)** - A modern frontend build tool that significantly improves the development experience.
- **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - The programming language used.
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces. This project utilizes several features of React:
  - useForm - This custom hook manages the lifecycle and state of login and register forms, and validates user input.
  - useToken - Responsible for for retrieving, storing, and updating the JWT (JSON Web Token) in localStorage.
  - useNavigate - This hook wraps the navigation logic of the Router, allowing components to redirect users to different routes
- **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)** - For styling the application.
- **[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)** - Used to structure the content for all pages.

### Backend API

- This project fetches data from a custom API, which is documented and hosted separately. The API handles data management and serves data to this frontend application. You can find more about the API [here](https://github.com/alee2602/LAB6-STWEB).

### Additional Tools

- **[ESLint](https://eslint.org/)** - For ensuring code quality and consistency.


## Installation

Follow these steps to install this project on your local machine:

1. Clone this repository:

``` bash
git clone https://github.com/alee2602/PROYECTO1-STWEB.git
```
2. Navigate to the project directory:

``` bash
cd PROYECTO1-STWEB
```
3. Install dependencies:
``` bash
npm install
```

## Usage

4. Start the development server
``` bash
npm run dev
```
## Author
- [@alee2602](https://github.com/alee2602)
