import { Component } from 'react';

export class ContactList extends Component {
  render() {
    const { contacts, deleteEvent } = this.props;
    return (
      <ul>
        {contacts.map(contact => {
          return (
            <li key={contact.id}>
              <span>{contact.name}: </span>
              <span>{contact.number}</span>
              <button type="button" onClick={() => deleteEvent(contact.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
