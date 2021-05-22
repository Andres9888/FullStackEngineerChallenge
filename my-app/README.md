This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses the following technologies:
Next.js as my React framework for frontend
Next.js for with nextAuth for authentication and to handle api calls  
MongoDB for the database
Node for the backend
Graphql and Apollo to handle api calls and data management
Typescript for static typing and as language used for whole project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Initial you should not be logged in and it will give you the nav bar and a panel with text telling you to log in to view data.

When you decide to log in you can do so by clicking the blue sign in button on the top right which will redirect you to the login page.

It is easier to log in as admin initially to view employees but once you know the employee usernames you can log in directly as an employee.

Now you are in the login page just input admin as the username and click sign in with credentials button.

You will be redirected back to the home page and the admin panel should be displayed.

## Admin View

To confirm you are logged in as admin the right nav bar before the sign out button should have the name of the username you logged in as.

Adminpanel has different options than employee panel

As an admin you can add employees and an initial review.

If you want to assign an employee to review another the row of the employee will be the employee that will do the review and if you go to the assign to review before delete button you can click any employee you want to assign him to.

You can also delete employees as well by click the red delete button.

If you want to view performance reviews just expand the row by click the plus button before the employee avatar as the first option.
This should give you all employee reviews and responses to those reviews.

## Employee View

If you know the employee name you want to log in as you can log in directly as that employee by inputting his name in the usernames field on the login page.
If you do not know any employee name log in as an admin and you can find the name in the Employee column.

If you are logged sign out and sign in as the name you selected.

To confirm you are logged in as an employee the name will change to the name you logged in as.

Employee panel will have only employees assigned to them.

If you want to give feedback to a certain employee you can do so by selecting an employee you were assigned to in the drop down below and inputting your feedback.




[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

