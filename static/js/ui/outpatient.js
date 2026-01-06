export const Outpatient = {
	outpatient_department_uploaded_file: document.getElementById(
		"outpatinet_department_file"
	),
	outpatient_department_uploaded_file_card: document.querySelector(
		"#outpatient_dep_sec .upload_file_sec .uploaded_file"
	),
	outpatient_department_file_submit_btn: document.querySelector(
		"#outpatient_dep_sec .upload_file_sec .submit_file"
	),
	outpatient_department_files_holder: document.querySelector(
		"#outpatient_dep_sec .upload_file_sec .upload_side .files_holder"
	),
	outpatient_department_menu: document.querySelector(
		".outpatient_department_menu"
	),
	clinics_names: document.getElementById("clinics_names"),
	simulation_window_info: document.querySelector(
		"#outpatient_dep_sec .simulation_graphs"
	),
	outpatient_department_result: {},
	simulated_clinic_ex: {},
};

export let outpatient_department_data_ret = {
		from_example: false,
		file_num: 0,
		file_input_data: "",
		file_name: "",
	},
	booking_ret = {
		mean_patient_num: 0,
		appointments_time: 0,
		mean_interarrival_time: 0,
	};
