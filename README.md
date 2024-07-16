This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Project Overview

This project is a Rick and Morty Explorer built with Next.js. It allows users to explore characters, locations, and episodes from the Rick and Morty universe. The project uses Apollo Client for GraphQL queries and Material-UI for the user interface components.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **React**: A JavaScript library for building user interfaces.
- **Apollo Client**: A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
- **Material-UI**: A popular React UI framework that provides a set of components for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Prerequisites

Before you begin, ensure you have installed Node.js and npm.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Ensure you are using the Node.js version specified in the `.nvmrc` file by running:

```bash
nvm use
```

4. Install the dependencies by running:

```bash
npm install
```

5. Start the development server by running:

```bash
npm run dev
```


6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## My Approach
I built this project with the following approach:

1. I focused on advanced caching strategies. I used Server Side Rendering (SSR) to improve performance and SEO by rendering the page on the server, then serving the data table straight to the client populated with information. I cached the data on the server and then used Apollo Client useQuery hook to cache any subsequent data on the client side and for future fetching with pagination. 
2. I used Material-UI for the user interface components to quickly establish table components and layouts.
3. I used TypeScript for type checking. 

## What I would do with more time
1. Auto generated types and schema graphQL - I used Ai to generate them based on documentation not being quite but would look in auto code generation for this on a longer scale project. 
2. Accessibility - used MUI out of box, haven't done check keyboard etc. 
3. Tests - I didn't manage to have time to test but I would of added unit tests with Jest and E2E testing with Playwright. 
4. Custom pagination in apollo rather than the default page size.
5. Better error handling.

