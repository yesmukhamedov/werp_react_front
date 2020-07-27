import React, { useEffect } from 'react';
import { messaging } from './firebase';
import axios from 'axios';

const INSTANCE_TOKEN = 'instanceToken';
const ROOT_URL = 'https://werp-push-notifications.firebaseio.com';
const SERVER_KEY =
  'AAAAC4wIc-w:APA91bH-bgd_s36jLCfOmwnDFiFIO2mLLphXl3_Ndyu2PQs-d7CMC23G0VKPcx9otjtwkf3qMb2YmxW5s9rthlyIe7-sMh49F_hWZZsKgQdZXp91mlgEpKu-6-cIE2AZacJ2qH5VfgkA';

const PushNotification = () => {
  useEffect(() => {
    notificationPermission();
  }, [messaging]);

  const sendTokenToDb = async token => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `key=${SERVER_KEY}`,
    };
    try {
      await axios.post(
        `${ROOT_URL}/storetoken.json`,
        { token },
        { headers: headers },
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error: ', error.message);
      }
    }
  };

  const notificationPermission = async () => {
    let permissionGranted = false;
    try {
      /* request permission if not granted */
      if (Notification.permission !== 'granted') {
        await messaging.requestPermission();
      }
      /* get instance token if not available */
      if (localStorage.getItem(INSTANCE_TOKEN) !== null) {
        permissionGranted = true;
      } else {
        const token = await messaging.getToken(); // returns the same token on every invocation until refreshed by browser
        await sendTokenToDb(token);
        localStorage.setItem(INSTANCE_TOKEN, token);
        permissionGranted = true;
      }
    } catch (err) {
      console.log(err);
      if (
        err.hasOwnProperty('code') &&
        err.code === 'messaging/permission-default'
      )
        console.log('You need to allow the site to send notifications');
      else if (
        err.hasOwnProperty('code') &&
        err.code === 'messaging/permission-blocked'
      )
        console.log(
          'Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings',
        );
      else console.log('Unable to subscribe you to notifications');
    } finally {
      return permissionGranted;
    }
  };

  return <div></div>;
};

export default PushNotification;
