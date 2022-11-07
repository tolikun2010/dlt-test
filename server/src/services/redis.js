/* eslint-disable no-console */
import { createClient } from 'redis';
import { promisify } from 'util';
import { Config } from '../config/index';
import { ErrorMessages } from '../constants';

let client = null;

export function init() {
  if (client) {
    return client;
  }
  client = createClient({
    url: Config.REDIS_URL,
  });
  client.on('error', (err) => {
    console.error('@redis error', err);
  });
  client.on('connect', () => {
    console.log('@redis connect');
  });
  client.on('reconnecting', () => {
    console.log('@redis reconnecting');
  });
  client.on('end', () => {
    console.log('@redis disconnect');
  });

  return client.on_connect();
}

export function get(key) {
  if (!client) { throw new Error(ErrorMessages.redis_failure); }
  return promisify(client.get.bind(client))(key);
}

export async function set(key, value, { EX }) {
  if (!client) { throw new Error(ErrorMessages.redis_failure); }
  await promisify(client.set.bind(client))(key, value);
  await promisify(client.expire.bind(client))(key, EX);
}
