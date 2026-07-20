'use strict';

const messages = [];

function add(message) {
  messages.push(message);
  return message;
}

function list() {
  return [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = { add, list };
