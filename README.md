# nc-news

[Live Version](https://your-deployed-app-link.com)

## General Info

**nc-news** is a web application that allows users to explore, sort, and interact with a variety of articles organized by topic. Built with React and styled for a seamless user experience, Article Explorer offers the following key features:

- View articles filtered by specific topics.
- Sort articles by date, number of votes, or comment count.
- Toggle sorting order between ascending and descending.
- Read individual articles with full content.
- Post new comments and upvote articles.
- See feedback on successful actions, and error handling if issues occur.

## Back End Repository

The backend repository for this project, which handles data for articles, topics, comments, and users, is available here: [Back End Repo](https://github.com/markw53/nc-news.git).

## Minimum Node Version

This project requires **Node v23.x** or higher. To check your Node version, you can use the following command in your terminal:

```bash
node --version
```

## How to run locally

1. Clone the repository [here](https://github.com/markw53/nc-news.git)

2. Navigate to the Project Directory: ```bash
 cd your-repo
 ```

3. Install Dependencies: ```bash
 npm install
 ```

4. Start the Development Server: ```bash
 npm run dev
 ```

## About This Project

## Project Structure

The main parts of this application include:

- Topics Page: Displays articles filtered by topic, with options to sort articles.
- Article Details Page: Allows users to view full article content, post comments, and upvote articles.
- Error Handling: Provides feedback if an error occurs, such as when an invalid topic or article is accessed.
- Sorting Controls: Users can sort articles by date, comment count, and votes, with an option to toggle between ascending and descending order.

## Technology Stack

- Front End: React, React Router
- Back End API: Built with Node.js and Express (link provided above)
- CSS: Custom styling with modular CSS files

## Error Handling

Errors are handled gracefully in this application. Users will see helpful messages in the following cases:

- Non-existent Paths: A message appears if a user navigates to a path that doesn’t exist.
- Non-existent Article or Topic: A user is informed if they attempt to view an article or topic that doesn’t exist.
- Comment Posting Errors: If required information for a new comment is missing, the user is prompted to provide it.

## Acknowledgments

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
