// import React, { useState, useEffect } from 'react';
// import {
//   Segment,
//   Grid,
//   Dropdown,
//   TextArea,
//   Button,
//   Form,
//   Label,
// } from 'semantic-ui-react';
// import axios from 'axios';
// import firebase from 'firebase';
// import moment from 'moment';

// const SERVER_KEY =
//   'AAAAC4wIc-w:APA91bH-bgd_s36jLCfOmwnDFiFIO2mLLphXl3_Ndyu2PQs-d7CMC23G0VKPcx9otjtwkf3qMb2YmxW5s9rthlyIe7-sMh49F_hWZZsKgQdZXp91mlgEpKu-6-cIE2AZacJ2qH5VfgkA';

// const SendPushNotification = () => {
//   const [notification, setNotification] = useState({ title: '', body: '' });
//   const [token, setToken] = useState([]);

//   useEffect(() => {
//     firebase
//       .database()
//       .ref('storetoken')
//       .on('value', snapshot => {
//         if (snapshot.val() !== null) {
//           const tokenObj = Object.values(snapshot.val());
//           setToken(tokenObj.map(item => item.token));
//         }
//       });
//   }, []);

//   const onInputChange = (e, fieldname) => {
//     setNotification(prev => {
//       const newNotification = { ...prev };
//       switch (fieldname) {
//         case 'title':
//           newNotification.title = e.value;
//           break;
//         case 'body':
//           newNotification.body = e.value;
//           break;
//         default:
//           newNotification.fieldname = e.value;
//       }
//       return newNotification;
//     });
//   };

//   const onSubmit = async () => {
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${SERVER_KEY}`,
//     };
//     try {
//       await axios.post(
//         `https://fcm.googleapis.com/fcm/send`,
//         {
//           notification: {
//             title: notification.title,
//             body: notification.body,
//             time: moment(new Date()).format('DD-MM-YYYY HH:mm'),
//           },
//           registration_ids: token,
//         },
//         { headers: headers },
//       );
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.status);
//         console.log(error.response.data);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log('Error: ', error.message);
//       }
//     }
//   };

//   return (
//     <Segment>
//       <Grid centered>
//         <Grid.Row>
//           <Grid.Column mobile={16} tablet={16} computer={6}>
//             <Form>
//               <Segment>
//                 <Label color={'violet'} ribbon>
//                   Title
//                 </Label>
//                 <Dropdown
//                   options={titleOptions}
//                   placeholder={'Title'}
//                   selection
//                   fluid
//                   search
//                   onChange={(e, o) => onInputChange(o, 'title')}
//                 />
//               </Segment>
//               <Segment>
//                 <Label color={'violet'} ribbon>
//                   Description
//                 </Label>
//                 <TextArea
//                   placeholder="Description"
//                   onChange={(e, o) => onInputChange(o, 'body')}
//                 />
//               </Segment>
//               <Button primary fluid onClick={() => onSubmit()}>
//                 Send notification
//               </Button>
//             </Form>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </Segment>
//   );
// };

// const titleOptions = [
//   {
//     key: 1,
//     text: 'Aura Kazakhstan',
//     value: 'Aura Kazakhstan',
//   },
// ];

// export default SendPushNotification;
