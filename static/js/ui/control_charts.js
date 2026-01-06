export const ControlCharts = {
	control_charts_uploaded_file: document.getElementById("control_chart_file"),
	control_chart_uploaded_file_card: document.querySelector(
		"#control_charts_sec .upload_file_sec .uploaded_file"
	),
	control_chart_file_submit_btn: document.querySelector(
		"#control_charts_sec .upload_file_sec .submit_file"
	),
	control_charts_files_holder: document.querySelector(
		"#control_charts_sec .upload_file_sec .upload_side .files_holder"
	),
	control_charts_menu: document.querySelector(".control_charts_menu"),
};

export let control_charts_data_ret = {
	from_example: false,
	file_num: 0,
	file_input_data: "",
	file_name: "",
};
