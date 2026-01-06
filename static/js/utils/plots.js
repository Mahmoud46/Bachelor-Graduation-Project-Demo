// Control Charts

export function PlotChart(graph_cont, plot_data, plot_title, x_label, y_label) {
	const config = { responsive: true };

	let new_data = plot_data,
		new_layout = {
			title: plot_title.toUpperCase(),
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			showlegend: true,
			legend: { orientation: "v" },
			margin: {
				l: 70,
				r: 10,
				b: 30,
				t: 30,
				pad: 1,
			},
			xaxis: {
				type: "data",
				title: x_label,
				showgrid: false,
			},
			yaxis: {
				type: "linear",
				title: y_label,
				showgrid: false,
			},
			height: 370,
			width: 1000,
			font: { color: "#f2dabf80", size: "10" },
			hoverlabel: {
				bgcolor: "black",
				font: { color: "#ffffff80" },
			},
		};
	Plotly.newPlot(graph_cont, new_data, new_layout, config);
}

// Outpatient
export function plotMainAnalysisData(x_data, y_data, data_title) {
	let data = [
			{
				x: x_data,
				y: y_data,
				type: "bar",
				name: data_title,
				marker: {
					color: "#f2dabf",
				},
				text: y_data.map(String),
				textposition: "auto",
			},
		],
		layout = {
			title: data_title,
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			// showlegend: true,
			barmode: "group",
			legend: { orientation: "v" },
			margin: {
				l: 30,
				r: 60,
				b: 80,
				t: 30,
				pad: 1,
			},
			xaxis: {
				type: "data",
				showgrid: false,
			},
			yaxis: {
				type: "linear",
				showgrid: false,
			},
			height: 350,
			width: 700,
			font: { color: "#fff", size: "9" },
			hoverlabel: {
				bgcolor: "black",
				font: { color: "white" },
			},
		};

	Plotly.newPlot("outpatient_clinics_graph", data, layout);
}

export function PlotSimulationData(
	x1_data,
	y1_data,
	x2_data,
	y2_data,
	data1_title,
	data2_title,
	main_title
) {
	let data = [
			{
				x: x1_data,
				y: y1_data,
				type: "bar",
				name: data1_title,
				marker: {
					color: "#f2dabf",
				},
				// text: y1_data.map(String),
				textposition: "auto",
			},
			{
				x: x2_data,
				y: y2_data,
				type: "bar",
				name: data2_title,
				marker: {
					color: "#ff662b",
				},
				// text: y2_data.map(String),
				textposition: "auto",
			},
		],
		layout = {
			title: main_title,
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			// showlegend: true,
			barmode: "group",
			legend: { orientation: "h" },
			margin: {
				l: 30,
				r: 60,
				b: 80,
				t: 30,
				pad: 1,
			},
			xaxis: {
				type: "data",
				showgrid: false,
			},
			yaxis: {
				type: "linear",
				showgrid: false,
			},
			height: 300,
			width: 300,
			font: { color: "#fff", size: "9" },
			hoverlabel: {
				bgcolor: "black",
				font: { color: "white" },
			},
			bargroupgap: 0.1,
		};

	Plotly.newPlot("simulation_graph", data, layout);
}

export function plotClinicGraph(
	x1_data,
	y1_data,
	x2_data,
	y2_data,
	data1_title,
	data2_title,
	main_title
) {
	let data = [
			{
				x: x1_data,
				y: y1_data,
				type: "bar",
				name: data1_title,
				marker: {
					color: "#f2dabf",
				},
				text: y1_data.map(String),
				textposition: "auto",
			},
			{
				x: x2_data,
				y: y2_data,
				type: "bar",
				name: data2_title,
				marker: {
					color: "#ff662b",
				},
				text: y2_data.map(String),
				textposition: "auto",
			},
		],
		layout = {
			title: main_title,
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			// showlegend: true,
			barmode: "group",
			legend: { orientation: "h" },
			margin: {
				l: 30,
				r: 60,
				b: 80,
				t: 30,
				pad: 1,
			},
			xaxis: {
				type: "data",
				showgrid: false,
			},
			yaxis: {
				type: "linear",
				showgrid: false,
			},
			height: 350,
			width: 400,
			font: { color: "#fff", size: "9" },
			hoverlabel: {
				bgcolor: "black",
				font: { color: "white" },
			},
			bargroupgap: 0.1,
		};

	Plotly.newPlot("cl_graph", data, layout);
}
