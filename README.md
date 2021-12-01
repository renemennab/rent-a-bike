# Rent-a-Bike
## Description

This is a bike rental app that was developed according to these requirements:

 * The application must be React-based.
 * Include at least 2 user roles: Manager and User.
 * Users must be able to create an account and log in.
 * Each bike will have the following information in the profile: Model, Color, Location, Rating, and a checkbox indicating if the bike is available for rental or not.

Managers can:
 * Create, Read, Edit, and Delete Bikes.
 * Create, Read, Edit, and Delete Users and Managers.
 * See all the users who reserved a bike, and the period of time they did it.
 * See all the bikes reserved by a user and the period of time they did it.

Users can:
 * See a list of all available bikes for some specific dates.
 * Filter by model, color, location, or rate averages.
 * Reserve a bike for a specific period of time.
 * Rate the bikes with a score of 1 to 5.
 * Cancel a reservation.

 The project was built using the MERN stack with redux to manage the global state.


 ## Production

 the production version of the app is hosted at: https://61a6c822c14ea00008ae1dca--rent-a-bike.netlify.app

you can get the user experience creating your profile or using:
- User login: test@gmail.com
- User password: 12345678

you can get the manager experience using:
- Manager login: manager@gmail.com
- Manager password: 12345678



## Local Usage (run fullstack app on your machine)

### Prerequisites
- [Node](https://nodejs.org/en/download/) ^v14.17.0
- [Yarn](https://nodejs.org/en/download/package-manager/)
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)

The project uses one single package.json file.

to install the dependencies run: 
```terminal
$ yarn 
```

Notice, you need client and server runs concurrently in different terminal sessions, in order to make them talk to each other.

## Server-side usage
the server files are under **./server**

### Prepare your mongo uri

Add a "MONGODB_URI" variable in .env file to connect mongoose with your local mongodb instance

### Start

```terminal
$ yarn serve 
```

## Client-side usage
the client files are under **./src**
### Start
```terminal
$ yarn start 
```
### Build
```terminal
$ yarn build 
```
this will compile the react code using webpack and generate a folder called docs in the root level
## Considerations

- The token for the session lasts one hour

- Managers can see all the bikes, users can only see a bike if they look for a specific span

- I usually try to code using TDD approach, but because I was concerned with delivering all the requisites in time and adding tests wasn`t among them, I decided to add the test after the app was presentable. I ended up not testing everything I wanted but I added some tests using jest and testing library. If given more time I would also make sure to add cypress integration tests. 

- I left the lorem ipsum intentionally because usually that would be handled by a designer. But with more time I could come up with something to fill that space. 

- I used Styled components combined with B.E.M to add the styles.

- I ran user tests in chrome(mac), chrome(android) and IOS(Iphone)