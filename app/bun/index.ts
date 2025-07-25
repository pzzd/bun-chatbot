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
//        log("Fetching random dog image...");

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

    "/api/model": {
      async GET(req) {
        const API_KEY = "PASTE-YOUR-API-KEY"; 
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(API_URL, {
          method: "GET"
        });
        const data = await response.json();

        return Response.json({
          method: "GET",
          data: data,
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