//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
// import Card from './card';
import { btoa } from 'react-native-quick-base64';
import { atob } from 'react-native-quick-base64';
import { ScrollView } from 'react-native-gesture-handler';
import { out } from 'react-native/Libraries/Animated/Easing';
import {check, PERMISSIONS, RESULTS, requestMultiple} from 'react-native-permissions';

var counter=0;
var bleConnected = false;
var bleManager;
var bleManagerInitialized = false;
var periodicSessionUpdateStarted = false;

const trainingInitialValue = 

'{\n' +
'  "SessionNo":1,\n' +
'  "Trainings":[\n' +
'  {\n' +
'    "Duration":1,\n' +
'	 "Frequencies":[1000.00,2000.00,3000.00]\n' +
' },{\n' +
'    "Duration":1,\n' +
'	 "Frequencies":[100.20,200.10]\n' +
' },{\n' +
'    "Duration":2,\n' +
'	 "Frequencies":[1005.00,2001.00,3001.00]\n' +
'  }]\n' +
'}';



wiFiSettingsNotFetched = true;
// create a component
const BluetoothScreen = ({ navigation }) => {

  const [connectedDevice, setConnected] = useState();
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [apSsid, setApSsid] = useState('');
  const [apPasswd, setApPasswd] = useState('');
  const [hsSsid, setHsSsid] = useState('');
  const [hsPasswd, setHsPasswd] = useState('');
  const [newSession, setNewSession] = useState('');
  const [newTraining, setNewTraining] = useState('');
  const [errorDisplay, setErrorDisplay] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [startFrequency, setStartFrequency] = useState('');
  const [endFrequency, setEndFrequency] = useState('');
  const [jump, setJump] = useState('');
  const [duration, setDuration] = useState('');
  const [frequencyArray, setFrequencyArray] = useState([]);
  const [frequencyCounter, setFrequencyCounter] = useState('');
  const [singleFrequency, setSingleFrequency] = useState('');
  const [batteryStatus, setBatteryStatus] = useState('');
  const [sessionStatus, setSessionStatus] = useState('Unknown');
  const [renderConecting, setRenderConecting] = useState(true);

  const serviceIdWiFiSettings =     "6e400000-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidApSsid =    "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidApPasswd =  "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidHsSsid =    "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidHsPasswd =  "6e400004-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidOta =       "6e400005-b5a3-f393-e0a9-e50e24dcca9e";

  const serviceIdTrainingSettings =     "6e500000-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidSessionData =   "6e500001-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidTrainingData =  "6e500002-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidFrequencyData = "6e500003-b5a3-f393-e0a9-e50e24dcca9e";

  const serviceIdTrainingCtrl =       "6e600000-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidSessionCtrl = "6e600001-b5a3-f393-e0a9-e50e24dcca9e";

  const serviceIdStatus =               "6e700000-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidBatteryStatus = "6e700001-b5a3-f393-e0a9-e50e24dcca9e";
  const characteristicidSessionStatus = "6e700002-b5a3-f393-e0a9-e50e24dcca9e";

  //check if bluetooth is enabled. If not ask user permission to enable Bluetooth.

  var bleDevice;

  var disconnectCalled = false;

  if(!bleManagerInitialized) {
    console.log("Creating new BLE");
    bleManager = new BleManager();
    bleManagerInitialized = true;
  }

  const navigate = screen => {
    if (screen) {
      navigation.navigate(screen);
    }
  };

  const Disconnect = () => {

    // bleManager
    // ?.isDeviceConnected(connectedDevice?.id)
    // .then( response => {
    //   //if (response == true) {
    //     bleManager.destroy();
    //   //}
    // }).catch(error => {
    //   bleManager.destroy();
    // });


    bleManager?.destroy();
    counter=0;
    bleConnected = false;
    wiFiSettingsNotFetched = true;
    bleManagerInitialized = false;

    //navigate('HomeScreen');
  };

  // bleManager.enable().then( () => {
  //   console.log("BLE Enabled");
  // }).catch( (reason) => {
  //   console.log("BLE not enabled");
  //   console.log("reason");
  // });

  // navigation.addListener('beforeRemove', (e) => {
  //   navigation.removeAllListeners();
  //   console.log("back screen pressed");
  //   //e.preventDefault();
  //   if(!disconnectCalled) {
  //     disconnectCalled = true;
  //     console.log("Disconnect called");
  //     try {
  //       Disconnect();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      console.log("back screen pressed");
      Disconnect();
      // Screen was focused
      // Do something
    });

    return unsubscribe;
  }, [navigation]);
  
  // async function requestPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Bluetooth permission for bluetooth scanning',
  //         message: 'wahtever',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Location permission for bluetooth scanning granted');
  //       return true;
  //     } else {
  //       console.log(
  //         'Location permission for bluetooth scanning revoked',
  //         granted,
  //       );
  //       return false;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // }

  async function requestPermission() {
    try {
      const granted = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
      ]);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('All permission for bluetooth scanning granted');
        return true;
      } else {
        console.log(
          'Location permission for bluetooth scanning revoked',
          granted,
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  // get Paired Devices on screen mount.

  const fetchAndConnect = async () => {
    //requestPermission();
    await requestPermission();
    //if (await requestPermission()) {
    if(true) {
      await bleManager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, scannedDevice) => {
          if (error) {
            console.log('Scan error', error);
            console.log(JSON.stringify(error));
          } else {
            //console.log("Scan successfull");
            //console.log(scannedDevice);
            if (scannedDevice?.name == 'NEXI_DEV') {
              bleManager
                .connectToDevice(scannedDevice?.id)
                .then(device => {
                  bleDevice = device;
                  //console.log("$$$ BLEDEV IS ", bleDevice);
                  setConnected(scannedDevice);
                  setIsDeviceConnected(true);
                  setRenderConecting(false);
                  setNewTraining(trainingInitialValue);
                  bleConnected = true;
                  ToastAndroid.show(
                    `connected to device: ${device?.name}`,
                    ToastAndroid.SHORT,
                  );
                })
                .catch(error => {
                  console.log("BLE Could not connect ", error);
                  ToastAndroid.show(
                    `couldn't connect to device: ${device?.name}`,
                    ToastAndroid.SHORT,
                  );
                  console.log('Error Connection', error);
                });
              bleManager.stopDeviceScan();
            }
          }
        },
      );
    } else {
      requestPermission();
    }
  };

  const sendApSettings = () => {
    setErrorDisplay('');
    try {
      var apJsonInput = JSON.parse(apSsid);
      console.log("SSID IS " + apJsonInput.Ssid);
      console.log("SSID IS " + apJsonInput.Passwd);

      sendApSsid(apJsonInput.Ssid);
      sendApPasswd(apJsonInput.Passwd);
      ToastAndroid.show(
        `A-P Settings Sent`,
        ToastAndroid.SHORT,
      );

    } catch (error) {
      console.log("ERROR: " + error);
      setErrorDisplay(''+ error);
      ToastAndroid.show(
        `Error...`,
        ToastAndroid.SHORT,
      );
    }
  }

  const sendApSsid = (ssid) => {
    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdWiFiSettings,
            characteristicidApSsid,
            btoa(ssid),
          ).then( (res)=> {
            //console.log(res);
            ToastAndroid.show(
              `A-P SSID Sent`,
              ToastAndroid.SHORT,
            );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const sendApPasswd = (passwd) => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdWiFiSettings,
            characteristicidApPasswd,
            btoa(passwd),
          ).then( (res)=> {
            //console.log(res);
            ToastAndroid.show(
              `A-P Passwd Sent`,
              ToastAndroid.SHORT,
            );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const sendHSSettings = () => {
    setErrorDisplay('');
    try {
      var hsJsonInput = JSON.parse(hsSsid);
      console.log("SSID IS " + hsJsonInput.Ssid);
      console.log("SSID IS " + hsJsonInput.Passwd);
  
      sendHSSsid(hsJsonInput.Ssid);
      sendHSPasswd(hsJsonInput.Passwd);

      ToastAndroid.show(
        `H-S Settings Sent`,
        ToastAndroid.SHORT,
      );
  
      } catch (error) {
        console.log("ERROR: " + error);
        setErrorDisplay('' + error);

        ToastAndroid.show(
          `Error...`,
          ToastAndroid.SHORT,
        );
      }
      

  }

  const sendHSSsid = (ssid) => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdWiFiSettings,
            characteristicidHsSsid,
            btoa(ssid),
          ).then( (res)=> {
            // ToastAndroid.show(
            //   `H-S Ssid Sent`,
            //   ToastAndroid.SHORT,
            // );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const sendHSPasswd = (passwd) => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdWiFiSettings,
            characteristicidHsPasswd,
            btoa(passwd),
          ).then( (res)=> {
            // ToastAndroid.show(
            //   `H-S Passwd Sent`,
            //   ToastAndroid.SHORT,
            // );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const sendFirmwareUpdateCmd = (linkType) => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdWiFiSettings,
            characteristicidOta,
            btoa(linkType),
          ).then( (res)=> {
            // ToastAndroid.show(
            //   `H-S Ssid Sent`,
            //   ToastAndroid.SHORT,
            // );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const sendFirmwareUpdateOverAP = () => {
    setErrorDisplay('');
    try {

      sendFirmwareUpdateCmd("AP");

      ToastAndroid.show(
        `Firmware over AP cmd Sent`,
        ToastAndroid.SHORT,
      );

     // bleManager.destroy();
      navigate('WifiScreen');
  
      } catch (error) {
        console.log("ERROR: " + error);
        setErrorDisplay('' + error);

        ToastAndroid.show(
          `Error...`,
          ToastAndroid.SHORT,
        );
      }
  }

  const sendFirmwareUpdateOverHS = () => {
    setErrorDisplay('');
    try {

      sendFirmwareUpdateCmd("HS");

      ToastAndroid.show(
        `Firmware over HS cmd Sent`,
        ToastAndroid.SHORT,
      );

    //  bleManager.destroy();
      navigate('WifiScreen');
  
      } catch (error) {
        console.log("ERROR: " + error);
        setErrorDisplay('' + error);

        ToastAndroid.show(
          `Error...`,
          ToastAndroid.SHORT,
        );
      }
  }

  const sendSessionData = () => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdTrainingSettings,
            characteristicidSessionData,
            btoa(sessionData),
          ).then( (res)=> {
            // ToastAndroid.show(
            //   `Session Data Sent`,
            //   ToastAndroid.SHORT,
            // );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  var inputJSON;
  var sessionNum;
  var trainingDataArray = [];
  var frequencyDataArray = [];
  var sessionData = '';

  const parseInputJSON = () => {

    trainingDataArray = [];
    frequencyDataArray = [];

    try {
      inputJSON = JSON.parse(newTraining);
      sessionNum = inputJSON.SessionNo;
      console.log("SESION NUM IS " + sessionNum);
      console.log("Total Len is " + Object.keys(inputJSON).length);

      var numTotalTrainings = Object.keys(inputJSON.Trainings).length;
      console.log("Total trainings is " + numTotalTrainings);

      var numTotalFrequencies = 0;
      for (var i=0; i<numTotalTrainings; i++) {
        var duration = inputJSON.Trainings[i].Duration;
        var numFreqs = Object.keys(inputJSON.Trainings[i].Frequencies).length;
        trainingData = '' + numFreqs + ',' + duration;
        trainingDataArray.push(trainingData);
        numTotalFrequencies += numFreqs;

        for(var j=0; j<numFreqs; j++) {
          frequencyDataArray.push(inputJSON.Trainings[i].Frequencies[j]);
        }
      }

      sessionData = '' + numTotalTrainings + "," + numTotalFrequencies;
      console.log("SESSION DATA IS " + sessionData);
      for(var i=0; i<trainingDataArray.length; i++) {
        console.log("Traing data " + trainingDataArray[i]);
      }

      for(var i=0; i<frequencyDataArray.length; i++) {
        console.log("Frequency data " + frequencyDataArray[i]);
      }

      return true;

    }catch(error) {
      console.log("ERRORR: " + error);
      setErrorDisplay('' + error);
      ToastAndroid.show(
        `Error...`,
        ToastAndroid.SHORT,
      );
      return false;
    }
  }

  const startSendingSessionInfo = () => {
    setErrorDisplay('');
    if(!parseInputJSON()) {
      console.log("JSON Parsing error");
      return;
    }

    sendSessionData();
    for(var i=0; i<trainingDataArray.length; i++) {
      console.log("Traing data " + trainingDataArray[i]);
      sendTrainingData(trainingDataArray[i]);
    }

     for(var i=0; i<frequencyDataArray.length; i++) {
      console.log("Frequency data is " + frequencyDataArray[i]);
      sendSingleFrequency(frequencyDataArray[i]);
     }

    ToastAndroid.show(
      `Training Data Sent`,
      ToastAndroid.SHORT,
    );
  }

  const sendTrainingData = (trainingData) => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdTrainingSettings,
            characteristicidTrainingData,
            btoa(trainingData),
          ).then( (res)=> {
            // ToastAndroid.show(
            //   `Session Data Sent`,
            //   ToastAndroid.SHORT,
            // );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const sendSingleFrequency = (frequencyData) => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdTrainingSettings,
            characteristicidFrequencyData,
            btoa(frequencyData+",100"),
          ).then( (res)=> {
            // ToastAndroid.show(
            //   `Frequency Data Sent`,
            //   ToastAndroid.SHORT,
            // );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const sendSessionStartCmd = status => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.writeCharacteristicWithoutResponseForService(
            serviceIdTrainingCtrl,
            characteristicidSessionCtrl,
            btoa(status),
          ).then( (res)=> {
            var toastStr;
            if(status == '0') {
              toastStr = 'Training Started';
            } else if(status == '1') {
              toastStr = 'Training Stopped';
            } else {
              toastStr = 'Training Restarted'
            }  
            ToastAndroid.show(
              toastStr,
              ToastAndroid.SHORT,
            );
          }).catch(reason => {
            console.log("###ERR2: ", reason);
          })
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const getBatteryStatus = () => {

    if(bleManager && connectedDevice) {

      bleManager
      ?.isDeviceConnected(connectedDevice?.id)
      .then( response => {
        if (response == true) {
          connectedDevice?.discoverAllServicesAndCharacteristics()
          .then(device => {
            device.readCharacteristicForService(serviceIdStatus, characteristicidBatteryStatus).then(
              (value) => {
                console.log("BYT STATUS READ 1");
                console.log(atob(value.value));
                updateBatteryStatus(atob(value.value));
              }
            ).catch(
              (reason) => {
                console.log("BYT STATUS READ FAILED 1");
                console.log(reason);
              }
            );
          }).catch( reason => {
            console.log("$$$ERROR ", reason);
          })
        }
      }).catch(error => {
        console.log("FAILED TO WRITE SESSION: ", error);
        ToastAndroid.show(
          `Failed To write Training Settings`,
          ToastAndroid.SHORT,
        );
        console.log('Writing service error: ', error);
      });
    } else {
      console.log("In getBatteryStatus(), bleManager is null");
    }
  };

  const updateBatteryStatus = (strBatteryStatus) => {
    var batteryLevels = strBatteryStatus.split(",");

    var batteryVoltage = Number(batteryLevels[0]);
    var usbVoltage = Number(batteryLevels[1]);
    var fimwareVesion = batteryLevels[2];

    var batteryPercentage;

    if (batteryVoltage < 3300) {
      batteryPercentage = 0;
    } else if (batteryVoltage > 3900) {
      batteryPercentage = 100;
    } else {
      batteryPercentage = ((batteryVoltage - 3300) * 100) / 600;
      batteryPercentage = batteryPercentage.toFixed(0);
    }

    if (usbVoltage > 3900) {
      setBatteryStatus(batteryPercentage.toString() + "%, " + "Charging" + "\nVER: " + fimwareVesion );
    } else {
      setBatteryStatus(batteryPercentage.toString() + "%, " + "Discharging" + "\nVER: " + fimwareVesion );
    }
  }

  const getSessionStatus = () => {

    if(bleManager && connectedDevice) {
      bleManager
      ?.isDeviceConnected(connectedDevice?.id)
      .then( response => {
        if (response == true) {
          connectedDevice?.discoverAllServicesAndCharacteristics()
          .then(device => {
            device.readCharacteristicForService(serviceIdStatus, characteristicidSessionStatus).then(
              (value) => {
                console.log("SESSION STATUS READ 1");
                console.log(atob(value.value));
                updateSessionStatus(atob(value.value));
              }
            ).catch(
              (reason) => {
                console.log("SESSION STATUS READ FAILED 1");
                console.log(reason);
              }
            );
          }).catch( reason => {
            console.log("$$$ERROR ", reason);
          })
        }
      }).catch(error => {
        console.log("FAILED TO WRITE SESSION: ", error);
        ToastAndroid.show(
          `Failed To write Training Settings`,
          ToastAndroid.SHORT,
        );
        console.log('Writing service error: ', error);
      });

    } else {
      console.log("in getSessionStatus() bleManager is null ");
    }
  };

  const updateSessionStatus = (strSessionStatus) => {

    if(strSessionStatus == "IDLE") {
      setSessionStatus("\tIDLE");
    } else {
      var sessionValues = strSessionStatus.split(",");

      var currentTrainingNum = Number(sessionValues[0]);
      var totalTrainings = Number(sessionValues[1]);
      var trainingCompletedDuration = Number(sessionValues[2]);
      var trainingTotalDuration = Number(sessionValues[3]);
      var sessionCompletedDuration = Number(sessionValues[4]);
      var sessionTotalDuration = Number(sessionValues[5]);

      sessionCompletedDuration += trainingCompletedDuration;

      setSessionStatus("Training:\t\t\t" + currentTrainingNum.toString() + " of " + totalTrainings.toString() + "\n" +
                        "Completed:\t\t" + trainingCompletedDuration.toString() + "s of " + trainingTotalDuration.toString() + "s\n" +
                        "Total Session:\t" + sessionCompletedDuration.toString() + "s of " + sessionTotalDuration.toString() + "s"
      );
    }
  }

  const getWiFiSettings = () => {
    getWiFiAPSsid();
    getWiFiAPPasswd();
    getWiFiHsSsid();
    getWiFiHsPasswd();
  }
  
  var apSSidReadFromNexi = '';
  const getWiFiAPSsid = () => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.readCharacteristicForService(serviceIdWiFiSettings, characteristicidApSsid).then(
            (value) => {
              console.log("BYT STATUS READ 1");
              console.log(atob(value.value));
              //setApSsid(atob(value.value));
              apSSidReadFromNexi = atob(value.value);
            }
          ).catch(
            (reason) => {
              console.log("BYT STATUS READ FAILED 1");
              console.log(reason);
            }
          );
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  var apPasswdReadFromNexi = '';
  const getWiFiAPPasswd = () => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.readCharacteristicForService(serviceIdWiFiSettings, characteristicidApPasswd).then(
            (value) => {
              console.log("BYT STATUS READ 1");
              console.log(atob(value.value));
              //setApPasswd(atob(value.value));
              apPasswdReadFromNexi = atob(value.value);
              //setApSsid(apSSidReadFromNexi + "," + apPasswdReadFromNexi);
              var wiFiJson = {Ssid: apSSidReadFromNexi, Passwd:  apPasswdReadFromNexi};
              var displayWiFiStr = JSON.stringify(wiFiJson);
              setApSsid(displayWiFiStr);
            }
          ).catch(
            (reason) => {
              console.log("BYT STATUS READ FAILED 1");
              console.log(reason);
            }
          );
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  var hsSSidReadFromNexi = '';
  const getWiFiHsSsid = () => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.readCharacteristicForService(serviceIdWiFiSettings, characteristicidHsSsid).then(
            (value) => {
              console.log("BYT STATUS READ 1");
              console.log(atob(value.value));
              //setHsSsid(atob(value.value));
              hsSSidReadFromNexi = atob(value.value);
            }
          ).catch(
            (reason) => {
              console.log("BYT STATUS READ FAILED 1");
              console.log(reason);
            }
          );
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  var hsPasswdReadFromNexi = '';
  const getWiFiHsPasswd = () => {

    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.readCharacteristicForService(serviceIdWiFiSettings, characteristicidHsPasswd).then(
            (value) => {
              console.log("BYT STATUS READ 1");
              console.log(atob(value.value));
              //setHsPasswd(atob(value.value));
              hsPasswdReadFromNexi = atob(value.value);
              //setHsSsid(hsSSidReadFromNexi + "," + hsPasswdReadFromNexi);
              var wiFiJson = {Ssid: hsSSidReadFromNexi, Passwd:  hsPasswdReadFromNexi};
              var displayWiFiStr = JSON.stringify(wiFiJson);
              setHsSsid(displayWiFiStr);
            }
          ).catch(
            (reason) => {
              console.log("BYT STATUS READ FAILED 1");
              console.log(reason);
            }
          );
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO WRITE SESSION: ", error);
      ToastAndroid.show(
        `Failed To write Training Settings`,
        ToastAndroid.SHORT,
      );
      console.log('Writing service error: ', error);
    });
  };

  const StartMonitoringBtyStatus = () => {
    
    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.monitorCharacteristicForService(
            serviceIdStatus,
            characteristicidBatteryStatus,
            (err, characteristic) => {
              if(err) {
                console.log("Error while setting monitoring BTY STATUS");
              } else {
                console.log("Success in monitoring BTY STATUS");
                //console.log(atob(characteristic.value));
                updateBatteryStatus(atob(characteristic.value));
              }
            }
          );
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO START BTY MONITORING: ", error);
      ToastAndroid.show(
        `Failed To START BTY STATUS MONITORING`,
        ToastAndroid.SHORT,
      );
      console.log('Error In BTY STATUS MONITORING: ', error);
    });
  }

  const StartMonitoringSessionStatus = () => {
    
    bleManager
    ?.isDeviceConnected(connectedDevice?.id)
    .then( response => {
      if (response == true) {
        connectedDevice?.discoverAllServicesAndCharacteristics()
        .then(device => {
          device.monitorCharacteristicForService(
            serviceIdStatus,
            characteristicidSessionStatus,
            (err, characteristic) => {
              if(err) {
                console.log("Error while setting monitoring SESSION STATUS");
              } else {
                console.log("Success in monitoring SESSION STATUS");
                //console.log(atob(characteristic.value));
                updateSessionStatus(atob(characteristic.value));
              }
            }
          );
        }).catch( reason => {
          console.log("$$$ERROR ", reason);
        })
      }
    }).catch(error => {
      console.log("FAILED TO START SESSION MONITORING: ", error);
      ToastAndroid.show(
        `Failed To START SESSION STATUS MONITORING`,
        ToastAndroid.SHORT,
      );
      console.log('Error In SESSION STATUS MONITORING: ', error);
    });
  }

  tOuted = () => {
    counter ++;
    console.log("### ", counter);

    if(!bleConnected) {
      //fetchAndConnect();
      setTimeout(tOuted, 1500);
    }

  }

  if(!bleConnected) {
    fetchAndConnect();
    setTimeout(tOuted, 1500);
  }

  // getPeriodicStatus = () => {
  //   getSessionStatus(); 
  //   getBatteryStatus();
  //   setTimeout(getPeriodicStatus,2000);
  // }

  // if(bleConnected && !periodicSessionUpdateStarted) {
  //   periodicSessionUpdateStarted = true;
  //   setTimeout(getPeriodicStatus,2000);
  // }

  if(renderConecting) {
    return (
      <ScrollView>
        <Text style={{ color: 'black' }}>
              Connecting over BLE. Plz Wait...
            </Text>
      </ScrollView>
    );
  } else {

    if(wiFiSettingsNotFetched) {
       getWiFiSettings();
       wiFiSettingsNotFetched = false;

       StartMonitoringBtyStatus();
       StartMonitoringSessionStatus();
    }
    
    return (
      <ScrollView>
        <View style={styles.container}>

          <Text style={styles.heading}>
            Connected To device: {connectedDevice?.name}
          </Text>
          {isDeviceConnected && <Text>connected via BLE </Text>}

           <TextInput
            multiline = {true}
            style={styles.errorOut}
            value={errorDisplay}
            onChangeText={text => {
              setErrorDisplay(text);
            }}
            placeholder="Error display"
            placeholderTextColor="grey"
          />
          <TextInput
            multiline = {true}
            style={styles.inputTrainings}
            value={newTraining}
            onChangeText={text => {
              setNewTraining(text);
            }}
            placeholder="JSON Format"
            placeholderTextColor="grey"
          />

          <Button
            style={{color: 'blue'}} 
            onPress={() => startSendingSessionInfo()}
            title="Send Trainings Data"
          ></Button>

          <Text>---</Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendSessionStartCmd('0')}
            title="START TRAINING"
          ></Button>

          <Text>---</Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendSessionStartCmd('1')}
            title="STOP TRAINING"
          ></Button>

          <Text>---</Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendSessionStartCmd('2')}
            title="PAUSE TRAINING"
          ></Button>

          <Text>---</Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendSessionStartCmd('3')}
            title="RESUME TRAINING"
          ></Button>

          <Text style={{ color: 'black' }}>
            BatteryStatus: {batteryStatus}
          </Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => getBatteryStatus()}
            title="GET BTY STATUS"
          ></Button>

          <Text style={{ color: 'black' }}>
            Session Status:{"\n"}{sessionStatus}
          </Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => getSessionStatus()}
            title="GET SESSION STATUS"
          ></Button>
        </View>

        <TextInput
            style={styles.input}
            value={apSsid}
            // editable={isDeviceConnected}
            onChangeText={text => {
              setApSsid(text);
            }}
            placeholder="Access-Point Settings"
            placeholderTextColor="grey"
          />

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendApSettings()}
            title="Save Access Point Settings"
          ></Button>

          {/*<TextInput
            style={styles.input}
            value={hsSsid}
            // editable={isDeviceConnected}
            onChangeText={text => {
              setHsSsid(text);
            }}
            placeholder="Hotspot Settings"
            placeholderTextColor="grey"
          />

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendHSSettings()}
            title="Save Hotspot Settings"
          ></Button>*/}

          <Text>---</Text>

          <Button
            style={{color: 'blue'}} 
            onPress={() => sendFirmwareUpdateOverAP()}
            title="Updater Firmware"
          ></Button>

          <Text>---</Text>

          {/*<Button
            style={{color: 'blue'}} 
            onPress={() => sendFirmwareUpdateOverHS()}
            title="Updater Firmware via Hotspot"
          ></Button>*/}

          <Text>---</Text>

      </ScrollView>
    );
  }
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  input: {
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    padding: 10,
    color: 'black',
  },
  button_label: {
    fontSize: 14,
    color: 'white',
  },
  button: {
    backgroundColor: '#026dd1',
    width: '40%',
    height: 40,
    borderColor: '#026dd1',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  inputTrainings: {
    borderRadius: 10,
    height: 300,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    padding: 10,
    color: 'black',
  },
  errorOut: {
    borderRadius: 10,
    height: 100,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    padding: 10,
    color: 'red',
  },
});

//make this component available to the app
export default BluetoothScreen;
