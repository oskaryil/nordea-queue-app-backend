// import socketIO from 'socket.io';
//
// import { io } from '../index.js';
// import Customers from '../queueIO/customers.js';
//
// const customers = new Customers();
//
// io.on('connection', socket => {
//   console.log('New customer in in the queue');
//
//   socket.on('join', (query, callback) => {
//     socket.join(query.room);
//     socket.addCustomer(socket.id, query.room);
//
//     io
//       .to(query.room)
//       .emit('updateCustomerList', customers.customersCount(query.room));
//     callback();
//   });
//
//   socket.on('resolveCustomer', () => {
//     const customer = customers.resolveCustomer(socket.id);
//
//     if (customer) {
//       io
//         .to(customer.room)
//         .emit('updateCustomerCount', customers.customersCount(customer.room));
//     }
//   });
// });
