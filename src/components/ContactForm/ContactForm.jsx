import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from '../../redux/operations/contactsOperations';
import { getContacts } from '../../redux/selectors/contactsSelectors';
import s from './ContactForm.module.css';
import { toast } from 'react-toastify';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onSubmit = (name, z) => {
    dispatch(contactsOperations.addContact(name, number));
  };

  const handleNameChange = ({ currentTarget: { value } }) => {
    setName(value);
  };

  const handleNumberChange = ({ currentTarget: { value } }) => {
    setNumber(value);
  };

  const handleAddContact = e => {
    e.preventDefault();

    const TwinName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const TwinNumber = contacts.find(contact => contact.number === number);

    if (TwinName) {
      toast.error(`Name: ${name} is already in contacts.`);
      resetState();
      return;
    }

    if (TwinNumber) {
      toast.error(`Number: ${number} is already in contacts.`);
      resetState();
      return;
    }

    onSubmit({ name, number });
    resetState();
  };

  const resetState = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleAddContact}>
      <label className={s.label}>
        Name
        <br />
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleNameChange}
          placeholder="Enter name"
        />
      </label>
      <label className={s.label}>
        Number
        <br />
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleNumberChange}
          placeholder="Enter phone number"
        />
      </label>
      <button className={s.btn} type="submit">
        
        <p className={s.discription}>Add contact</p>
      </button>
    </form>
  );
}
