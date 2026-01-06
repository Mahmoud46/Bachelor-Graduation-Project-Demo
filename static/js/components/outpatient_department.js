import {
	ApplyBookingSystem,
	ApplyOutpatientDepartment,
} from "../services/api.js";

import {
	ActivateOutpatientDepartmentFileCard,
	prepareClinicGraphData,
	ActivateSimulationWindow,
	getMainAnalysisData,
	ActivateOutpatientDepartmentSections,
} from "../utils/helpers.js";

import {
	Outpatient,
	outpatient_department_data_ret,
	booking_ret,
} from "../ui/outpatient.js";

import { sectionsOpenStatus } from "../pages/user.js";

export default function outpatientDepartment() {
	document
		.querySelector(
			"#outpatient_dep_sec .upload_file_sec .upload_side .browse_files_btn"
		)
		.addEventListener("click", (_) =>
			Outpatient.outpatient_department_uploaded_file.click()
		);

	// / Show files holder
	document
		.querySelector(
			"#outpatient_dep_sec .upload_file_sec .upload_side .show_more_files"
		)
		.addEventListener("click", (_) => {
			Outpatient.outpatient_department_files_holder.classList.add("active");
		});

	// Remove files holder
	Outpatient.outpatient_department_files_holder
		.querySelector(".remove_files_holder")
		.addEventListener("click", (_) =>
			Outpatient.outpatient_department_files_holder.classList.remove("active")
		);

	Outpatient.outpatient_department_uploaded_file.addEventListener(
		"input",
		(e) => {
			if (e.target.value != "") {
				let file_info = e.target.files[0],
					name = file_info.name.split(".")[0];

				if (file_info.type != "text/csv") {
					alert("Please upload only csv files only!");
					Outpatient.outpatient_department_uploaded_file_card.classList.remove(
						"active"
					);
					Outpatient.outpatient_department_file_submit_btn.classList.add(
						"inactive"
					);
					return;
				}

				let reader = new FileReader();
				reader.onload = (_) => {
					let url = reader.result;
					outpatient_department_data_ret.file_input_data = url;
					outpatient_department_data_ret.file_num = 0;
					outpatient_department_data_ret.from_example = false;
					outpatient_department_data_ret.file_name = name;
					Outpatient.outpatient_department_files_holder
						.querySelector(".files ul li.selected")
						?.classList.remove("selected");
					if (sectionsOpenStatus.outpatient_department_workspace_opened) {
						ApplyOutpatientDepartment(outpatient_department_data_ret);
					} else {
						ActivateOutpatientDepartmentFileCard(name, file_info.size);
					}
					e.target.value = "";
				};

				reader.readAsDataURL(file_info);
			}
		}
	);

	Outpatient.outpatient_department_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("click", (_) => {
			outpatient_department_uploaded_file.value = "";
			Outpatient.outpatient_department_uploaded_file_card.classList.remove(
				"active"
			);
			Outpatient.outpatient_department_uploaded_file_card.classList.remove(
				"active"
			);
			Outpatient.outpatient_department_file_submit_btn.classList.add(
				"inactive"
			);
			Outpatient.outpatient_department_files_holder
				.querySelector(".files ul li.selected")
				?.classList.remove("selected");

			outpatient_department_data_ret.file_input_data = "";
			outpatient_department_data_ret.file_num = 0;
			outpatient_department_data_ret.from_example = false;
			outpatient_department_data_ret.file_name = "";
		});

	Outpatient.outpatient_department_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("mouseover", (e) =>
			e.target.parentNode.classList.add("hover")
		);

	Outpatient.outpatient_department_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("mouseout", (e) =>
			e.target.parentNode.classList.remove("hover")
		);

	// Choose file from example files
	Outpatient.outpatient_department_files_holder
		.querySelectorAll(".files li")
		.forEach((li) =>
			li.addEventListener("click", (_) => {
				Outpatient.outpatient_department_files_holder
					.querySelector(".files ul li.selected")
					?.classList.remove("selected");
				li.classList.add("selected");
				let name_size_cont = li.querySelector(".name-size");
				ActivateOutpatientDepartmentFileCard(
					name_size_cont.getAttribute("title"),
					parseFloat(name_size_cont.querySelector("i").innerText) * 1024
				);

				outpatient_department_data_ret.file_input_data = "";
				outpatient_department_data_ret.file_num = parseInt(
					li.getAttribute("file_num")
				);
				outpatient_department_data_ret.from_example = true;
				outpatient_department_data_ret.file_name =
					name_size_cont.getAttribute("title");
			})
		);

	Outpatient.outpatient_department_menu
		.querySelector(".close_outpatient_department_workspace")
		.addEventListener("click", (_) => {
			// Activate upload section
			document
				.querySelector("#outpatient_dep_sec .upload_file_sec")
				.classList.add("active");

			// Inactivate workspace section
			document
				.querySelector("#outpatient_dep_sec .workspace_sec")
				.classList.remove("active");

			// Inactivate control chart menu
			Outpatient.outpatient_department_menu.classList.remove("active");
			sectionsOpenStatus.outpatient_department_workspace_opened = false;
		});
	//
	Outpatient.outpatient_department_menu
		.querySelectorAll(".outpatient_department_icons li")
		.forEach((li) => {
			li.addEventListener("click", (_) => {
				Outpatient.outpatient_department_menu
					.querySelector(".outpatient_department_icons li.active")
					.classList.remove("active");
				li.classList.add("active");
				ActivateOutpatientDepartmentSections(li.getAttribute("sec_type"));
			});
		});

	Outpatient.outpatient_department_menu
		.querySelector(".upload_outpatient_department_file")
		.addEventListener("click", (_) =>
			Outpatient.outpatient_department_uploaded_file.click()
		);

	Outpatient.outpatient_department_file_submit_btn.addEventListener(
		"click",
		(_) => {
			ApplyOutpatientDepartment(outpatient_department_data_ret);
		}
	);
	// Main summary graph buttons
	document
		.querySelectorAll(
			"#outpatient_dep_sec .full_summary .graph .outpatient_graph_btns button"
		)
		.forEach((btn) => {
			btn.addEventListener("click", (_) => {
				document
					.querySelector(
						"#outpatient_dep_sec .full_summary .graph .outpatient_graph_btns button.active"
					)
					.classList.remove("active");
				btn.classList.add("active");
				getMainAnalysisData(
					btn.getAttribute("data_type"),
					btn.getAttribute("data_title")
				);
			});
		});

	document
		.getElementById("simulate_two_clinics")
		.addEventListener("click", (_) => {
			ActivateSimulationWindow(Outpatient.simulated_clinic_ex);
		});

	document.getElementById("try_booking_btn").addEventListener("click", (_) => {
		console.log(outpatient_department_data_ret);
		console.log(booking_ret);
		ApplyBookingSystem(booking_ret, outpatient_department_data_ret);
	});

	document
		.getElementById("booking_period")
		.addEventListener(
			"change",
			(e) => (booking_ret.appointments_time = e.target.value)
		);

	document
		.querySelectorAll("#outpatient_dep_sec .cl_graph_btns button")
		.forEach((btn) =>
			btn.addEventListener("click", (_) => {
				document
					.querySelector("#outpatient_dep_sec .cl_graph_btns button.active")
					?.classList.remove("active");
				btn.classList.add("active");
				prepareClinicGraphData(
					btn.getAttribute("data_type"),
					btn.getAttribute("data_title")
				);
			})
		);
}
