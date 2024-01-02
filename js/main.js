var allData = [];

var userNameSignUpInput = document.getElementById("userNameSignUp");
var userEmailSignUpInput = document.getElementById("emailSignUp");
var userPassSignUpInput = document.getElementById("passwordSignUp");
var signUpButton = document.getElementById("signUpBtn");

currentPath = window.location.pathname;
console.log(currentPath);
console.log(typeof currentPath);
if (
  currentPath == "/index.html" ||
  currentPath == "/" ||
  currentPath == "/smart-login-system/"
) {
  signUp();
} else if (
  currentPath == "/login.html" ||
  currentPath == "/smart-login-system/login.html"
) {
  signIn();
} else {
  enterHome();
}

function signUp() {
  var successMessage = document.getElementById("success");
  var rejectMessage = document.getElementById("reject");
  var validEmailMessage = document.getElementById("messageValid");

  if (!userNameValidation && !emailValidation && !passwordValidation) {
    signUpButton.disabled = "true";
  }

  userNameSignUpInput.addEventListener("input", function () {
    userNameValidation();
  });
  userEmailSignUpInput.addEventListener("input", function () {
    emailValidation();
  });
  userPassSignUpInput.addEventListener("input", function () {
    passwordValidation();
  });

  signUpButton.addEventListener("click", function () {
    addData();
  });

  function clearInputs() {
    userNameSignUpInput.value = "";
    userEmailSignUpInput.value = "";
    userPassSignUpInput.value = "";
  }

  function addData() {
    if (
      userNameSignUpInput.value == "" ||
      userEmailSignUpInput.value == "" ||
      userPassSignUpInput.value == ""
    ) {
      rejectMessage.classList.remove("d-none");
      successMessage.classList.add("d-none");
      return;
    }

    rejectMessage.classList.add("d-none");

    var userData = {
      name: userNameSignUpInput.value,
      email: userEmailSignUpInput.value,
      password: userPassSignUpInput.value,
    };

    // if email is valid
    if (JSON.parse(localStorage.getItem("YourData")) != null) {
      allData = JSON.parse(localStorage.getItem("YourData"));
      for (var i = 0; i < allData.length; i++) {
        if (userEmailSignUpInput.value == allData[i].email) {
          validEmailMessage.classList.remove("d-none");
          signUpButton.disabled = "true";
          return;
        }
      }
    }

    allData.push(userData);
    localStorage.setItem("YourData", JSON.stringify(allData));

    console.log(allData);
    successMessage.classList.remove("d-none");
    rejectMessage.classList.add("d-none");

    clearInputs();

    // window.location.pathname= 'login.html';
  }
}

function signIn() {
  var userEmailLoginInput = document.getElementById("emailLogin");
  var userPassLoginInput = document.getElementById("passwordLogin");
  var loginButton = document.getElementById("loginBtn");
  var rejectLoginMessage = document.getElementById("rejectLogin");

  loginButton.addEventListener("click", function () {
    login();
  });

  function login() {
    if (JSON.parse(localStorage.getItem("YourData")) != null) {
      allData = JSON.parse(localStorage.getItem("YourData"));
    }
    for (var i = 0; i < allData.length; i++) {
      if (userEmailLoginInput.value == allData[i].email) {
        if (userPassLoginInput.value == allData[i].password) {
          if (window.location.pathname.includes("smart-login-system")) {
            window.location.pathname = "/smart-login-system/home.html";
          } else {
            window.location.pathname = "home.html";
          {
          // {
          //   window.location.href = "home.html";
          // }

          rejectLoginMessage.classList.add("d-none");
          //
          localStorage.setItem("currentUser", allData[i].name);
          return;
        }
      } else {
        rejectLoginMessage.classList.remove("d-none");
      }
    }
  }
}

function enterHome() {
  var logOutBtn = document.getElementById("homeBtn");
  logOutBtn.addEventListener("click", function () {
    if (window.location.pathname.includes("smart-login-system")) {
      window.location.pathname = "/smart-login-system/";
    } else {
      window.location.pathname = "index.html";
    }
    // window.location.pathname = "index.html";
  });

  document.getElementById(
    "homeMessage"
  ).innerHTML = `welcome ${localStorage.getItem("currentUser")}`;
}

function userNameValidation() {
  var userNameRegex = /^[A-Z][a-z? ]{2,20}$/; //Ali
  var userMessageInput = document.querySelector(".userMessage");

  if (!userNameRegex.test(userNameSignUpInput.value)) {
    // console.log(userNameSignUpInput.value);
    signUpButton.disabled = "true";
    userNameSignUpInput.classList.add("is-invalid");
    userNameSignUpInput.classList.remove("is-valid");
    userMessageInput.classList.remove("d-none");
  } else {
    signUpButton.removeAttribute("disabled");
    userNameSignUpInput.classList.remove("is-invalid");
    userNameSignUpInput.classList.add("is-valid");
    userMessageInput.classList.add("d-none");
  }
}
function emailValidation() {
  // ahmed@gmail.com
  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@(gmail)(?:\.(com))*$/;
  var emailMessage = document.querySelector(".emailMessage");

  if (!emailRegex.test(userEmailSignUpInput.value)) {
    // console.log(userEmailSignUpInput.value);
    signUpButton.disabled = "true";
    userEmailSignUpInput.classList.add("is-invalid");
    userEmailSignUpInput.classList.remove("is-valid");
    emailMessage.classList.remove("d-none");
  } else {
    signUpButton.removeAttribute("disabled");
    userEmailSignUpInput.classList.remove("is-invalid");
    userEmailSignUpInput.classList.add("is-valid");
    emailMessage.classList.add("d-none");
  }
}
function passwordValidation() {
  //ahmed , 111 , a111
  var passwordRegex = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{3,15}$/;
  var passwordMessage = document.querySelector(".passMessage");

  if (!passwordRegex.test(userPassSignUpInput.value)) {
    // console.log(userPassSignUpInput.value);
    signUpButton.disabled = "true";
    userPassSignUpInput.classList.add("is-invalid");
    userPassSignUpInput.classList.remove("is-valid");
    passwordMessage.classList.remove("d-none");
  } else {
    signUpButton.removeAttribute("disabled");
    userPassSignUpInput.classList.remove("is-invalid");
    userPassSignUpInput.classList.add("is-valid");
    passwordMessage.classList.add("d-none");
  }
}
