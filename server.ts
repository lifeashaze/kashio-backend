var debug = require('debug')('alchemist:server');
import { IncomingMessage, Server, ServerResponse, createServer } from 'http';
import { Express } from 'express';

/**
 * @param app Express application
 * @returns void
 * @description
 * This function starts the server and listens on the port specified in the environment variable PORT.
 * If the port is not specified, it defaults to 3000.
 * The function also sets up event listeners for the server.
 * If the server encounters an error, it logs the error message to the console.
 * If the server is listening, it logs the port number to the console.
*/

export default function startServer(app: Express) {
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  var server = createServer(app);

  server.listen(port);
  server.on('error', (e) => onError(e, port as number | string));
  server.on('listening', () => onListening(server));
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: unknown) {
  if (typeof val === 'string') {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }
  }

  if (typeof val === 'number') {
    if (val >= 0) {
      return val;
    }
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any, port: number | string) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
  var addr = server.address();
  if (addr === null) { return; }

  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  debug('Listening on ' + bind);
}