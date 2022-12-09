console.log("Shared worker created");

onconnect = function (event) {
  const port = event.ports[0];
  console.log("Shared worker connected");

  port.onmessage = function (e) {
    console.log("Shared worker got message");
    // port.postMessage(workerResult);
  };
};
