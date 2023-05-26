import React, { useState } from 'react';
import Button from './Button';

const ToggleButton = ({ label = 'Switch' }) => {

  const serviceUUID = '6e400000-b5a3-f393-e0a9-e50e24dcca9e';
  const characteristicUUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';

  const serviceIdTrainingCtrl = "6e600000-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidSessionCtrl = "6e600001-b5a3-f393-e0a9-e50e24dcca9e";

  const serviceIdStatus = "6e700000-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidSessionStatus = "6e700002-b5a3-f393-e0a9-e50e24dcca9e";

  const [isChecked, setIsChecked] = useState(false);
  const [bleDevice, setBleDevice] = useState();
  const [bleGatServer, setBleGatServer] = useState();

  const handleToggle = () => {
    // setIsChecked(!isChecked);
    if (!isChecked) {
      connectNexi()
    } else {
      disconnectNexi()
    }
  };

  const connectNexi = async () => {
    console.log("navigator", navigator)
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [serviceUUID, serviceIdTrainingCtrl, serviceIdStatus]
    })
    console.log('device:', device)
    if (device) {
      setBleDevice(device)
      let bleDevice = device;
      bleDevice.gatt
        .connect()
        .then((server) => {
          setBleGatServer(server)
          // bleGattServer = server;
          // setBleGattServer(server)
          // setConnected(true);
          console.log('BLE Connected', server);
          setIsChecked(true)
        })
        .catch((error) => {
          console.log('error', error);
          setIsChecked(false)
        });
    }
  }

  const disconnectNexi = () => {
    if (!bleDevice) {
      setIsChecked(false)
      return;
    }
    console.log('Disconnecting from Bluetooth Device...');
    if (bleDevice.gatt.connected) {
      bleDevice.gatt.disconnect();
      setIsChecked(false)
    } else {
      console.log('> Bluetooth Device is already disconnected');
      setIsChecked(false)
    }
  }



  const sessionData = {
    "SessionNo": 1,
    "Trainings": [
      {
        "Duration": 60,
        "Frequencies": [2000, 2000, 3000]
      }
    ]
  }

  const handleStartTraining = () => {
    bleGatServer.getPrimaryService(serviceUUID)
      .then(async(service) => {
        console.log("🚀 ~ file: ToggleButton.jsx:78 ~ handleStartTraining ~ service:", service)
        service.getCharacteristic(characteristicUUID)
          .then(characteristic => {
            console.log("🚀 ~ file: ToggleButton.jsx:82 ~ handleStartTraining ~ characteristic:", characteristic)
            characteristic.readValue()
              .then(value => {
                console.log("🚀 ~ file: ToggleButton.jsx:96 ~ handleStartTraining ~ value:", value)
                // var enc = new TextDecoder();
                // var txtValueOfCh = enc.decode(value);
                // console.log(`Characteristic value is ` + txtValueOfCh);
                // document.getElementById("p1").innerHTML = "SSID: " + txtValueOfCh;
              }).catch(error => {
                console.log("Error reading characteristic value", error);
              })
          }).catch(error => {
            console.log("Error getting characteristic");
          })
      }).catch(error => {
        console.log("Error getting service", error);
      });
  }


  const ReadDeviceCharacteristic = () => {

    console.log('Requesting BLE device info');

    bleGatServer.getPrimaryService(serviceUUID)
    .then(service => {
        service.getCharacteristic(characteristicUUID)
        .then(characteristic => {
            characteristic.readValue()
            .then(value => {
                var enc = new TextDecoder();
                var txtValueOfCh = enc.decode(value);
                console.log('Characteristic value is ' + txtValueOfCh);
                // document.getElementById("p1").innerHTML = "SSID: " + txtValueOfCh;
            }).catch(error => {
                console.log("Error reading characteristic value");
            })
        }).catch(error => {
            console.log("Error getting characteristic");
        })
    }).catch(error => {
        console.log("Error getting service");
    });
}


  const WriteDeviceCharacteristic = () => {

    console.log('Requesting BLE device info');

    bleGatServer.getPrimaryService(serviceUUID)
    .then(service => {
        service.getCharacteristic(characteristicUUID)
        .then(characteristic => {

            var enc = new TextEncoder();
            var ssidStr = sessionData;
            console.log(ssidStr);
            var valToBLE = enc.encode(ssidStr);
            characteristic.writeValue(valToBLE).
            then(() => {
              console.log("Value written to Characteristic")
            })
            .catch( error => {
                console.log("Error writing to characteristic value", error);
            })
        }).catch(error => {
            console.log("Error getting characteristic", error);
        })
    }).catch(error => {
        console.log("Error getting service", error);
    });
}


  const setStatusToStart = () => {
    bleGatServer.getPrimaryService(serviceIdTrainingCtrl)
    .then(service => {
        service.getCharacteristic(characteristicidSessionCtrl)
        .then(characteristic => {

            var enc = new TextEncoder();
            var ssidStr = "0";
            console.log(ssidStr);
            var valToBLE = enc.encode(ssidStr);
            characteristic.writeValue(valToBLE).
            then(() => {
              console.log("Value written to Characteristic")
            })
            .catch( error => {
                console.log("Error writing to characteristic value", error);
            })
        }).catch(error => {
            console.log("Error getting characteristic", error);
        })
    }).catch(error => {
        console.log("Error getting service", error);
    });
  }


  const getSessionStatus = () => {
    console.log('getSessionStatus');

    bleGatServer.getPrimaryService(serviceIdStatus)
    .then(service => {
        service.getCharacteristic(characteristicidSessionStatus)
        .then(characteristic => {
            characteristic.readValue()
            .then(value => {
                var enc = new TextDecoder();
                var txtValueOfCh = enc.decode(value);
                console.log('Characteristic value is ' + txtValueOfCh);
                // document.getElementById("p1").innerHTML = "SSID: " + txtValueOfCh;
            }).catch(error => {
                console.log("Error reading characteristic value");
            })
        }).catch(error => {
            console.log("Error getting characteristic");
        })
    }).catch(error => {
        console.log("Error getting service");
    });
  }



  return (
    <>
      <Button
        onClick={ReadDeviceCharacteristic}
      >ReadDeviceCharacteristic</Button>
      <Button
        onClick={WriteDeviceCharacteristic}
      >WriteDeviceCharacteristic</Button>
      <Button
        onClick={setStatusToStart}
      >setStatusToStart</Button>
      <Button
        onClick={getSessionStatus}
      >getSessionStatus</Button>
      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer mx-2"
        htmlFor="flexSwitchCheckDefault"
      >
        {label}
      </label>
      <input
        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-purple-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none  checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12]  focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-['']"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        checked={isChecked}
        onChange={handleToggle}

      />
    </>
  );
};

export default ToggleButton;
