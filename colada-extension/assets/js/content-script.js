

function contentScript() {
  console.log("running injected content script...");

  
  function saveMessage(event) {
    const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : ''
    console.log('PARSED:', parsed);
    if (parsed && parsed.source === "colada") {
      console.log('message received from plugin...test');
      // const date = parsed.payload.timestamp;
      const date = Object.keys(parsed.payload)[0]
      chrome.storage.local.set({ [date] : parsed.payload}, () => {
        console.log('event data saved at key ', date)
      });
    }
  };

  window.addEventListener("message", saveMessage);
  window.addEventListener('load', () => {chrome.storage.local.clear()} );


  chrome.runtime.onMessage.addListener((message) => {
    if (message.source === 'colada-extension') {
    console.log("DEVTOOL message payload",message.payload);
    console.log("DEVTOOL message", JSON.stringify(message));
    window.postMessage(JSON.stringify(message), window.location.href)
    }
    if (message.source === 'colada-extension-clear') {
      window.location.reload();
    } 
  })
}

// function sendMessage() {

//   console.log("received message from devPanel")



// }

contentScript()

