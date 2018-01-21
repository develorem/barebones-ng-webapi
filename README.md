# Angular and C# Web Api Project Template
This is a simple template for creating a new application that uses Angular 5 and Microsoft .Net Web Api in C#.

## Why

Why indeed!
There are plenty of options around for creating new SPA projects utilising Angular and Web Api.
For example, using the VSCode command line "new" syntax, Yeoman, or even doing a simple "File => New Project" in Visual Studio 17.

### Noisey

But if, like me, you are new to using Angular 4/5/6 to build single page applications, and you find there's too much noise in the afore mentioned projects generated from VS17 and VSCode, then you might want to get back to a very basic Angular + Web Api project.

Specifically I found some of these things annoying:

- Excessive MVC related files that are not necessary; why do I need all these views and viewstarts and partials etc when I'm going to be doing everything in Angular? index.html is all I need
- Thousands of extra build tools that I don't need/want
- An overly complex build pipeline that uses those thousands of tools
- Server side pre-rendering and other features I don't yet actually care about (not saying they aren't important, but they make it hard when you are learning and wondering why you're getting an error about your 3rd party grid not being able to be pre-rendered)

### Common Features

Also, I wanted to implement some very basic functionality that I'm sure you will probably use in your app:
- Authentication and Authorization, token handling, security checks, etc
- Routing and child routes

### Workflow

Finally, and probably most important for me, I wanted to separate my API from my client.
Today my client is in Angular, but tomorrow it might be WPF, or even a mobile app. 
I don't want a complex visual studio project with all my client assets AND my server assets.
In fact I want the separation to be so clean that I can work on the api and client completely separately.

## Tech, Tooling and Architecture

The project uses the following tools and technologies:
- Angular 5 (but should work with 4 or 6 fine - I haven't tried though)
- TypeScript (2.x)
- C# Web Api (latest version in VS2017)

### Tooling
In the template folder you will see the two folders; Api and Client.

#### Api

The Api is tooled as follows:
- Visual Studio 2017 project (created with the free version)
- Web host set to IIS 

The goal here was to be able to have my API running all the time. If I'm not working on the Api, I can close Visual Studio and my local IIS will continue to host it. When I'm working on Apis, then Visual Studio stays open.

#### Client

The Client is tooled as follows:
- VSCode (whichever version) for editing, but no builds required (you could use any editor in fact)
- Angular CLI to host the app

## Getting in Running

### Prerequisites

You will need:
- IIS enabled, with .Net registered
- Node and NPM installed
- Angular CLI installed globally (npm install -g @angular/cli)
- Visual Studio 2017 installed (free version is fine)
- Database

Highly desirable:
- VSCode
- Decent command prompt (I recommend http://cmder.net/)

### Running the API

1. Clone this solution
2. Open the Api project in Visual Studio 2017 (you may need admin mode the first time)
3. Go to project properties and create the IIS Virtual Directory
4. Edit web.config to point the connection strings to your database of choice (and make sure all permissions are sorted out)
5. Build the solution (which should also restore nuget packages)

### Running the Client

1. Open your command prompt and change to the Client folder
2. Restore all the NPM packages:  npm install  (might take a while)
3. Edit 'Client\src\app\services\app-settings.service.ts' and change the 'baseAppPath' to point to your hosted IIS project
4. Host the client with:  ng serve --open   (this will open your browser to the start folder)

### Testing It Out

1. Attempt to register a user
2. Attempt to login with that user
3. Refresh the whole site; it should login the user automatically

## Security Overview

Some points about security:
- Web Api has CORS enabled, meaning that it will currently allow requests to your API from any source (this is needed because 'ng server' hosts the app on localhost:4200 but your IIS server is hosting on a different port
- The API is setup with username/password provider by default
- The client calls the Account api to register a user
- The client calls the Token api (which is automatically created via the Owin configuration) to login a user and receive a token
- The client stores the token and its expiry in the browser localstorage 
- The client sends the token with all calls to your apis
- The app will check the token expiry on startup / page refresh. If expired, it will re-request login

## Tech Stack

Client:
- Modules:
  - Angular (core, common, forms, browser)
  - ngforage (angular wrapper that uses Mozilla's localForage module for accessing the browser local storage)
- Typescript
- Angular CLI

Server
- C# .Net
- Web Api
- Owin
- Microsoft CORS package
- Entity Framework for database access


## Suggestions Welcome!

Feel free to raise a pull request for suggested changes, or submit an issue
