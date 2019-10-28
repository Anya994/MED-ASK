var servicesList;
var companyList;
var numsList;

function loadData(data) {
	numsList = data.data;
	//alert(numsList.length);
}

function getInfoByNumber(num) {
	if (num.length > 10) {
		//alert(num);
		var numInfo = numsList.filter(obj => {
			return obj.polis_ltd_sk === num
		}); //add filter
		if (numInfo.length > 0) {

			//fill Select Comp
			$("#insurance-company option[value='" + numInfo[0].polis_ltd_outservice + "']").attr('selected', 'selected');

			//fill Select Services
			//change style for OMS/DMS
			$('#buttonDMS').removeClass('active');
			$('#buttonOMS').removeClass('active');
			//alert('found');
			if (numInfo[0].polis_ltd_type == "ОМС") {
				$('#buttonOMS').addClass('active');
			}
			if (numInfo[0].polis_ltd_type == "ДМС") {
				$('#buttonDMS').addClass('active');
			}
		} else {
			//show window Not found
		}

	}
}

function getServicesList(data) {
	servicesList = data.services;
	// alert(data.companies);
	for (id in data.services) {
		var c = data.services[id];
		$('#med_service').append(`<option value="${c.id}" text="${c.title}" width=200>   
     ${c.title}  
     </option>`);
	}
}

function getCompanyList(data) {
	companyList = data.companies;
	// alert(data.companies);
	for (id in data.companies) {
		var c = data.companies[id];
		$('#insurance-company').append(`<option value="${c.name}"> 
    <img src="${c.icon}" width=32 heigth=32> 
    ${c.name} 
</option>`);
	}
}

function selectService(sender) {
	$("#checkedServices").text("");
	if (sender != undefined) {
		$("#selectedServices").append(`<span><span id="span_${sender.value}">${sender.text}</span> 
    <span id="action_${sender.value}" onclick="deleteSpan(this);"><img src='file:///C:/xampp/htdocs/medask/img/cross.png'></span>
    </span>`)
	}

}

function checkServices() {
	$("#checkedServices").text("");
	var num = $("#textNum").val();
	var numInfo = numsList.filter(obj => {
		return obj.polis_ltd_sk === num
	}); //add filter

	if (numInfo.length > 0) {
		var services = $("#selectedServices").children();
		if (services.length > 0) {

			for (id in services) {
				if (services[id].innerText != undefined) {
					var s = services[id].innerText.trim();
					var numServiceIn = numInfo[0].services.filter(obj => {
						return obj === s
					});
					var numServiceEx = numInfo[0].services_ex.filter(obj => {
						return obj === s
					});
					if (numServiceIn.length > 0) {
						$("#checkedServices").append(`<span><img src='file:///C:/xampp/htdocs/medask/img/tick.png'><span class="checkedService">${s}</span></span>`);
					} else {
						if (numServiceEx.length > 0) {
							$("#checkedServices").append(`<span><img src='file:///C:/xampp/htdocs/medask/img/no-entry.png'><span class="checkedService">${s}</span></span><br>`);
						} else {
							$("#checkedServices").append(`<span><img src="file:///C:/xampp/htdocs/medask/img/information.png"><span class="checkedService">${s}</span></span>`);
						}
					}
				}
			}
		}
	} else {
		//not found
		$("#ex1").modal({});

	}
	$("#selectedServices").text("");
}

function deleteSpan(sender) {
	sender.parentElement.parentElement.removeChild(sender.parentElement)
}
// Цвет кнопок ДМС и ОМС

$('button').on('click', function () {
	$(this).addClass('active').siblings().removeClass('active')
})

// Цвет кнопки "проверить" 
var textNum = document.querySelector('.textNum');
textNum.addEventListener('input', changeBackground);
document.getElementById("check");

function changeBackground() {
	if (textNum.value === '') {
		check.querySelector('button').style.background = 'white';
		check.querySelector('button').style.color = color = '#ED462F';
	} else {
		check.querySelector('button').style.background = '#ED462F';
		check.querySelector('button').style.color = color = 'white';
	}
};

