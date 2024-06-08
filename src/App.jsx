import React, { useState, useEffect } from 'react';
import apiService from './api/apiService';

function App() {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    apiService.getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const fetchContacts = (userId) => {
    apiService.getContacts(userId).then((response) => {
      setContacts(response.data);
      setSelectedUserId(userId);
    });
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => fetchContacts(user._id)}>
            {user.name}, 
            {user._id}
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div>
          <h2>Contactos del Usuario</h2>
          <ul>
            {contacts.map((contact) => (
              <li key={contact._id}>{contact.name} - {contact.phone}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
