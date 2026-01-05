let control_charts_workspace_opened = false,
	hospital_comparison_workspace_opened = false,
	outpatient_department_workspace_opened = false;

GetUserData(username);
// Main menu buttons activation
document.querySelectorAll(".main-menu li").forEach((li) => {
	li.addEventListener("click", (_) => {
		document.querySelector(".main-menu li.active").classList.remove("active");
		li.classList.add("active");
		activateSection(li.getAttribute("sec_id"));
		ActivateControlChartGraphMenu();
	});
});

// Activate tools section when click navigate tools button in home section
document.querySelector(".navigate_tools").addEventListener("click", (_) => {
	document.querySelectorAll(".main-menu li").forEach((li) => {
		if (li.getAttribute("sec_id") == "tools_sec") {
			li.click();
		}
	});
});

// Activate tools sections with select tool icon
document.querySelectorAll("#tools_sec .tools_list li").forEach((li) =>
	li.addEventListener("click", (_) => {
		activateSection(li.getAttribute("sec_id"));
		ActivateControlChartGraphMenu();
	})
);

// Activate tools sections with select tool icon from tools menu
document.querySelectorAll(".tools_menu li").forEach((li) => {
	li.addEventListener("click", (_) => {
		document.querySelector(".tools_menu li.active")?.classList.remove("active");
		li.classList.add("active");
		activateSection(li.getAttribute("sec_id"));

		if (
			li.getAttribute("sec_id") == "control_charts_sec" &&
			control_charts_workspace_opened
		) {
			document.querySelector(".control_charts_menu").classList.add("active");
		} else {
			document.querySelector(".control_charts_menu").classList.remove("active");
		}

		if (
			li.getAttribute("sec_id") == "hospital_assessment_sec" &&
			hospital_comparison_workspace_opened
		) {
			document
				.querySelector(".hospital_comparison_menu")
				.classList.add("active");
		} else {
			document
				.querySelector(".hospital_comparison_menu")
				.classList.remove("active");
		}
		if (
			li.getAttribute("sec_id") == "outpatient_dep_sec" &&
			outpatient_department_workspace_opened
		) {
			document
				.querySelector(".outpatient_department_menu")
				.classList.add("active");
		} else {
			document
				.querySelector(".outpatient_department_menu")
				.classList.remove("active");
		}
		// document
		// 	.querySelectorAll(".tls-sec")
		// 	.forEach((tls) =>
		// 		tls.classList.contains("active") ? tls.classList.remove("active") : null
		// 	);
		ActivateControlChartGraphMenu();
	});
});

document
	.querySelector(".header_menu .user_btn")
	.addEventListener("click", (_) => {
		document.querySelector(".header_menu .user_btn").classList.toggle("active");
		document.querySelector(".user-menu").classList.toggle("active");
		ActivateControlChartGraphMenu();
	});

// Logout
document.getElementById("logout_btn").addEventListener("click", (_) => {
	// window.location.href = `${window.origin}`;
	// Optionally, close the current tab/window
	window.close();
});

// Remove features display
document
	.querySelector(".features_detailes .cls_fes_det_win")
	.addEventListener("click", (_) => {
		document.querySelector(".features_detailes").classList.remove("active");
		document.querySelector(".fes.active")?.classList.remove("active");
	});

// Features display
document
	.querySelectorAll("#about_sec .about_features .features_list li")
	.forEach((fes) =>
		fes.addEventListener("click", (_) => {
			document.querySelector(".features_detailes").classList.add("active");
			document
				.querySelector(`.fes.${fes.getAttribute("feature_window")}`)
				.classList.add("active");
		})
	);

// Activate selected section when click main menu button
function activateSection(sec_id) {
	document.querySelector("section.active").classList.remove("active");
	document.getElementById(sec_id).classList.add("active");

	// Control the tools menu and tools list and their response
	let tools_menu = document.querySelector(".tools_menu");
	// Check if the id is in the the following list to activate the tools menu
	if (
		[
			"outpatient_dep_sec",
			"control_charts_sec",
			"hospital_assessment_sec",
		].includes(sec_id)
	) {
		tools_menu.classList.contains("active")
			? null
			: tools_menu.classList.add("active");
		tools_menu.querySelector("li.active")?.classList.remove("active");

		tools_menu.querySelectorAll("li").forEach((li) => {
			if (li.getAttribute("sec_id") == sec_id) {
				li.classList.add("active");
				if (li.getAttribute("sec_id") == "control_charts_sec") {
					if (control_charts_workspace_opened) {
						document
							.querySelector("#control_charts_sec .workspace_sec")
							.classList.add("active");

						document
							.querySelector(".control_charts_menu")
							.classList.add("active");
					} else {
						document
							.querySelector("#control_charts_sec .upload_file_sec")
							.classList.add("active");
					}
				}
				if (li.getAttribute("sec_id") == "hospital_assessment_sec") {
					if (hospital_comparison_workspace_opened) {
						document
							.querySelector("#hospital_assessment_sec .workspace_sec")
							.classList.add("active");

						document
							.querySelector(".hospital_comparison_menu")
							.classList.add("active");
					} else {
						document
							.querySelector("#hospital_assessment_sec .upload_file_sec")
							.classList.add("active");
					}
				}
				if (li.getAttribute("sec_id") == "outpatient_dep_sec") {
					if (outpatient_department_workspace_opened) {
						document
							.querySelector("#outpatient_dep_sec .workspace_sec")
							.classList.add("active");

						document
							.querySelector(".outpatient_department_menu")
							.classList.add("active");
					} else {
						document
							.querySelector("#outpatient_dep_sec .upload_file_sec")
							.classList.add("active");
					}
				}
			}
		});
	} else {
		tools_menu.classList.remove("active");
		document.querySelector(".control_charts_menu").classList.remove("active");
		document
			.querySelector(".hospital_comparison_menu")
			.classList.remove("active");
		document
			.querySelector(".outpatient_department_menu")
			.classList.remove("active");
	}
	ActivateControlChartGraphMenu();
}

function ActivateControlChartGraphMenu() {
	let control_charts_graph_menu = document.querySelector(
		".control_charts_graph_menu"
	);
	if (
		control_charts_menu.classList.contains("active") &&
		control_charts_menu.querySelector("li.ccw").classList.contains("active") &&
		document.getElementById("graph_02").classList.contains("exist")
	) {
		control_charts_graph_menu.classList.contains("active")
			? null
			: control_charts_graph_menu.classList.add("active");
	} else {
		control_charts_graph_menu.classList.contains("active")
			? control_charts_graph_menu.classList.remove("active")
			: null;

		document.getElementById("graph_02").classList.contains("active")
			? document.getElementById("graph_02").classList.remove("active")
			: null;

		document.getElementById("graph_01").classList.contains("active")
			? null
			: document.getElementById("graph_01").classList.add("active");
	}
	let control_charts_graph_menu_icon_list =
		control_charts_graph_menu.querySelectorAll("li");
	control_charts_graph_menu_icon_list.forEach((li) =>
		li.classList.contains("active") ? li.classList.remove("active") : null
	);
	control_charts_graph_menu_icon_list[0].classList.add("active");
}

function GetUserData(username) {
	fetch(`${window.origin}/get_user_data`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ username: username }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			alert(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			// console.log(data);
			SpreadUserData(data["user_data"]);
			return;
		});
	});
}

function SpreadUserData(user_data) {
	document.querySelector(".loader").classList.add("active");
	let user_menu = document.querySelector(".user-menu"),
		user_menu_det = document.querySelectorAll(".user-det span");
	user_menu.querySelector(".user-icon").innerText = user_data.fst_name[0];

	user_menu_det[0].innerText = `${user_data.fst_name} ${user_data.lst_name}`;
	user_menu_det[1].innerText = user_data.username;

	document.querySelector(".header_menu .user_btn span").innerText =
		user_data.fst_name[0];

	document.querySelector("#home_sec h1 span").innerText = user_data.fst_name;
	document.querySelector(".loader").classList.remove("active");
}
