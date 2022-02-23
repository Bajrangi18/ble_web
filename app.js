
    // function Log(msg){
    // document.querySelector('#logs').innerHTML =
    //                 document.querySelector('#logs').innerHTML + "<br>" + msg
    //
    // }

    var myCharacteristic;
    const btn = document.getElementById("btn");
    const text = document.getElementById("logs");

  btn.addEventListener("click", async event =>{
        navigator.bluetooth.requestDevice({
           acceptAllDevices: true,
           optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
       })
       .then(device => {
            log('Connecting to GATT Server...' + device.name );
          return device.gatt.connect();
       })
      .then(server => {
            log('Getting Service...');
         return server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
       })
      .then(service => {
            log('Getting Characteristic...');
            return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
       })
      .then(characteristic => {
         myCharacteristic = characteristic;
          return myCharacteristic.startNotifications().then(_ => {
          log('> Notifications started');
          myCharacteristic.addEventListener('characteristicvaluechanged',
          handleNotifications);
          });
       })
      .catch(error => {
           log(error);
      });
     }

  })

  function handleNotifications(event) {
  let value = event.target.value;
  let a = [];
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
  }
  log('> ' + a.join(' '));
 }



function log(data) {
  text.innerHTML = text.innerHTML + "<br>" + data;
}

// navigator.bluetooth.requestDevice({
//             acceptAllDevices: true,
//             optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
//         })
