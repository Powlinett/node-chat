const messageForm = document.querySelector('#messageForm');

messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = document.querySelector('#message').value;
  const username = document.querySelector('#username').value;
  try {
    const response = await fetch('http://localhost:3000/message', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `message=${message}&username=${username}`
    });
    console.log('message send');
  } catch (err) {
    console.log(err);
  }
});