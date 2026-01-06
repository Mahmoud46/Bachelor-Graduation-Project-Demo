let login_signup_window = document.querySelector(".login_signup_window");

let user_data_ret = {
	login_flag: false,
	sign_up_flag: false,
	reset_password_flag: false,
	fst_name: "",
	lst_name: "",
	email: "",
	pswrd: "",
	new_pswrd: "",
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
	if (user_data_ret.email != "" && user_data_ret.pswrd.length >= 6) {
		e.preventDefault();
		UserLoginSignUp(user_data_ret);
	}
});

// Sign up submit button
document.getElementById("submit_signup_btn").addEventListener("click", (e) => {
	SetUserDataRetrieved();
	if (
		user_data_ret.fst_name != "" &&
		user_data_ret.lst_name != "" &&
		user_data_ret.email != "" &&
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
			user_data_ret.email
		) &&
		user_data_ret.pswrd.length >= 6
	) {
		e.preventDefault();
		UserLoginSignUp(user_data_ret);
	}
});

// Reset password submit button
document
	.getElementById("submit_reset_password_btn")
	.addEventListener("click", (e) => {
		SetUserDataRetrieved();
		if (user_data_ret.email != "" && user_data_ret.new_pswrd.length >= 6) {
			e.preventDefault();
			UserLoginSignUp(user_data_ret);
		}
	});

// Features display
document.querySelectorAll(".about_features .features_list li").forEach((fes) =>
	fes.addEventListener("click", (_) => {
		document.querySelector(".features_detailes").classList.add("active");
		document
			.querySelector(`.fes.${fes.getAttribute("feature_window")}`)
			.classList.add("active");
	})
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
				: null
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
	user_data_ret.fst_name = document.getElementById("su_fst_name").value.trim();
	user_data_ret.lst_name = document.getElementById("su_lst_name").value.trim();

	if (user_data_ret.sign_up_flag) {
		user_data_ret.email = document.getElementById("su_user_email").value.trim();
		user_data_ret.pswrd = document.getElementById("su_user_password").value;
	} else if (user_data_ret.login_flag) {
		user_data_ret.email = document.getElementById("user_email").value.trim();
		user_data_ret.pswrd = document.getElementById("user_password").value;
	} else if (user_data_ret.reset_password_flag)
		user_data_ret.email = document.getElementById("rs_user_email").value.trim();

	user_data_ret.new_pswrd = document.getElementById("new_user_password").value;
}

function ClearDataInputs() {
	document.getElementById("su_fst_name").value = "";
	document.getElementById("su_lst_name").value = "";

	document.getElementById("su_user_email").value = "";
	document.getElementById("su_user_password").value = "";

	document.getElementById("user_email").value = "";
	document.getElementById("user_password").value = "";

	document.getElementById("rs_user_email").value = "";

	document.getElementById("new_user_password").value = "";
}

function UserLoginSignUp(data_ret) {
	document.querySelector(".loader").classList.add("active");
	fetch(`${window.origin}/user_login_signup`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(data_ret),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			alert(`Response status was not 200: ${response.status}`);
			document.querySelector(".loader").classList.remove("active");
			return;
		}
		response.json().then((data) => {
			let user_req_res = data.user_req_res;

			if (user_data_ret.login_flag) {
				if (user_req_res.login_valid) {
					document.querySelector(".cls_lgn_su_win").click();
					RedirectuserPage(user_req_res.username);
				} else
					alert(
						"Unable to log in. Please check your email and password and try again."
					);
			} else if (user_data_ret.sign_up_flag) {
				if (user_req_res.user_reg) {
					document.querySelector(".cls_lgn_su_win").click();
					RedirectuserPage(user_req_res.username);
				} else
					alert(
						"Sign up unsuccessful. The email address you entered is already in use. Please use a different email address."
					);
			} else if (user_data_ret.reset_password_flag) {
				user_data_ret.reset_password_flag = false;
				user_data_ret.sign_up_flag = false;
				user_data_ret.login_flag = true;
				if (user_req_res.reset_password_stat)
					alert(
						"Your password has been successfully changed. Please use your new password the next time you log in."
					);
				else
					alert(
						"The email address you entered does not exist in our system. Please check and try again."
					);
				ActivateLoginSignUpWindow();
			}
			document.querySelector(".loader").classList.remove("active");
			return;
		});
	});
}

function RedirectuserPage(username) {
	let user_page_link = document.createElement("a");
	user_page_link.target = "_blank";
	user_page_link.href = `${window.origin}/${username}`;
	user_page_link.click();
}
