# Theatre Block
**Blocker System**
> 100DaysOfCode: Day 2

View blog post on [Medium](https://medium.com/@victoria2666/100-days-of-code-day-1-of-100-f31ba371a7b9)

View project on [victoria-lo.github.io/BookFlix/](https://victoria-lo.github.io/BookFlix/)

## The Project
- Used vanilla JavaScript, HTML and CSS to create a simple library circulation system.
- Stores a collection of books and patrons
- Tracks which books are borrowed and which patrons are borrowing them
- Tracks when the books are returned
- Use book's unique ID to lookup and display book information when requested

## What I Learn
- Build and edit DOM Elements
- Using built-in JS data structures (i.e. objects and arrays) to store data for DOM elements to display
- Add listeners and click events in JavaScript
- Navigating HTML elements via JavaScript
- Using querySelector to find HTML elements
- Build simple tables using HTML


#Technologies Used

## docker
To start:

`docker build -t a1-301 .`

`docker run -d --name a1-301-container -p 80:80 a1-301:latest`

`docker start a1-301-container`

To stop/remove container:

`docker stop a1-301-container`

`docker rm a1-301-container`

## heroku
`heroku login`

`heroku create --app <app-server-name>`

`heroku container:login`

`heroku container:push web --app <app-server-name>`

`heroku container:release web --app <app-server-name>`

`heroku open --app <app-server-name>`