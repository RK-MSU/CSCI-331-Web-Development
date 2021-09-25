# Advanced Javascript

## 7.4 Event-Driven Programming

The following are events for which web developers commonly write handlers.

- A **change** event is caused by an element value being modified. Ex: Selecting an item in a radio button group causes a change event.
- An **input** event is caused when the value of an input or textarea element is changed.
- A **load** event is caused when the browser completes loading a resource and dependent resources. Usually load is used with the body element to execute code once all the web page's CSS, JavaScript, images, etc. have finished loading.
- A **DOMContentLoaded** event is caused when the HTML file has been loaded and parsed, although other related resources such as CSS, JavaScript, and image files may not yet be loaded.
- A **focus** event is caused when an element becomes the current receiver of keyboard input. Ex: Clicking in an input field causes a focus event.
- A **blur** event is caused when an element loses focus and the element will no longer receive future keyboard input.
- A **submit** event is caused when the user submits a form to the web server.

### Capturing, at target, and bubbling phases

When an event occurs, the browser follows a simple DOM traversal process to determine which handlers are relevant and need to be called. This traversal process follows three phases: capturing, at target, and bubbling.

- In the **event capturing** phase, the browser traverses the DOM tree from the root to the event target node, at each node calling any event-specific handlers that were explicitly registered for activation during the capturing phase.
- In the **at target** phase, the browser calls all event-specific handlers registered on the target node.
- In the **event bubbling** phase, the browser traverses the DOM tree from the event target node back to the root node, at each node calling all event-specific handlers registered for the bubbling phase on the current node.

The optional third parameter for the `addEventListener()` method indicates whether the handler is registered for the capturing phase or bubbling phase.

- If the third parameter is **false** or not specified, or if the event handler is registered using any other mechanism, the browser registers the handler for the event bubbling phase.
- If the parameter is **true**, the browser registers the handler for the capturing phase.

Some events do not bubble, such as blur, focus, and change. When a non-bubbling event occurs, the browser will follow the event capturing phase, the at target phase, and then stop.

### Preventing default behavior

The event capturing and bubbling process can be stopped by calling the `stopPropagation()` method on the event object provided to the handler. Once stopPropagation() is called, the browser stops the traversal process but still calls relevant registered handlers on the current node.

A web developer may want to prevent the browser from using a built-in handler for an event. Ex: Whenever a user clicks a form's submit button, the web browser sends the form data to the web server. The event object's `preventDefault()` method stops the web browser from performing the built-in handler. The built-in handlers that are often prevented are clicking elements, submitting forms, and moving the mouse into or out of an element.

## XMLHttpRequest (Ajax)

**Ajax (Asynchronous JavaScript and XML)** is a technique to asynchronously communicate with a server and update a web page once the response is received, without reloading the whole web page. An asynchronous request occurs when the web application sends a request to the server and continues running without waiting for the server response. Although the "x" in Ajax stands for "XML", Ajax is used to transmit plain text, HTML, XML, and JSON.

**XMLHttpRequest** is an object for communicating with web servers using Ajax. Using the XMLHttpRequest object allows web browsers to hide the communication latency and continue to provide a responsive user interface while waiting for a server response. The XMLHttpRequest object defines handlers for events that occur during the request/response cycle. Ex: A response arrives at the browser, an error occurs during a request, etc. Using event-driven programming, the web application can continue providing a responsive interface and does not need to wait for a response from the server. The web application later updates the page once the response is received.

```JavaScript
function responseReceivedHandler() {
       console.log("handling response: " + this.responseText);
     }

let xhr = new XMLHttpRequest();
xhr.addEventListener("load", responseReceivedHandler);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
// xhr.responseType = "json";
xhr.open("GET", "http://www.example.org/example.html");
xhr.send();



// another example
let file = document.getElementById("file_widget").files[0];
let xhr = new XMLHttpRequest();
xhr.upload.addEventListener("progress", uploadProgressHandler);
xhr.open("POST", "http://www.example.org/example.html");
xhr.setRequestHeader("Content-Type", file.type);
xhr.send(file);

```

### XMLHttpRequest result handlers

Good practice is to use a result handler for each specific result to separate functionality for each Ajax event. Ex: Error handling, progress bars, updating the user interface on success, etc. The XMLHttpRequest result handlers are:

- The **load** handler is called when the exchange between the browser and server has completed. From the browser's perspective, the server received the request and responded. However, the request might not have been successful because of a problem such as a non-existent web page. The HTTP status code must be examined to check which type of response was received. Ex: 200 vs. 404. The load, error, and abort handlers are mutually exclusive and are called after any progress handlers.
- The **error** handler is called when the browser does not receive an appropriate response to a request. Ex: The browser is unable to connect to the server, the connection between browser and server is cut in the middle of a response, etc.
- The **abort** handler is called when the browser is told to stop a request/response that is still in progress. Ex: The user closes the web page that made the request.
- The **timeout** handler is called if the browser takes too much time to fully receive a response to a request. The timeout is an optional value that can be provided before the request is made. By default, the browser does not provide a timeout for a request.

### XMLHttpRequest progress handlers

XMLHttpRequest progress handlers are:

- The **loadstart** handler is called when the browser begins to send a request. The loadstart handler is called before any other XMLHttpRequest handler.
- The **loadend** handler is called after the browser receives the response. The loadend handler is called upon both response success and failure, and is called after all other XMLHttpRequest handlers.
- The **progress** handler is called one or more times while a response is being received by the client. Progress handlers are called before result handlers. The progress handler can be used to provide a data download progress indicator to the user. A similar handler is available to provide an indicator for uploaded data.

### Accessing Ajax response data

The XMLHttpRequest object provides multiple ways to access the response data.

- The **response** attribute is the response body, which is parsed by the browser according to the `responseType` attribute.
- The **responseText** attribute is the plain text version of the response.
- The **responseXML** attribute is the XML DOM version of the response. The responseXML attribute is only available as a DOM object if the response is a valid and correctly formatted XML document.

The responseType attribute is set by the programmer to let the browser know the expected response data format.

- If the `responseType` attribute is set to "json", then the browser parses the entire response as a JSON object and sets the `response` attribute to the JSON object.
- If the `responseType` attribute is either "" or "text", the browser leaves the response unprocessed, and the response attribute contains the same value as `responseText`.
- If the `responseType` attribute is "document", the browser assumes the response is an XML document, and the response attribute contains the same value as `responseXML`.

## WebSockets

```JavaScript
let websocket = new WebSocket("wss://echo.websocket.org/");
        
websocket.onopen = function() { 
   displayMessage("Connected");
   websocket.send("Hello, WebSockets!"); 
};
        
websocket.onclose = function() { 
   displayMessage("Disconnected");
};

websocket.onmessage = function(e) {
   displayMessage(e.data);
   websocket.close();
};
        
function displayMessage(message) {
   let para = document.createElement("p");
   para.innerHTML = message;
   document.getElementById("output").appendChild(para);
}
```