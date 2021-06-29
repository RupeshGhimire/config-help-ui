
$(document).ready(function () {

	$("#region ").on("change", function (event) {
		var region = $("#region ").val();
		
		current_opt_bucket_name = $('#bucketname').prop('selectedIndex')

		$('#bucketname option:gt(0)').remove();
		$('#bucketname').append($('<option>', {
			value: 'commerciallines-ingestion-' + region.toLowerCase() + '-use',
			text: 'commerciallines-ingestion-' + region.toLowerCase() + '-use',
			selected: ( current_opt_bucket_name == 1) ? true : false 
		}));
		$('#bucketname').append($('<option>', {
			value: 'personallines-ingestion-' + region.toLowerCase() + '-use',
			text: 'personallines-ingestion-' + region.toLowerCase() + '-use',
			selected: ( current_opt_bucket_name == 2) ? true : false 
		}));
		$('#bucketname').append($('<option>', {
			value: 'ratings-ingestion-' + region.toLowerCase() + '-use',
			text: 'ratings-ingestion-' + region.toLowerCase() + '-use',
			selected: ( current_opt_bucket_name == 3) ? true : false 
		}));


		current_opt_dest_bucket_name = $('#destinationBucket').prop('selectedIndex')

		$('#destinationBucket option:gt(0)').remove();
		$('#destinationBucket').append($('<option>', {
			value: 'commerciallines-ingestion-' + region.toLowerCase() + '-use',
			text: 'commerciallines-ingestion-' + region.toLowerCase() + '-use',
			selected: ( current_opt_dest_bucket_name == 1) ? true : false 
		}));
		$('#destinationBucket').append($('<option>', {
			value: 'personallines-ingestion-' + region.toLowerCase() + '-use',
			text: 'personallines-ingestion-' + region.toLowerCase() + '-use',
			selected: ( current_opt_dest_bucket_name == 2) ? true : false 
		}));
		$('#destinationBucket').append($('<option>', {
			value: 'ratings-ingestion-' + region.toLowerCase() + '-use',
			text: 'ratings-ingestion-' + region.toLowerCase() + '-use',
			selected: ( current_opt_dest_bucket_name == 3) ? true : false 
		}));
	
	});

	$("#ingestion_form_main").on("change", function (event) {		
		
		event.preventDefault();
		form_data = $(this).serializeArray();
		console.log(form_data)
		form_json = JSON.stringify(form_data)

		$.post("/form_change", {
			form_data: form_json
		}).then(function (response) {

			$("#jpre").empty();
			json_data = JSON.stringify(response, null, " ");

			json_data = json_data.replaceAll(/"<span style='color:#f39772'>[0-9]+<\/span>"[\s\S]*?/g, "<span style='color:#f39772'>0<\/span>");
			json_data = json_data.replaceAll(/"<span style='color:#f39772'>false<\/span>"[\s\S]*?/g, "<span style='color:#f39772'>false<\/span>");
			json_data = json_data.replaceAll(/"<span style='color:#f39772'>true<\/span>"[\s\S]*?/g, "<span style='color:#f39772'>true<\/span>");

			$("#jpre").append('<pre>' + json_data + "</pre>");
			$("#jpre").css('color', '#80d4fa');
			$("#jpre").css('background-color', '#212121');
		});
	});

});


