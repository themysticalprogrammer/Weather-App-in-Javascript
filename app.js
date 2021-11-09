showWeatherCards(); // Calling showWeatherCards() function to show cards while the page reloads

// Fetching Data Function
function fetchData(locationValue,index){
	fetch(`http://api.weatherapi.com/v1/current.json?key=af2f5df9717e49f795895037210411&q=${locationValue}&aqi=no`).then((response)=>{
		let data = response.json();
		
		data.then((data)=>{
			document.getElementsByClassName("container")[0].innerHTML += `
				<div class="weather-card">
				<div class="card my-3" style="width: 80vw;">
					<div class="card-body">
						<img src="${data['current']['condition']['icon']}">
						<h5>${data['current']["temp_c"]}°C</h5>
						<h6>Feels Like ${data['current']["feelslike_c"]}°C</h6>
						<h3>${data['location']['name']}, ${data['location']['region']}, ${data['location']['country']}</h3>
						<h5>${data['location']['localtime']}</h5>
						<h5>${data['current']['condition']['text']}</h5>
						<button class="btn btn-danger remove-location" id="remove-location-${index}" onclick="removeLocation(this.id)">Remove Location</button>
					</div>
				</div>
			</div>
 				`;
		}).catch(()=>{
			document.getElementsByClassName('container')[0].innerHTML = '<h2 class="text-center">Some Error Occured</h2>';
		})

	}).catch(()=>{
		document.getElementsByClassName('container')[0].innerHTML = '<h2 class="text-center">Some Error Occured</h2>';
	})

}

document.getElementById('Search-Btn').addEventListener('click',(e)=>{
	e.preventDefault()
	let locationValue = document.getElementById('add-location-input');
	if (locationValue.value != ''){
		let locationDataLocalStorage = localStorage.getItem('added-location');
		let locationArray = [];
		if (locationDataLocalStorage == null){
			locationArray = [];
		}
		else{
			locationArray = JSON.parse(locationDataLocalStorage);
		}

		console.log(locationArray);
		
		locationArray.push(locationValue.value);
		console.log(locationArray);
		locationDataLocalStorage = JSON.stringify(locationArray);
		localStorage.setItem('added-location',locationDataLocalStorage);
		showWeatherCards();
	}
	else{
		location.reload();
	}
})

// Creating showWeatherCards Function to show Weather Cards
function showWeatherCards(){
	let locationDataLocalStorage = localStorage.getItem('added-location');
		if (locationDataLocalStorage != null){
			let locationArray = JSON.parse(locationDataLocalStorage);
			document.getElementsByClassName("container")[0].innerHTML = "";
			locationArray.forEach((element,index)=>{
				fetchData(element,index);
			})
		}
		else{
			document.getElementsByClassName('container')[0].innerHTML = 'Added Locations Appear here';
		}
}
function removeLocation(id){
		id = id.split('-')[2];
		let locationArray = JSON.parse(localStorage.getItem('added-location'));
		locationArray.splice(id,1);
		localStorage.setItem('added-location',JSON.stringify(locationArray));
		showWeatherCards();
}