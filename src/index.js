/* eslint-disable no-console */
/**
 * Server setup
 */
import express from 'express';
import chalk from 'chalk';
import http from 'http';
import socketIO from 'socket.io';

import './config/database';
import middlewaresConfig from './config/middlewares';
import Customers from './queueIO/customers';
import constants from './config/constants';
import ApiRoutes from './routes';

// import queueController from './controllers/queue.controller';

const app = express();

const io = socketIO(http.Server(app)).listen(5000);

const customers = new Customers();
io.on('connection', socket => {
  console.log('New customer in in the queue');
  io.emit('test', 'hello');

  socket.on('join', (param, callback) => {
    socket.join(param);

    customers.resolveCustomer(socket.id);
    customers.addCustomer(socket.id, param);

    io.to(socket.id).emit('getCurrentNumber', customers.getNumber(socket.id));
    // socket.emit('newMessage', customers.customersCount(param));
    callback();
  });

  socket.on('test', customer => {
    io.to(customer).emit('test', 'hello');
  });

  socket.on('resolveCustomer', () => {
    const customer = customers.resolveCustomer(socket.id);

    if (customer) {
      io
        .to(customer.room)
        .emit('updateCustomerCount', customers.getNumber(socket.id));
    }
  });
  socket.on('disconnect', () => {
    const customer = customers.resolveCustomer(socket.id);
    if (customer) {
      console.log(socket.id);
      Object.keys(io.sockets.sockets).forEach(id => {
        console.log('ID:', id); // socketId
        io.to(id).emit('getCurrentNumber', customers.getNumber(id));
      });
    }
  });
});

// Wrap the app in the middlewares
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(constants.PORT, err => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        Yep this is working 🍺
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `,
        ),
      );
    }
  });
}

export default app;
