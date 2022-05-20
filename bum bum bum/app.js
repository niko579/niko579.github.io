function insertHighscore() {

    let data = {
      username: prompt("Username:"),
      highscore: parseInt(prompt("Highscore 1-10:"))
    }

    while (data.highscore < 1 || 10 < data.highscore)
      data.highscore = parseInt(prompt("Highscore 1-10"));
  
    fetch('/highscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Highscore inserted:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  function getHighscore() {
    fetch("/highscore/" + prompt("Username:"))
    .then(response => response.json())
    .then(data => alert(JSON.stringify(data)));
  }
  
  function getHighscores() {
    fetch("/highscores")
    .then(response => response.json())
    .then(data => alert(JSON.stringify(data)));
  }
  
  function deleteHighscore() {
  
    let data = {
      highscoreID: prompt("HighscoreID:")
    }
  
    fetch('/highscore', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Highscore deleted:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  function updateHighscore() {
  
    let data = {
      highscoreID: prompt("HighscoreID"),
      highscore: prompt("Highscore:")
    }
  
    fetch('/highscore', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Highscore updated:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  function signUp() {
  
    let data = {
      username: prompt("Username:"),
      password: prompt("Password:")
    }
  
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('User inserted:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  // login
  function logIn() {
  
    let body = {
      username: prompt("Username:"),
      password: prompt("Password:")
    }
  
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.loginWasSuccessful){
        sessionStorage.setItem("username", body.username);
        sessionStorage.setItem("password", body.password);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  // delete user
  async function deleteUser() {
  
    let data = {
      username: sessionStorage.getItem("username"),
      password: sessionStorage.getItem("password")
    }
  
    fetch('/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  //star
  function star(star){

    if(star.classList.contains("checked")) {
      star.classList.remove("checked");
      console.log(true);
    }
    else {
     star.classList.add("checked");
     console.log(false);
    }

  }
  //angry
  function angry(angry){
    if(angry.classList.cointains("&#128545;")){
      angry.classList.remove("&#128545;")
      console.log(true);
    }
    else{
      angry.classlist.add("&#128545;");
      console.log(false);
    }
  }