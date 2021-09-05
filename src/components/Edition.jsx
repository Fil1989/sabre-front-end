import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { editContactOnServer } from '../redux/operations';

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

const Edition = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState(props.contact.name);
  const [number, setNumber] = useState(props.contact.number);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        dispatch(editContactOnServer(props.contact.id, name, number));
      }}
    >
      <label className={classes.label}>
        Name
        <input
          type="text"
          width="100"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        {/* <TextField
        id="outlined-basic"
        label="Name1"
        // className={classes.label}
        variant="outlined"
        width="100"
        onChange={e => setName(e.target.value)}
        value={name}
        height="5"
      /> */}
      </label>{' '}
      <label className={classes.label}>
        Phone
        <input
          type="text"
          width="100"
          onChange={e => setNumber(e.target.value)}
          value={number}
        />
      </label>{' '}
      <Button
        type="submit"
        className={classes.change_btn}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};
export default Edition;
