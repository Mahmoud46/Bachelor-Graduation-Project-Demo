import {
	plotClinicGraph,
	PlotSimulationData,
	plotMainAnalysisData,
	PlotChart,
} from "./plots.js";

import { Outpatient, booking_ret } from "../ui/outpatient.js";
import { sectionsOpenStatus } from "../pages/user.js";
import { ControlCharts } from "../ui/control_charts.js";
import { HospitalsComparison } from "../ui/hospitals_comparison.js";

export function activateSection(sec_id) {
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
					if (sectionsOpenStatus.control_charts_workspace_opened) {
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
					if (sectionsOpenStatus.hospital_comparison_workspace_opened) {
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
					if (sectionsOpenStatus.outpatient_department_workspace_opened) {
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

export function ActivateControlChartGraphMenu() {
	let control_charts_graph_menu = document.querySelector(
		".control_charts_graph_menu"
	);
	if (
		ControlCharts.control_charts_menu.classList.contains("active") &&
		ControlCharts.control_charts_menu
			.querySelector("li.ccw")
			.classList.contains("active") &&
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

export function SpreadUserData(user_data) {
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

// Control Charts
// Activation file card when uplaoding or selecting file for applying control chart
export function ActivateControlChartFileCard(name, size) {
	ControlCharts.control_chart_uploaded_file_card.querySelector(
		".name-size"
	).innerHTML = `${
		name.length > 20 ? `${name.substring(0, 20)}...` : name
	}<i>${(size / 1024).toFixed(2)} kb</i>`;

	ControlCharts.control_chart_uploaded_file_card
		.querySelector(".name-size")
		.setAttribute("title", name);

	ControlCharts.control_chart_uploaded_file_card.classList.add("active");

	ControlCharts.control_chart_file_submit_btn.classList.remove("inactive");
}

// Activate control charts secitons (charts and analysis summary)
export function ActivateControlChartsSections(sec_type) {
	document
		.querySelector("#control_charts_sec .wrk-sections.active")
		.classList.remove("active");
	document.getElementById(sec_type).classList.add("active");
}

// Creaitng data for the plot
export function GetControlChartPlotData(result) {
	let graph_coordinates = result.graph_coordinates,
		lcl_line = result.lcl_line,
		ucl_line = result.ucl_line,
		mean_line = result.mean_line,
		svc_trend_points = result.scv_with_pattern,
		scv_out_limits_points = result.scv_out_of_limits;

	let graph = {
			mode: "lines+markers",
			x: graph_coordinates.x,
			y: graph_coordinates.y,
			line: {
				color: "#80FFB380",
				dash: "solid",
			},
			name: result.y_label,
			hoverinfo: "x+y",
			showlegend: true,
		},
		lcl = {
			mode: "lines",
			x: lcl_line.x,
			y: lcl_line.y,
			line: {
				color: "#FFB38080",
				dash: "dash",
			},
			name: "Low control level",
			hoverinfo: "x+y",
		},
		ucl = {
			mode: "lines",
			x: ucl_line.x,
			y: ucl_line.y,
			line: {
				color: "#FFB38080",
				dash: "dash",
			},
			name: "Upper control level",
			hoverinfo: "x+y",
		},
		mean = {
			mode: "lines",
			x: mean_line.x,
			y: mean_line.y,
			line: {
				color: "#80BFFF80",
				dash: "dash",
			},
			name: "Mean",
			hoverinfo: "x+y",
		},
		svc_trend = {
			mode: "markers",
			x: svc_trend_points.x,
			y: svc_trend_points.y,
			line: {
				color: "#FF808080",
			},
			name: "Trends",
			hoverinfo: "x+y",
		},
		svc_out_limits = {
			mode: "markers",
			x: scv_out_limits_points.x,
			y: scv_out_limits_points.y,
			line: {
				color: "#FF808080",
			},
			name: "Special control variation",
			hoverinfo: "x+y",
		};

	return [graph, mean, lcl, ucl, svc_trend, svc_out_limits];
}

// Preparing for displaying return data form control charts api
export function HandleControlChartData(result) {
	let result_data = result.result,
		sum_cont = document.querySelector(
			"#control_charts_sec .workspace_sec #summary_window .cnt"
		),
		charts_cont = document.querySelector(
			"#control_charts_sec .workspace_sec #control_charts_window .charts_cont"
		),
		fix_button = ControlCharts.control_charts_menu.querySelector(
			"ul li.fix_chart_btn"
		);
	// Add summary to summary container
	sum_cont.innerHTML = result_data.res_text;

	document.getElementById("graph_02").classList.contains("active")
		? document.getElementById("graph_02").classList.remove("active")
		: null;

	document.getElementById("graph_01").classList.contains("active")
		? null
		: document.getElementById("graph_01").classList.add("active");

	if (
		result_data.hasOwnProperty("chart_01") &&
		result_data.hasOwnProperty("chart_02")
	) {
		// fix_button.style.display = "none";
		fix_button.classList.contains("active")
			? fix_button.classList.remove("active")
			: null;

		PlotChart(
			"graph_01",
			PrepareChartsInfo(result_data.chart_01),
			result_data.chart_01.chart_used,
			" ",
			result_data.chart_01.y_label
		);
		PlotChart(
			"graph_02",
			PrepareChartsInfo(result_data.chart_02),
			result_data.chart_02.chart_used,
			" ",
			result_data.chart_02.y_label
		);

		document.getElementById("graph_02").classList.contains("exist")
			? null
			: document.getElementById("graph_02").classList.add("exist");

		ActivateControlChartGraphMenu();
	} else {
		PlotChart(
			"graph_01",
			PrepareChartsInfo(result_data),
			result_data.chart_used,
			" ",
			result_data.y_label
		);

		document.getElementById("graph_02").classList.contains("exist")
			? document.getElementById("graph_02").classList.remove("exist")
			: null;
		ActivateControlChartGraphMenu();

		if (!result_data.is_controlled && result_data.can_be_fixed) {
			fix_button.classList.contains("active")
				? null
				: fix_button.classList.add("active");

			document.getElementById("graph_02").classList.contains("exist")
				? document.getElementById("graph_02").classList.remove("exist")
				: null;
			ActivateControlChartGraphMenu();

			fix_button.addEventListener("click", (_) => {
				sum_cont.innerHTML = `\n${result_data.new_res_text}`;
				// fix_button.style.display = "none";

				fix_button.classList.contains("active")
					? fix_button.classList.remove("active")
					: null;

				PlotChart(
					"graph_01",
					PrepareChartsInfo(result_data),
					result_data.chart_used,
					" ",
					result_data.y_label
				);

				PlotChart(
					"graph_02",
					PrepareChartsInfo(result_data.new_res),
					`Fixed ${result_data.new_res.chart_used}`,
					" ",
					result_data.y_label
				);

				document.getElementById("graph_02").classList.contains("exist")
					? null
					: document.getElementById("graph_02").classList.add("exist");

				ActivateControlChartGraphMenu();
			});
		} else {
			fix_button.classList.contains("active")
				? fix_button.classList.remove("active")
				: null;

			document.getElementById("graph_02").classList.contains("exist")
				? document.getElementById("graph_02").classList.remove("exist")
				: null;

			ActivateControlChartGraphMenu();
		}
	}
	return;
}

export function PrepareChartsInfo(result) {
	let graph_coordinates = result.graph_coordinates,
		lcl_line = result.lcl_line,
		ucl_line = result.ucl_line,
		mean_line = result.mean_line,
		svc_trend_points = result.scv_with_pattern,
		scv_out_limits_points = result.scv_out_of_limits;

	let graph = {
			mode: "lines+markers",
			x: graph_coordinates.x,
			y: graph_coordinates.y,
			line: {
				color: "#80ffb3",
				dash: "solid",
			},
			name: result.y_label,
			hoverinfo: "x+y",
			showlegend: true,
		},
		lcl = {
			mode: "lines",
			x: lcl_line.x,
			y: lcl_line.y,
			line: {
				color: "#ffb380",
				dash: "dash",
			},
			name: "Low control level",
			hoverinfo: "x+y",
		},
		ucl = {
			mode: "lines",
			x: ucl_line.x,
			y: ucl_line.y,
			line: {
				color: "#ffb380",
				dash: "dash",
			},
			name: "Upper control level",
			hoverinfo: "x+y",
		},
		mean = {
			mode: "lines",
			x: mean_line.x,
			y: mean_line.y,
			line: {
				color: "#80bfff",
				dash: "dash",
			},
			name: "Mean",
			hoverinfo: "x+y",
		},
		svc_trend = {
			mode: "markers",
			x: svc_trend_points.x,
			y: svc_trend_points.y,
			line: {
				color: "#ff662b",
			},
			name: "Trends",
			hoverinfo: "x+y",
		},
		svc_out_limits = {
			mode: "markers",
			x: scv_out_limits_points.x,
			y: scv_out_limits_points.y,
			line: {
				color: "#ff662b",
			},
			name: "Special control variation",
			hoverinfo: "x+y",
		};

	return [graph, mean, lcl, ucl, svc_trend, svc_out_limits];
}

export function ActivateControlChartGraph(sec_type) {
	document
		.querySelector(
			"#control_charts_sec .charts_cont .control_chart_graph.active"
		)
		.classList.remove("active");
	document.getElementById(sec_type).classList.add("active");
}

// Outpatient
export function ActivateOutpatientDepartmentFileCard(name, size) {
	Outpatient.outpatient_department_uploaded_file_card.querySelector(
		".name-size"
	).innerHTML = `${
		name.length > 20 ? `${name.substring(0, 20)}...` : name
	}<i>${(size / 1024).toFixed(2)} kb</i>`;

	Outpatient.outpatient_department_uploaded_file_card
		.querySelector(".name-size")
		.setAttribute("title", name);

	Outpatient.outpatient_department_uploaded_file_card.classList.add("active");

	Outpatient.outpatient_department_file_submit_btn.classList.remove("inactive");
}

export function prepareClinicGraphData(data_type, data_title) {
	console.log(parseInt(Outpatient.clinics_names.value.split("-")[1]));

	console.log(Outpatient.outpatient_department_result.main_analysis[data_type]);
	let data_mean = (
			Outpatient.outpatient_department_result.main_analysis[data_type].reduce(
				(accumulator, currentValue) => accumulator + currentValue,
				0
			) /
			Outpatient.outpatient_department_result.main_analysis[data_type].length
		).toFixed(2),
		data_value =
			Outpatient.outpatient_department_result.main_analysis[data_type][
				parseInt(Outpatient.clinics_names.value.split("-")[1])
			];
	plotClinicGraph(
		[`${Outpatient.clinics_names.value.split("-")[0].toUpperCase()}`],
		[data_value],
		["OPD"],
		[data_mean],
		data_title,
		`OPD ${data_title}`,
		""
	);
}

export function ActivateOutpatientDepartmentSections(sec_type) {
	document
		.querySelector("#outpatient_dep_sec .wrk-sections.active")
		.classList.remove("active");
	document.getElementById(sec_type).classList.add("active");
}

export function HandleOutpatientDepartmentData(data) {
	Outpatient.outpatient_department_result = data.result;
	console.log(Outpatient.outpatient_department_result);

	// Full analysis
	document.querySelector(
		"#outpatient_dep_sec .full_summary .main_summary"
	).innerHTML = Outpatient.outpatient_department_result.summary_report;

	getMainAnalysisData("mean_waiting_times", "Mean waiting time (min.)");

	// For each clinic
	let clinic_types =
		Outpatient.outpatient_department_result.main_analysis.clinic_types;
	Outpatient.clinics_names.innerHTML = "";
	for (let i = 0; i < clinic_types.length; i++) {
		if (i == 0)
			Outpatient.clinics_names.innerHTML += `<option value="${
				clinic_types[i]
			}-${i}" selected ">${clinic_types[i].toUpperCase()}</option>`;
		else {
			Outpatient.clinics_names.innerHTML += `<option value="${
				clinic_types[i]
			}-${i}" >${clinic_types[i].toUpperCase()}</option>`;
		}
	}

	document.querySelector("#outpatient_dep_sec .clinics_header h1").innerText =
		Outpatient.clinics_names.value.split("-")[0].toUpperCase();

	getClinicData(
		Outpatient.clinics_names.value.split("-")[1],
		Outpatient.clinics_names.value.split("-")[0]
	);

	Outpatient.clinics_names.addEventListener("change", (_) => {
		getClinicData(
			Outpatient.clinics_names.value.split("-")[1],
			Outpatient.clinics_names.value.split("-")[0]
		);
		document.querySelector("#outpatient_dep_sec .clinics_header h1").innerText =
			Outpatient.clinics_names.value.split("-")[0].toUpperCase();
		prepareClinicGraphData("mean_waiting_times", "Waiting time (min.)");
		document
			.querySelectorAll("#outpatient_dep_sec .cl_graph_btns button")
			.forEach((btn) => btn.classList.remove("active"));
		document
			.querySelectorAll("#outpatient_dep_sec .cl_graph_btns button")[0]
			.classList.add("active");
	});

	prepareClinicGraphData("mean_waiting_times", "Waiting time (min.)");
	document
		.querySelectorAll("#outpatient_dep_sec .cl_graph_btns button")
		.forEach((btn) => btn.classList.remove("active"));
	document
		.querySelectorAll("#outpatient_dep_sec .cl_graph_btns button")[0]
		.classList.add("active");
}

export function getMainAnalysisData(data_type, data_title) {
	let main_analysis = Outpatient.outpatient_department_result.main_analysis;
	plotMainAnalysisData(
		main_analysis.clinic_types,
		main_analysis[data_type],
		data_title
	);
	return;
}

function getClinicData(clinic_number, clinic_name) {
	let main_analysis = Outpatient.outpatient_department_result.main_analysis,
		simulate_servers = Outpatient.outpatient_department_result.simulate_servers,
		clinics_reports = Outpatient.outpatient_department_result.clinics_reports;
	// Booking
	booking_ret.appointments_time =
		document.getElementById("booking_period").value;
	booking_ret.mean_interarrival_time =
		main_analysis.mean_interarrival_time[parseInt(clinic_number)];
	booking_ret.mean_patient_num =
		main_analysis.mean_number_of_patients[parseInt(clinic_number)];
	console.log(booking_ret);

	// Two clinics
	console.log(clinic_name);
	Outpatient.simulated_clinic_ex = simulate_servers[clinic_name];
	console.log(clinics_reports[clinic_name]);
	// return (
	// 	simulate_servers[parseInt(clinic_number)], clinics_reports[clinic_name]
	// );
	AddClinicReport(clinics_reports[clinic_name]);
	Outpatient.simulation_window_info.classList.contains("active")
		? Outpatient.simulation_window_info.classList.remove("active")
		: null;
}

function AddClinicReport(clinic_report) {
	document.querySelector(
		"#outpatient_dep_sec .clinics_body .clinic_summary .cl_sum"
	).innerHTML = clinic_report;
}

export function ActivateSimulationWindow(res) {
	console.log(res);

	Outpatient.simulation_window_info.classList.contains("active")
		? null
		: Outpatient.simulation_window_info.classList.add("active");

	PlotSimulationData(
		[Outpatient.clinics_names.value.split("-")[0]],
		[res.before_after[0]],
		[Outpatient.clinics_names.value.split("-")[0]],
		[res.before_after[1]],
		"Without establishing an additional clinic",
		"With establishing an additional clinic ",
		""
	);

	Outpatient.simulation_window_info.querySelector("p").innerHTML =
		res.analysis_summary;
	Outpatient.simulation_window_info.querySelector("h1").innerText =
		"Effect of establishing an additional clinic on waiting time for patients";
}

export function ActivateSimulationBookingWindow(res) {
	console.log(res);

	Outpatient.simulation_window_info.classList.contains("active")
		? null
		: Outpatient.simulation_window_info.classList.add("active");

	PlotSimulationData(
		[Outpatient.clinics_names.value.split("-")[0]],
		[res.before_after[0]],
		[Outpatient.clinics_names.value.split("-")[0]],
		[res.before_after[1]],
		"Without performing booking system",
		"With performing booking system ",
		""
	);

	Outpatient.simulation_window_info.querySelector("p").innerHTML =
		res.analysis_summary;
	Outpatient.simulation_window_info.querySelector(
		"h1"
	).innerText = `Effect of performing ${res.times} min. booking system on waiting time for patients`;
}

// Hospitals Comparison
export function ActivateHospitalComparisonFileCard(name, size) {
	HospitalsComparison.hospitals_comparison_uploaded_file_card.querySelector(
		".name-size"
	).innerHTML = `${
		name.length > 20 ? `${name.substring(0, 20)}...` : name
	}<i>${(size / 1024).toFixed(2)} kb</i>`;

	HospitalsComparison.hospitals_comparison_uploaded_file_card
		.querySelector(".name-size")
		.setAttribute("title", name);

	HospitalsComparison.hospitals_comparison_uploaded_file_card.classList.add(
		"active"
	);

	HospitalsComparison.hospitals_comparison_file_submit_btn.classList.remove(
		"inactive"
	);
}

// Activate control charts secitons (charts and analysis summary)
export function ActivateHospitalComparisonSections(sec_type) {
	document
		.querySelector("#hospital_assessment_sec .wrk-sections.active")
		.classList.remove("active");
	document.getElementById(sec_type).classList.add("active");
}

export function HandleHospitalComparisonData(result) {
	// console.log(result);
	let result_data = result.result,
		sum_cont = document.querySelector(
			"#hospital_assessment_sec .workspace_sec #hospital_comparison_summary_window .cnt"
		),
		hospital_detailes = document.querySelector(
			"#hospital_assessment_sec .hospital_detailes"
		);

	sum_cont.innerHTML = result_data.analysis_summary;
	hospital_detailes.querySelector("h2").innerText = "";
	hospital_detailes.querySelector(".hos_data_cont").innerHTML = "";
	document.querySelector(
		"#hospital_assessment_sec .hospitals_header .hos_nums"
	).innerText = result_data.combined_methods.length;
	document.querySelector(
		"#hospital_assessment_sec .hospitals_header .inef_hos_nums"
	).innerText = result_data.ineff_ent.length;
	AddHospitalsCardToContainer(result_data.combined_methods);

	document
		.querySelectorAll(
			"#hospital_assessment_sec .hospitals_container ul li.hospital_card .show_more_detailes_btn"
		)
		.forEach((li) =>
			li.addEventListener("click", (_) =>
				GetHospitalData(
					li.getAttribute("hosp_name"),
					result_data.det_data,
					result_data.combined_methods
				)
			)
		);
}

function AddHospitalsCardToContainer(hospital_list) {
	let hospitals_cont = document.querySelector(
		"#hospital_assessment_sec .hospitals_container ul"
	);
	hospitals_cont.innerHTML = "";
	for (let i = 0; i < hospital_list.length; i++) {
		let hospital = hospital_list[i];
		hospitals_cont.innerHTML += `<li class="hospital_card ${hospital.stat}">
								<span class="num">${i + 1}</span>
								<p class="name-det">
									<span class="name">${hospital.type}</span>
									<span
										><i>Mean: ${hospital.mean}</i>, <i>Standard deviation: ${hospital.std}</i>,
										<i>E: ${hospital.E}</i></span
									>
								</p>
								<span
									class="show_more_detailes_btn material-symbols-outlined"
									hosp_name="${hospital.type}"
									title="Show more detailes">
									quick_reference
								</span>
							</li>`;
	}
}

function GetHospitalData(hospital_name, hospitals_data, norm_dea_data) {
	let ip = hospitals_data[0],
		op = hospitals_data[1];

	let hospital_detailes = document.querySelector(
		"#hospital_assessment_sec .hospital_detailes"
	);
	hospital_detailes.querySelector("h2").innerText = hospital_name;
	hospital_detailes.querySelector(".hos_data_cont").innerText = "";
	norm_dea_data.forEach((ent) =>
		ent.type == hospital_name
			? (hospital_detailes.querySelector(
					".hos_data_cont"
			  ).innerHTML += `<h3>Data Envelopment Analysis (DEA)</h3>
								<p>
									<span class="material-symbols-outlined">
										arrow_forward_ios </span
									><span
										>Fraction of the hospitals's input available to the group
										composit hospital (E)</span
									>
									<span>${ent.E}</span>
								</p>
								<h3>Normalized statistics</h3>
								<p>
									<span class="material-symbols-outlined">
										arrow_forward_ios </span
									><span>Mean</span> <span>${ent.mean}</span>
								</p>
								<p>
									<span class="material-symbols-outlined">
										arrow_forward_ios </span
									><span>Standard deviation</span> <span>${ent.std}</span>
								</p>`)
			: null
	);
	hospital_detailes.querySelector(".hos_data_cont").innerHTML +=
		"<h3>Inputs</h3>";
	for (let i = 0; i < ip[hospital_name].length; i++)
		hospital_detailes.querySelector(".hos_data_cont").innerHTML += `<p>
									<span class="material-symbols-outlined">
										arrow_forward_ios </span
									><span>${ip.attributes[i]}</span> <span>${ip[hospital_name][i]}</span>
								</p>`;

	hospital_detailes.querySelector(".hos_data_cont").innerHTML +=
		"<h3>Outputs</h3>";

	for (let i = 0; i < op[hospital_name].length; i++)
		hospital_detailes.querySelector(".hos_data_cont").innerHTML += `<p>
									<span class="material-symbols-outlined">
										arrow_forward_ios </span
									><span>${op.attributes[i]}</span> <span>${op[hospital_name][i]}</span>
								</p>`;
}
