// import { useState } from 'react';
import Edition from '../Edition';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { deleteContactFromServer } from '../../redux/operations';
import { changingContact } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  change_btn: {
    display: 'inline',
    marginLeft: 10,
    marginBottom: 10,
    verticalAlign: 'middle',
  },
  editing: {
    border: 'solid 1px green',
    marginBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  label: {
    display: 'inline',

    '& input': {
      marginLeft: 10,
      marginBottom: 10,
    },
  },
});

function ContactList() {
  const classes = useStyles();

  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);

  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();
  const onDelete = id => dispatch(deleteContactFromServer(id));

  return (
    <section className="contact_list">
      {filter.length === 0 &&
        contacts.map(contact => {
          return contact.editing ? (
            <li key={contact.id} className={classes.editing}>
              <Edition contact={contact} />
            </li>
          ) : (
            <li key={contact.id}>
              <span className="contact_name">{contact.name}</span>:{' '}
              <span className="contact_phone">{contact.number}</span>
              <Button
                onClick={() => onDelete(contact.id)}
                className={classes.change_btn}
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
              <Button
                onClick={() => dispatch(changingContact(contact.id))}
                className={classes.change_btn}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </li>
          );
        })}
      {isLoading && <p>Loading...</p>}
    </section>
  );
}

export default ContactList;
