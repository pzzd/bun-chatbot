import { serve } from "bun";
import chatbot from "./chatbot/index.html";


const server = serve({
  port: 3000,
//   fetch(req) {
//     return new Response("Bun!");
//   },

  routes: {
    // Serve index.html for all unmatched routes.
     "/*": chatbot,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/dog": {
      async GET(req) {
        const headers = new Headers();
        headers.append("Authorization", "Bearer YOUR_API_KEY");
        console.log("Fetching random dog image...");

        const response = await fetch( 'https://dog.ceo/api/breeds/image/random', {
          method: "GET",
          headers: headers,
        });
        const data = await response.json();
//        log(data.message);

        return Response.json({
          method: "GET",
          data: data,
        });
      }
    },

    "/api/ask-gemini": {
      async POST(req) {
        console.log("Fetching something from a model...");
        const body = await req.json();
        // TODO: log user message

        const API_URL = Bun.env.API_URL+Bun.env.API_KEY;
//        console.log('API URL', API_URL);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: body.userMessage }],
              },
            ],
          }),
        };

        /* Below is the real API call to Gemini, but it gets overloaded */
        // const response = await fetch(API_URL, requestOptions);
        // const data = await response.json();
        // // TODO: log response

        // if (!response.ok) throw new Error(data.error.message);
        // // TODO: log error

        // // Get the API response text and update the message element
        // const modelReply = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");

        const modelReply = "This is a mock response from the model. Replace with actual API call.";
        return Response.json({
          message: modelReply,
          error: null
        });
      }
    },
  },




  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },

});

console.log(`Listening on http://localhost:${server.port} ...`);