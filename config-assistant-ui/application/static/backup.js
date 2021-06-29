var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
let region = document.getElementById('regionID');
let bucket = document.getElementById('SourceBucketName');

region.onchange = function () {
	const region_val = region.value;
	current = bucket.selectedIndex;
	while (bucket.options.length > 1) {
		bucket.remove(1);
	}

	fetch('/region/' + region_val).then(function (response) {
		response.json().then(function (data) {
			for (let region_it of data.datas) {

				const option = document.createElement("option");
				option.value = region_it;
				option.text = region_it;
				bucket.appendChild(option);

			}
			bucket.options[current].selected = true;
		});
	});
}
