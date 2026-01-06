import {
	SpreadUserData,
	ActivateSimulationBookingWindow,
	HandleOutpatientDepartmentData,
	HandleControlChartData,
} from "../utils/helpers.js";
import { Outpatient } from "../ui/outpatient.js";
import { sectionsOpenStatus } from "../pages/user.js";
import { ControlCharts } from "../ui/control_charts.js";
import { HandleHospitalComparisonData } from "../utils/helpers.js";
import { HospitalsComparison } from "../ui/hospitals_comparison.js";

export function GetUserData(username) {
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

// Control Charts
// Send data to server to apply control charts on in
export function ApplyControlCharts(control_charts_data_ret) {
	let loader = document.querySelector(".loader");
	loader.classList.add("active");

	fetch(`${window.origin}/apply_control_charts`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(control_charts_data_ret),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			alert(`Response status was not 200: ${response.status}`);

			loader.classList.remove("active");
			return;
		}
		response.json().then((data) => {
			loader.classList.remove("active");

			if (!sectionsOpenStatus.control_charts_workspace_opened) {
				// Inactivate upload section
				document
					.querySelector("#control_charts_sec .upload_file_sec")
					.classList.remove("active");

				// Activate workspace section
				document
					.querySelector("#control_charts_sec .workspace_sec")
					.classList.add("active");

				// Activate control chart menu
				ControlCharts.control_charts_menu.classList.add("active");

				sectionsOpenStatus.control_charts_workspace_opened = true;
			}

			HandleControlChartData(data);

			return;
		});
	});
}

// Outpatient

export function ApplyOutpatientDepartment(outpatient_department_data_ret) {
	// Send data to server to apply outpatient department simulation on in
	let loader = document.querySelector(".loader");
	loader.classList.add("active");
	fetch(`${window.origin}/apply_outpatient_department`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(outpatient_department_data_ret),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			alert(`Response status was not 200: ${response.status}`);
			loader.classList.remove("active");

			return;
		}
		response.json().then((data) => {
			loader.classList.remove("active");

			if (!sectionsOpenStatus.outpatient_department_workspace_opened) {
				// Inactivate upload section
				document
					.querySelector("#outpatient_dep_sec .upload_file_sec")
					.classList.remove("active");

				// Activate workspace section
				document
					.querySelector("#outpatient_dep_sec .workspace_sec")
					.classList.add("active");

				// Activate outpatient department menu
				Outpatient.outpatient_department_menu.classList.add("active");

				sectionsOpenStatus.outpatient_department_workspace_opened = true;
			}

			HandleOutpatientDepartmentData(data);
			return;
		});
	});
}

export function ApplyBookingSystem(
	booking_ret,
	outpatient_department_data_ret
) {
	// Send data to server to apply outpatient department simulation on in
	let loader = document.querySelector(".loader");
	loader.classList.add("active");
	fetch(`${window.origin}/apply_booking_system`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({
			outpatient_dep: outpatient_department_data_ret,
			booking_sys: booking_ret,
		}),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			alert(`Response status was not 200: ${response.status}`);
			loader.classList.remove("active");

			return;
		}
		response.json().then((data) => {
			loader.classList.remove("active");
			console.log(data);
			ActivateSimulationBookingWindow(data.result);
			return;
		});
	});
}

// Hospitals Comparison
export function ApplyHospitalComparison(hospitals_comparison_data_ret) {
	// Send data to server to apply control charts on in
	let loader = document.querySelector(".loader");
	loader.classList.add("active");
	fetch(`${window.origin}/apply_hospitals_comparison`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(hospitals_comparison_data_ret),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			alert(`Response status was not 200: ${response.status}`);
			loader.classList.remove("active");

			return;
		}
		response.json().then((data) => {
			loader.classList.remove("active");

			if (!sectionsOpenStatus.hospital_comparison_workspace_opened) {
				// Inactivate upload section
				document
					.querySelector("#hospital_assessment_sec .upload_file_sec")
					.classList.remove("active");

				// Activate workspace section
				document
					.querySelector("#hospital_assessment_sec .workspace_sec")
					.classList.add("active");

				// Activate hospital comparison menu
				HospitalsComparison.hospital_comparison_menu.classList.add("active");

				sectionsOpenStatus.hospital_comparison_workspace_opened = true;
			}

			HandleHospitalComparisonData(data);
			return;
		});
	});
}
