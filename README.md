# Contact list
## Getting started
Author: Mateusz Maj

To run project locally go to root folder and run:
```
npm install
npm start
```
As an alternative you can run application in container.\
In order to do that make sure you have got ```Docker Desktop```
installed, then go to root folder and type:
```
docker build -t contact-list .
docker run -dp 3000:3000 contact-list
```
