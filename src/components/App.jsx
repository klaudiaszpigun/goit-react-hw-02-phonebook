import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    // Pobierz dane z local storage po załadowaniu komponentu
    const contactsFromStorage = localStorage.getItem('contacts');
    if (contactsFromStorage) {
      this.setState({ contacts: JSON.parse(contactsFromStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Zapisz dane w local storage po aktualizacji stanu
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  saveToState = event => {
    if (
      !this.state.contacts.some(
        contact =>
          contact.name === this.state.name ||
          contact.number === this.state.number
      ) &&
      this.state.name.trim() !== '' &&
      this.state.number.trim() !== ''
    ) {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: prevState.name, number: prevState.number },
        ],
        name: '',
        number: '',
      }));
    } else {
      alert(`User is already in contacts`);
      this.setState({ name: '', number: '' });
    }
  };

  saveToName = event => {
    if (event.target.value.trim() !== '') {
      this.setState({ name: event.target.value.trim() });
    }
  };

  saveToNumber = event => {
    if (event.target.value.trim() !== '') {
      this.setState({ number: event.target.value.trim() });
    }
  };

  filterEvent = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          saveName={this.saveToName}
          saveNumber={this.saveToNumber}
          saveState={this.saveToState}
        />
        <h2>Contacts</h2>
        <Filter filter={this.filterEvent} />
        <ContactList
          contacts={filteredContacts}
          deleteEvent={this.deleteContact}
        />
      </div>
    );
  }
}
