import { serve } from "bun";
import chatbot from "./chatbot/index.html";
import BunLogger from "./logger.js";

const logger = BunLogger;



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
      }
    },

    "/api/ask-nobody": {
        async POST(req) {
          console.log("Incoming call to /api/ask-nobody");
          const body = await req.json();
          const modelReply = "This is a mock response.";
          logger.log(`{ "userMessage": "${body.userMessage}", "model": "nobody", "modelReply": "${modelReply}" }`);

          return Response.json({
            message: modelReply,
            error: null
          });
        }
    },

    "/api/ask-gemini": {
      async POST(req) {
        console.log("Incoming call to /api/ask-gemini");

        const body = await req.json();
        const API_URL = Bun.env.API_URL+Bun.env.API_KEY;

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
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        // TODO: log whole response?

//      //  if (!response.ok) throw new Error(data.error.message);
        // TODO: log error?

        // Get the API response text and update the message element
        var modelReply = "";
        if (response.ok) {
          modelReply = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
        } else {
          modelReply = `Error: ${data.error.message}`;
        }
        logger.log(`{ "userMessage": "${body.userMessage}", "model": "gemini", "modelReply": "${modelReply}" }`);

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