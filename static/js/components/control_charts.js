import {
	ActivateControlChartGraphMenu,
	ActivateControlChartFileCard,
	ActivateControlChartsSections,
	ActivateControlChartGraph,
} from "../utils/helpers.js";
import { ApplyControlCharts } from "../services/api.js";
import { control_charts_data_ret } from "../ui/control_charts.js";
import { ControlCharts } from "../ui/control_charts.js";
import { sectionsOpenStatus } from "../pages/user.js";

export default function controlCharts() {
	document
		.querySelector(
			"#control_charts_sec .upload_file_sec .upload_side .browse_files_btn"
		)
		.addEventListener("click", (_) =>
			ControlCharts.control_charts_uploaded_file.click()
		);

	// Show files holder
	document
		.querySelector(
			"#control_charts_sec .upload_file_sec .upload_side .show_more_files"
		)
		.addEventListener("click", (_) => {
			ControlCharts.control_charts_files_holder.classList.add("active");
		});

	// Remove files holder
	ControlCharts.control_charts_files_holder
		.querySelector(".remove_files_holder")
		.addEventListener("click", (_) =>
			ControlCharts.control_charts_files_holder.classList.remove("active")
		);

	ControlCharts.control_charts_uploaded_file.addEventListener("input", (e) => {
		if (e.target.value != "") {
			let file_info = e.target.files[0],
				name = file_info.name.split(".")[0];

			if (file_info.type != "text/csv") {
				alert("Please upload only csv files only!");
				ControlCharts.control_chart_uploaded_file_card.classList.remove(
					"active"
				);
				ControlCharts.control_chart_file_submit_btn.classList.add("inactive");
				return;
			}

			let reader = new FileReader();
			reader.onload = (_) => {
				let url = reader.result;
				control_charts_data_ret.file_input_data = url;
				control_charts_data_ret.file_num = 0;
				control_charts_data_ret.from_example = false;
				control_charts_data_ret.file_name = name;
				ControlCharts.control_charts_files_holder
					.querySelector(".files ul li.selected")
					?.classList.remove("selected");

				if (sectionsOpenStatus.control_charts_workspace_opened) {
					ApplyControlCharts(control_charts_data_ret);
				} else {
					ActivateControlChartFileCard(name, file_info.size);
				}
				e.target.value = "";
			};

			reader.readAsDataURL(file_info);
		}
	});

	ControlCharts.control_chart_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("click", (_) => {
			ControlCharts.control_charts_uploaded_file.value = "";
			ControlCharts.control_chart_uploaded_file_card.classList.remove("active");
			ControlCharts.control_chart_uploaded_file_card.classList.remove("active");
			ControlCharts.control_chart_file_submit_btn.classList.add("inactive");
			ControlCharts.control_charts_files_holder
				.querySelector(".files ul li.selected")
				?.classList.remove("selected");

			control_charts_data_ret.file_input_data = "";
			control_charts_data_ret.file_num = 0;
			control_charts_data_ret.from_example = false;
			control_charts_data_ret.file_name = "";
		});

	ControlCharts.control_chart_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("mouseover", (e) =>
			e.target.parentNode.classList.add("hover")
		);

	ControlCharts.control_chart_uploaded_file_card
		.querySelector(".delete_file")
		.addEventListener("mouseout", (e) =>
			e.target.parentNode.classList.remove("hover")
		);

	// Choose file from example files
	ControlCharts.control_charts_files_holder
		.querySelectorAll(".files li")
		.forEach((li) =>
			li.addEventListener("click", (_) => {
				ControlCharts.control_charts_files_holder
					.querySelector(".files ul li.selected")
					?.classList.remove("selected");
				li.classList.add("selected");
				let name_size_cont = li.querySelector(".name-size");
				ActivateControlChartFileCard(
					name_size_cont.getAttribute("title"),
					parseFloat(name_size_cont.querySelector("i").innerText) * 1024
				);

				control_charts_data_ret.file_input_data = "";
				control_charts_data_ret.file_num = parseInt(
					li.getAttribute("file_num")
				);
				control_charts_data_ret.from_example = true;
				control_charts_data_ret.file_name =
					name_size_cont.getAttribute("title");

				ActivateControlChartGraphMenu();
			})
		);

	ControlCharts.control_chart_file_submit_btn.addEventListener("click", (_) => {
		ApplyControlCharts(control_charts_data_ret);
	});

	// Inactivate workspace section
	ControlCharts.control_charts_menu
		.querySelector(".close_control_chart_workspace")
		.addEventListener("click", (_) => {
			// Activate upload section
			document
				.querySelector("#control_charts_sec .upload_file_sec")
				.classList.add("active");

			// Inactivate workspace section
			document
				.querySelector("#control_charts_sec .workspace_sec")
				.classList.remove("active");

			// Inactivate control chart menu
			ControlCharts.control_charts_menu.classList.remove("active");
			sectionsOpenStatus.control_charts_workspace_opened = false;
			ActivateControlChartGraphMenu();
		});

	//
	ControlCharts.control_charts_menu
		.querySelectorAll(".chart_icons li")
		.forEach((li) => {
			li.addEventListener("click", (_) => {
				ControlCharts.control_charts_menu
					.querySelector(".chart_icons li.active")
					.classList.remove("active");
				li.classList.add("active");
				ActivateControlChartsSections(li.getAttribute("sec_type"));
				ActivateControlChartGraphMenu();
			});
		});

	ControlCharts.control_charts_menu
		.querySelector(".upload_control_chart_file")
		.addEventListener("click", (_) =>
			ControlCharts.control_charts_uploaded_file.click()
		);

	document.querySelectorAll(".control_charts_graph_menu li").forEach((li) => {
		li.addEventListener("click", (_) => {
			document
				.querySelector(".control_charts_graph_menu li.active")
				.classList.remove("active");
			li.classList.add("active");
			ActivateControlChartGraph(li.getAttribute("sec_type"));
		});
	});

	ActivateControlChartGraphMenu();
}
