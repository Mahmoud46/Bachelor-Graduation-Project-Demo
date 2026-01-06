export const HospitalsComparison = {
	hospitals_comparison_uploaded_file: document.getElementById(
		"hospital_comparison_file"
	),
	hospitals_comparison_uploaded_file_card: document.querySelector(
		"#hospital_assessment_sec .upload_file_sec .uploaded_file"
	),
	hospitals_comparison_file_submit_btn: document.querySelector(
		"#hospital_assessment_sec .upload_file_sec .submit_file"
	),
	hospitals_comparison_files_holder: document.querySelector(
		"#hospital_assessment_sec .upload_file_sec .upload_side .files_holder"
	),
	hospital_comparison_menu: document.querySelector(".hospital_comparison_menu"),
};

export let hospitals_comparison_data_ret = {
	from_example: false,
	file_num: 0,
	file_input_data: "",
	file_name: "",
};
