# django graphene auth with vue js

this application has support for vue2 as of now

it has only the auth set up however the graphql apollo client is set for all applications 

it also uses vuex and routing all set and ready for use

this is not a library and so if you want to use it you can either modify your current application by adding the features here or you can download this as your project template and just rename the application to suit your target application and start using it (the later is better way to use all the features I made)

## assumption

I assume that your token expires every 30 mins in django

I assume that your auth uses default `jwt` 

I assume that you are using default `django-graphql-auth` with no modification on the mutations it has

 the login expect

 ```
    username/email  # i am using email in my case
    password
 ```

 and register expect

  ```
    username
    email  
    password1
    password2
 ```

you can check out mutations in '/store/index.js`

I assume that you are using django `sites` with site set to current domain of the frontend

I assume your web socket is running at `/ws/graphql` if you are using subscriptions


## description

this application is complete and can run as it is provided you have a django graphene server running

you can modify `/src/settings.js` config for domain or local server

the app can


    1. login
    2. register
    3. activate account
    4. refresh token
    5. logout

other auth related features comming

to test I have a server I made tutorial on https://github.com/kimutaiRop/todo-back you can download and checkout how it works