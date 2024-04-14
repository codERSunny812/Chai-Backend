## How to deploy backend code in production?

First prerequisite installed the NodeJS at your machine.

image

In, between Client (Mobile / PC Browser) and Server for sending request and getting response are mostly use the **Express** (technology or package) and Mongoose are use for database services.

In **request,** there are many type of requests, like: get, etc.

Lets start the code part at VS Code

1. Open VS Code at any empty folder.
2. run command

```
`npm init -y
```


3. create index.js file at root directory.
4. give the sample message.


```
console.log(‘Namaste! Code, at RestAPI Backend.’);

```


5. do changes in script tag at ***package.json*** file, its do for shorthand code to run ***index.js*** file

```
"scripts": {
  "start" : "node index.js"
},


```

at run the code, using below command.



```


npm run start
```
