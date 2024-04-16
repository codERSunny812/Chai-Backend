## How to Connect backend with the front end?

There are  many ways to connect your front end with the backend that are. given below.but we will talk about the most used one.

* RestFul APIs:

  [****REST (Representational State Transfer)****](https://www.geeksforgeeks.org/rest-api-introduction/) is an architectural style for creating web services.  This is the most popular approach. It generally uses HTTP request and response methods in order to exchange data in a normalize format. The backend exposes different endpoints for multiple functionalities, and then frontend makes calls to these endpoints in order to retrieve or manipulate data.

### Procedure:

1. ****Client (Frontend)**** :

* Makes an HTTP request to a specific API endpoint (URL) on the server.
* Specifies the request method (GET, POST, PUT, DELETE) and the desired action.
* May include request body with data for specific actions like creation or update.

1. ****Server (Backend):****

   * Receives the request and identifies the targeted endpoint based on the URL and method.
   * Processes the request, accessing databases, performing calculations, or interacting with other services.
   * Prepares a response containing the requested data, status code (e.g., 200 for success), and any additional information.
2. ****Client:****

   * Receives the response and interprets the status code and data content.
   * Updates the user interface or performs further actions based on the returned information.

###### Example Source Code:

**Frontend**

```
// Making a GET request to the '/products/123' endpoint 
fetch('/products/123', { 
  method: 'GET', 
}) 
  // Handling the response by converting it to JSON 
  .then(response => response.json()) 
  // Handling the data obtained from the response 
  .then(data => { 
    // Update UI with product details from the response 
  }); 
```

**Backend**


```
app.get(‘/products/:id’, (req, res) => {
const productId = req.params.id;
// Fetch product data from database
db.getProduct(productId).then(product => {
res.json(product); // Send product data as JSON response
}).catch(error => {
res.status(500).send(error.message); // Handle error
});
});
```

#### Error in connection


CORS:


### CORS (Cross-Origin Resource Sharing):

 **Definition** : CORS is a security feature implemented by web browsers that controls access to resources from different origins (domains) on the internet.

 **Purpose** : It prevents a web page from making requests to a different domain than the one that served the web page. This helps to mitigate the risks of cross-origin attacks, such as cross-site scripting (XSS) and cross-site request forgery (CSRF).

 **How it Works** : When a web page makes a cross-origin request (e.g., an AJAX request), the browser checks the CORS policy set by the server for the requested resource. If the server allows cross-origin requests from the requesting domain, the browser permits the request to go through. Otherwise, it blocks the request.

 **Implementation** : CORS is implemented by web servers through the use of HTTP headers, specifically the `Access-Control-Allow-Origin` header. This header specifies which origins are allowed to access the resource. Servers can also configure other CORS-related headers to control additional aspects of cross-origin requests.



#### Proxy

A proxy server acts as an intermediary between a client (like a web browser) and another server (like a web server). Here's how it works:

1. **Client makes a request** : When a client (such as a web browser) wants to access a resource (like a webpage), it sends a request to the proxy server instead of directly to the destination server.
2. **Proxy forwards the request** : The proxy server receives the request from the client and forwards it to the destination server on behalf of the client.
3. **Destination server responds** : The destination server processes the request and sends a response back to the proxy server.
4. **Proxy forwards the response** : The proxy server receives the response from the destination server and forwards it back to the client.
