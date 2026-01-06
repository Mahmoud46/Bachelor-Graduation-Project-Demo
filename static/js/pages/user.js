import {
	activateSection,
	ActivateControlChartGraphMenu,
} from "../utils/helpers.js";

import { GetUserData } from "../services/api.js";
import outpatientDepartment from "../components/outpatient_department.js";
import controlCharts from "../components/control_charts.js";
import hospitalsComparison from "../components/hospitals_comparison.js";

export const sectionsOpenStatus = {
	control_charts_workspace_opened: false,
	hospital_comparison_workspace_opened: false,
	outpatient_department_workspace_opened: false,
};

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
			sectionsOpenStatus.control_charts_workspace_opened
		) {
			document.querySelector(".control_charts_menu").classList.add("active");
		} else {
			document.querySelector(".control_charts_menu").classList.remove("active");
		}

		if (
			li.getAttribute("sec_id") == "hospital_assessment_sec" &&
			sectionsOpenStatus.hospital_comparison_workspace_opened
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
			sectionsOpenStatus.outpatient_department_workspace_opened
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

// Main
controlCharts();
outpatientDepartment();
hospitalsComparison();
