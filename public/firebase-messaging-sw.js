importScripts('https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.16.0/firebase-messaging.js',
);

firebase.initializeApp({
  messagingSenderId: '49594004460',
  projectId: 'werp-push-notifications',
  apiKey: 'AIzaSyAJRmZRl_45V784UPi8USabVU7vrXDdjGk',
  appId: '1:49594004460:web:ab302f9415ebb1dff686c9',
});

const initMessaging = firebase.messaging();

self.addEventListener('notificationclick', event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
