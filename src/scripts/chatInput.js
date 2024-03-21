import { ref, set } from 'firebase/database';

const sendMessage = (event, message, inputRef, username, database, setMessage) => {
    event.preventDefault();
    if (message.trim() === '') {
      return;
    } else {
      console.log(message);
      const messageReference = ref(database, `chat/${new Date().getTime()}`);
      set(messageReference, {
        message, 
        sender: username,
        time: new Date().getTime()
      })
    }

    setMessage('');
    inputRef.current.value = '';
}

export { sendMessage };