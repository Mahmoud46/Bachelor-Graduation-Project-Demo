import {
	ActivateHospitalComparisonFileCard,
	ActivateHospitalComparisonSections,
} from "../utils/helpers.js";
import {
	HospitalsComparison,
	hospitals_comparison_data_ret,
} from "../ui/hospitals_comparison.js";

import { ApplyHospitalComparison } from "../services/api.js";
import { sectionsOpenStatus } from "../pages/user.js";

export default function hospitalsComparison() {
	document
		.querySelector(
			"#hospital_assessment_sec .upload_file_sec .upload_side .browse_files_btn"
		)
		.addEventListener("click", (_) =>
			HospitalsComparison.hospitals_comparison_uploaded_file.click()
		);

	// Show files holder
	document
		.querySelector(
			"#hospital_assessment_sec .upload_file_sec .upload_side .show_more_files"
		)
		.addEventListener("click", (_) => {
			HospitalsComparison.hospitals_comparison_files_holder.classList.add(
				"active"
			);
		});

	// Remove files holder
	HospitalsComparison.hospitals_comparison_files_holder
		.querySelector(".remove_files_holder")
		.addEventListener("click", (_) =>
			HospitalsComparison.hospitals_comparison_files_holder.classList.remove(
				"active"
			)
		);

	HospitalsComparison.hospitals_comparison_uploaded_file.addEventListener(
		"input",
		(e) => {
			if (e.target.value != "") {
				let file_info = e.target.files[0],
					name = file_info.name.split(".")[0];

				if (
					file_info.type !=
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				) {
					alert("Please upload only xlsx files only!");
					HospitalsComparison.hospitals_comparison_uploaded_file_card.classList.remove(
						"active"
					);
					HospitalsComparison.hospitals_comparison_file_submit_btn.classList.add(
						"inactive"
					);
					return;
				}

				let reader = new FileReader();
				reader.onload = (_) => {
					let url = reader.result;
					hospitals_comparison_data_ret.file_input_data = url;
					hospitals_comparison_data_ret.file_num = 0;
					hospitals_comparison_data_ret.from_example = false;
					hospitals_comparison_data_ret.file_name = name;
					HospitalsComparison.hospitals_comparison_files_holder
						.querySelector(".files ul li.selected")
						?.classList.remove("selected");
					if (sectionsOpenStatus.hospital_comparison_workspace_opened) {
						ApplyHospitalComparison(hospitals_comparison_data_ret);
					} else {
						ActivateHospitalComparisonFileCard(name, file_info.size);
					}
					e.target.value = "";
				};

				reader.readAsDataURL(file_info);
			}
		}
	);

	HospitalsComparison.hospitals_comparison_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("click", (_) => {
			HospitalsComparison.hospitals_comparison_uploaded_file.value = "";
			HospitalsComparison.hospitals_comparison_uploaded_file_card.classList.remove(
				"active"
			);
			HospitalsComparison.hospitals_comparison_uploaded_file_card.classList.remove(
				"active"
			);
			HospitalsComparison.hospitals_comparison_file_submit_btn.classList.add(
				"inactive"
			);
			HospitalsComparison.hospitals_comparison_files_holder
				.querySelector(".files ul li.selected")
				?.classList.remove("selected");

			hospitals_comparison_data_ret.file_input_data = "";
			hospitals_comparison_data_ret.file_num = 0;
			hospitals_comparison_data_ret.from_example = false;
			hospitals_comparison_data_ret.file_name = "";
		});

	HospitalsComparison.hospitals_comparison_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("mouseover", (e) =>
			e.target.parentNode.classList.add("hover")
		);

	HospitalsComparison.hospitals_comparison_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("mouseout", (e) =>
			e.target.parentNode.classList.remove("hover")
		);

	// Choose file from example files
	HospitalsComparison.hospitals_comparison_files_holder
		.querySelectorAll(".files li")
		.forEach((li) =>
			li.addEventListener("click", (_) => {
				HospitalsComparison.hospitals_comparison_files_holder
					.querySelector(".files ul li.selected")
					?.classList.remove("selected");
				li.classList.add("selected");
				let name_size_cont = li.querySelector(".name-size");
				ActivateHospitalComparisonFileCard(
					name_size_cont.getAttribute("title"),
					parseFloat(name_size_cont.querySelector("i").innerText) * 1024
				);

				hospitals_comparison_data_ret.file_input_data = "";
				hospitals_comparison_data_ret.file_num = parseInt(
					li.getAttribute("file_num")
				);
				hospitals_comparison_data_ret.from_example = true;
				hospitals_comparison_data_ret.file_name =
					name_size_cont.getAttribute("title");
			})
		);

	// Inactivate workspace section
	HospitalsComparison.hospital_comparison_menu
		.querySelector(".close_hospital_comparison_workspace")
		.addEventListener("click", (_) => {
			// Activate upload section
			document
				.querySelector("#hospital_assessment_sec .upload_file_sec")
				.classList.add("active");

			// Inactivate workspace section
			document
				.querySelector("#hospital_assessment_sec .workspace_sec")
				.classList.remove("active");

			// Inactivate control chart menu
			HospitalsComparison.hospital_comparison_menu.classList.remove("active");
			sectionsOpenStatus.hospital_comparison_workspace_opened = false;
		});

	//
	HospitalsComparison.hospital_comparison_menu
		.querySelectorAll(".hospitals_comparison_icons li")
		.forEach((li) => {
			li.addEventListener("click", (_) => {
				HospitalsComparison.hospital_comparison_menu
					.querySelector(".hospitals_comparison_icons li.active")
					.classList.remove("active");
				li.classList.add("active");
				ActivateHospitalComparisonSections(li.getAttribute("sec_type"));
				// ActivateControlChartGraphMenu();
				// console.log(li.getAttribute("sec_type"));
			});
		});

	HospitalsComparison.hospital_comparison_menu
		.querySelector(".upload_hospital_comparison_file")
		.addEventListener("click", (_) =>
			HospitalsComparison.hospitals_comparison_uploaded_file.click()
		);

	HospitalsComparison.hospitals_comparison_file_submit_btn.addEventListener(
		"click",
		(_) => {
			ApplyHospitalComparison(hospitals_comparison_data_ret);
		}
	);
}
