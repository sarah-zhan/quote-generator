# Quotes Generate App
## Description
The app makes an API call and randomly generates a quote with a random background. The quote card is a photo.

![Alt text](public/generate_quote.gif)
## Features
- auto generate a background
- randomly generate a quote from an API call
- the quote is a photo
- the quote (photo) has its own url which can open in the browser
- the old quote will be deleted
- database is non-relational database DynamoDB

### Getting Started
- Download all the packages with ```npm i ```
- Run the development server: ```npm run dev ```
- Tech stacks: Next.js, NodeJS, TypeScript, AWS Amplify, AWS Lambda, DynamoDB, AppSync, styled components, MUI

😊 I have learnt so much from this project, especially feeling the power from AWS serverless lambda. How easy it is to get the backend running without all the configurations and query.

🆒 styled components: I have never thought we can style a webpage by created a "React" style component and wrap your connect in it.

⏭️ 1st time try-out Next.js. I am surprised the learning curve is flat...just feel like regular React???!!! Need to use more and find more...

✔️ It was quite scared at first because of all the new tech stacks which I have never learnt before. However, the basic logic seems aligning with other languages. Try it out and believe in yourself. Have fun...

💁‍♀️ DON'T download yarn. AWS lambda need to use NodeJS 16. Node 18 does NOT work. Sharp package need to install in a specific way ```npm i --arch=x64 --platform=linux sharp```

