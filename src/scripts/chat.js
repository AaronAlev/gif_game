import { ref, set } from 'firebase/database';

const sendMessage = (event, message, inputRef, playerId, database, setMessage) => {
    event.preventDefault();
    if (message.trim() === '') {
      return;
    } else {
      console.log(message);
      const messageReference = ref(database, `chat/${message}`);
      set(messageReference, {
        message, 
        sender: playerId,
        time: new Date().getTime()
      })
    }

    setMessage('');
    inputRef.current.value = '';
}

export { sendMessage };