import firebase from 'firebase/app';
import '@firebase/messaging';

const config = {
  apiKey: 'AIzaSyAJRmZRl_45V784UPi8USabVU7vrXDdjGk',
  authDomain: 'werp-push-notifications.firebaseapp.com',
  databaseURL: 'https://werp-push-notifications.firebaseio.com',
  projectId: 'werp-push-notifications',
  storageBucket: 'werp-push-notifications.appspot.com',
  messagingSenderId: '49594004460',
  appId: '1:49594004460:web:ab302f9415ebb1dff686c9',
  measurementId: 'G-148BN1MZ34',
};

firebase.initializeApp(config);

let messaging;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const registration = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js',
      {
        updateViaCache: 'none',
      },
    );
    messaging.useServiceWorker(registration);
    messaging.onMessage(payload => {
      const title = payload.notification.title;
      const options = {
        body: payload.notification.body,
        icon: payload.notification.icon,
      };
      registration.showNotification(title, options);
    });
  });
}

export { messaging };
