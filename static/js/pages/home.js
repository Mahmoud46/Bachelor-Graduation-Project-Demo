import { login, reset_password, signup } from "../services/auth.js";

let login_signup_window = document.querySelector(".login_signup_window");

let user_data_ret = {
  login_flag: false,
  sign_up_flag: false,
  reset_password_flag: false,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  new_password: "",
};

document.querySelector(".cls_lgn_su_win").addEventListener("click", (_) => {
  user_data_ret.login_flag = false;
  user_data_ret.sign_up_flag = false;
  user_data_ret.reset_password_flag = false;
  login_signup_window.classList.remove("active");
  ActivateLoginSignUpWindow();
  ClearDataInputs();
});

// Code
document.querySelector(".rev_code").addEventListener("click", (_) => {
  let a = document.createElement("a");
  a.href = "https://github.com/Mahmoud46/Graduation-Project-Demo";
  a.target = "_blank";
  a.click();
});

document.querySelector(".login_btn").addEventListener("click", (_) => {
  user_data_ret.login_flag = true;
  user_data_ret.sign_up_flag = false;
  user_data_ret.reset_password_flag = false;

  login_signup_window.classList.add("active");
  ActivateLoginSignUpWindow();
});

document.querySelector(".signup_btn").addEventListener("click", (_) => {
  user_data_ret.login_flag = false;
  user_data_ret.sign_up_flag = true;
  user_data_ret.reset_password_flag = false;

  login_signup_window.classList.add("active");
  ActivateLoginSignUpWindow();
});

document.querySelector(".learn_more_btn").addEventListener("click", (_) => {
  document.querySelector(".hero_section").classList.remove("active");
  document.querySelector(".demo_section").classList.add("active");
  document.querySelector(".close_about_section").classList.add("active");
});

document
  .querySelector(".close_about_section")
  .addEventListener("click", (_) => {
    document.querySelector(".hero_section").classList.add("active");
    document.querySelector(".demo_section").classList.remove("active");
    document.querySelector(".close_about_section").classList.remove("active");
  });

login_signup_window
  .querySelector(".login_field h1 a")
  .addEventListener("click", (_) => {
    user_data_ret.sign_up_flag = true;
    user_data_ret.login_flag = false;
    user_data_ret.reset_password_flag = false;

    ActivateLoginSignUpWindow();
  });

login_signup_window
  .querySelector(".login_field .lg_form .user_ip label a")
  .addEventListener("click", (_) => {
    user_data_ret.sign_up_flag = false;
    user_data_ret.login_flag = false;
    user_data_ret.reset_password_flag = true;
    ActivateLoginSignUpWindow();
  });

login_signup_window
  .querySelector(".signup_field h1 a")
  .addEventListener("click", (_) => {
    user_data_ret.sign_up_flag = false;
    user_data_ret.login_flag = true;
    user_data_ret.reset_password_flag = false;

    ActivateLoginSignUpWindow();
  });

// Submit buttons
// Login submit button
document.getElementById("submit_login_btn").addEventListener("click", (e) => {
  SetUserDataRetrieved();
  if (user_data_ret.email != "" && user_data_ret.password.length >= 6) {
    e.preventDefault();
    login({ email: user_data_ret.email, password: user_data_ret.password });
  }
});

// Sign up submit button
document.getElementById("submit_signup_btn").addEventListener("click", (e) => {
  SetUserDataRetrieved();
  if (
    user_data_ret.first_name != "" &&
    user_data_ret.last_name != "" &&
    user_data_ret.email != "" &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      user_data_ret.email,
    ) &&
    user_data_ret.password.length >= 6
  ) {
    e.preventDefault();
    signup({
      email: user_data_ret.email,
      password: user_data_ret.password,
      first_name: user_data_ret.first_name,
      last_name: user_data_ret.last_name,
    });
  }
});

// Reset password submit button
document
  .getElementById("submit_reset_password_btn")
  .addEventListener("click", (e) => {
    SetUserDataRetrieved();
    if (user_data_ret.email != "" && user_data_ret.new_password.length >= 6) {
      e.preventDefault();
      reset_password({
        email: user_data_ret.email,
        new_password: user_data_ret.new_password,
      });
    }
  });

// Features display
document.querySelectorAll(".about_features .features_list li").forEach((fes) =>
  fes.addEventListener("click", (_) => {
    document.querySelector(".features_detailes").classList.add("active");
    document
      .querySelector(`.fes.${fes.getAttribute("feature_window")}`)
      .classList.add("active");
  }),
);

// Remove features display
document
  .querySelector(".features_detailes .cls_fes_det_win")
  .addEventListener("click", (_) => {
    document.querySelector(".features_detailes").classList.remove("active");
    document.querySelector(".fes.active")?.classList.remove("active");
  });

function ActivateLoginSignUpWindow() {
  login_signup_window
    .querySelectorAll(".lg-su-field")
    .forEach((form_cont) =>
      form_cont.classList.contains("active")
        ? form_cont.classList.remove("active")
        : null,
    );

  login_signup_window
    .querySelector(".login_signup_field.lg")
    ?.classList.remove("lg");

  login_signup_window
    .querySelector(".login_signup_field.su")
    ?.classList.remove("su");

  login_signup_window
    .querySelector(".login_signup_field.rs")
    ?.classList.remove("rs");

  if (user_data_ret.login_flag) {
    login_signup_window.querySelector(".login_field").classList.add("active");
    login_signup_window
      .querySelector(".login_signup_field")
      .classList.add("lg");
  } else if (user_data_ret.sign_up_flag) {
    login_signup_window.querySelector(".signup_field").classList.add("active");
    login_signup_window
      .querySelector(".login_signup_field")
      .classList.add("su");
  } else if (user_data_ret.reset_password_flag) {
    login_signup_window
      .querySelector(".reset_password_field")
      .classList.add("active");
    login_signup_window
      .querySelector(".login_signup_field")
      .classList.add("rs");
  }
}

function SetUserDataRetrieved() {
  user_data_ret.first_name = document
    .getElementById("su_first_name")
    ?.value?.trim();
  user_data_ret.last_name = document
    .getElementById("su_last_name")
    ?.value?.trim();

  if (user_data_ret.sign_up_flag) {
    user_data_ret.email = document.getElementById("su_user_email").value.trim();
    user_data_ret.password = document.getElementById("su_user_password").value;
  } else if (user_data_ret.login_flag) {
    user_data_ret.email = document.getElementById("user_email").value.trim();
    user_data_ret.password = document.getElementById("user_password").value;
  } else if (user_data_ret.reset_password_flag)
    user_data_ret.email = document.getElementById("rs_user_email").value.trim();

  user_data_ret.new_password =
    document.getElementById("new_user_password").value;
}

function ClearDataInputs() {
  document.getElementById("su_first_name").value = "";
  document.getElementById("su_last_name").value = "";

  document.getElementById("su_user_email").value = "";
  document.getElementById("su_user_password").value = "";

  document.getElementById("user_email").value = "";
  document.getElementById("user_password").value = "";

  document.getElementById("rs_user_email").value = "";

  document.getElementById("new_user_password").value = "";
}
