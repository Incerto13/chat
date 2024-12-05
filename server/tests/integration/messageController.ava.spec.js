const test = require('ava');
const axios = require('axios');

const BASE_URL = 'http://localhost:3002';  

test('POST /messages should create a new message', async (t) => {
  const newMessage = {
    username: 'user1',
    message: 'Hello!',
    avatar: 'avatar1.jpg',
  };

  const response = await axios.post(`${BASE_URL}/api/messages`, newMessage);

  t.is(response.status, 200);
  t.deepEqual(response.data.username, newMessage.username);
  t.deepEqual(response.data.message, newMessage.message);
  t.deepEqual(response.data.avatar, newMessage.avatar);
  t.truthy(response.data._id);
});

test('GET /messages should return all existing messages', async (t) => {
  const newMessage = {
    username: 'user2',
    message: 'Good day!',
    avatar: 'avatar2.jpg',
  };

  await axios.post(`${BASE_URL}/api/messages`, newMessage);

  const response = await axios.get(`${BASE_URL}/api/messages`);
  t.is(response.status, 200);
  t.true(response.data.length > 1); // should be at least two at this point
});

test('GET /messages/:id should return message by id', async (t) => {
  const newMessage = {
    username: 'user3',
    message: 'Hi there!',
    avatar: 'avatar3.jpg',
  };

  // Create a message
  const createResponse = await axios.post(`${BASE_URL}/api/messages`, newMessage);
  const createdMessageId = createResponse.data._id;

  const response = await axios.get(`${BASE_URL}/api/messages/${createdMessageId}`);
  t.is(response.status, 200);
  t.is(response.data._id, createdMessageId); 
});


test('PUT /messages/:id should update a message', async (t) => {
  const newMessage = {
    username: 'user1',
    message: 'Hello!',
    avatar: 'avatar1.jpg',
  };

  // Create a message
  const createResponse = await axios.post(`${BASE_URL}/api/messages`, newMessage);
  const messageId = createResponse.data._id;

  const updatedMessage = {
    username: 'user1',
    message: 'Updated message!',
    avatar: 'avatar1_updated.jpg',
  };

  const response = await axios.put(`${BASE_URL}/api/messages/${messageId}`, updatedMessage);

  t.is(response.status, 200);
  t.deepEqual(response.data.username, updatedMessage.username);
  t.deepEqual(response.data.message, updatedMessage.message);
  t.deepEqual(response.data.avatar, updatedMessage.avatar);
  t.is(response.data._id, messageId); // Ensure the ID is unchanged
});

test('PUT /messages/:id should return 404 if message not found', async (t) => {
  const updatedMessage = {
    username: 'user1',
    message: 'Updated message!',
    avatar: 'avatar1_updated.jpg',
  };

  try {
      await axios.put(`${BASE_URL}/api/messages/invalid-id`, updatedMessage);
  } catch(err) {
    t.is(err.response.status, 500);
    t.deepEqual(err.response.data, { message: 'Error updating message'});
  }
});

test('DELETE /messages/:id should delete a message', async (t) => {
  const newMessage = {
    username: 'user1',
    message: 'Hello!',
    avatar: 'avatar1.jpg',
  };

  // Create a message
  const createResponse = await axios.post(`${BASE_URL}/api/messages`, newMessage);
  const messageId = createResponse.data._id;

  // Delete the message
  const deleteResponse = await axios.delete(`${BASE_URL}/api/messages/${messageId}`);

  t.is(deleteResponse.status, 200);
  t.deepEqual(deleteResponse.data, { message: 'Message deleted successfully' });

  try {
      // Try to get the deleted message
      await axios.get(`${BASE_URL}/api/messages/${messageId}`);
  } catch(err) {
    t.is(err.response.status, 404);
    t.deepEqual(err.response.data, { message: 'Message not found'});
  }
});

test('DELETE /messages/:id should return 404 if message not found', async (t) => {
  try {
    await axios.delete(`${BASE_URL}/api/messages/6750e49790a90c7db0cbf20b`);
  } catch(err) {
    t.is(err.response.status, 404);
    t.deepEqual(err.response.data, { message: 'Message not found'});
  }
});
