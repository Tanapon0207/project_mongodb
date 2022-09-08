google.charts.load("current", {
  'packages': ["corechart", "bar"],
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/complaints");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["Year"] + "</td>";
        trHTML += "<td>" + object["Month"] + "</td>";
        trHTML += "<td>" + object["Make"] + "</td>";
        trHTML += "<td>" + object["Quantity"] + "</td>";
        trHTML += "<td>" + object["Pct"] + "</td>";
        trHTML += "<td>";
        trHTML +='<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
        trHTML +='<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a></td>';
        trHTML += "</tr>";

        num++;
      }
      document.getElementById("mytable").innerHTML = trHTML;

      loadGraph();
    }
  };
}

function loadQueryTable() {
  document.getElementById("mytable").innerHTML ='<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>';
  const searchText = document.getElementById("searchTextBox").value;
  
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/complaints/Make/" + searchText);

  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      var num = 1;
      const objects = JSON.parse(this.responseText).Complaint;
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + num + "</td>";
        trHTML += "<td>" + object["Year"] + "</td>";
        trHTML += "<td>" + object["Month"] + "</td>";
        trHTML += "<td>" + object["Make"] + "</td>";
        trHTML += "<td>" + object["Quantity"] + "</td>";
        trHTML += "<td>" + object["Pct"] + "</td>";
        trHTML += "<td>";
        trHTML +='<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' +object["_id"] +'\')"><i class="fas fa-edit"></i></a>';
        trHTML +='<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' +object["_id"] +'\')"><i class="fas fa-trash"></i></a></td>';
        trHTML += "</tr>";
        num++;
      }
      console.log(trHTML);
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

function loadGraph() {
 
  var Volkswagen = 0;
  var Peugeot = 0;
  var Toyota = 0;
  var BMW = 0;
  var Renault = 0;
  var Audi= 0;
  var Skoda= 0;
  var Ford= 0;
  var Hyundai= 0;
  var Tesla= 0;
  //var other = 0;

    var Volkswagen = 0;
    var Peugeot = 0;
    var Toyota = 0;
    var BMW = 0;
    var Renault = 0;
    var Audi= 0;
    var Skoda= 0;
    var Ford= 0;
    var Hyundai= 0;
    var Tesla= 0;
    //var subother=0;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints/");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                switch (object['Make']) {
                  case "Volkswagen":
                    Volkswagen = Volkswagen + 1;
                      break;  
                  case "Peugeot":
                    Peugeot = Peugeot + 1;
                      break;
                  case "Toyota":
                    Toyota = Toyota + 1;
                      break;
                  case "BMW":
                      BMW = BMW + 1;
                      break;
                  case "Renault":
                      Renault = Renault + 1;
                      break;
                  case "Audi":
                      Audi= Audi+ 1;
                      break;
                  case "Skoda":
                    Skoda= Skoda+ 1;
                        break;
                  case "Ford":
                    Ford= Ford+ 1;
                      break;
                  case "Hyundai":
                    Hyundai= Hyundai+ 1;
                      break;
                  case "Tesla":
                    Tesla = Tesla + 1;
                      break;
                  //default:
                    other = Other + 1;
                      break;
                }

                switch (object['Make']) {
                    case "Volkswagen":
                      Volkswagen = Volkswagen + 1;
                        break;  
                    case "Peugeot":
                      Peugeot = Peugeot + 1;
                        break;
                    case "Toyota":
                      Toyota = Toyota + 1;
                        break;
                    case "BMW":
                        BMW = BMW + 1;
                        break;
                    case "Renault":
                        Renault = Renault + 1;
                        break;
                    case "Audi":
                        Audi= Audi+ 1;
                        break;
                    case "Skoda":
                      Skoda= Skoda+ 1;
                          break;
                    case "Ford":
                      Ford= Ford+ 1;
                        break;
                    case "Hyundai":
                      Hyundai= Hyundai+ 1;
                        break;
                    case "Tesla":
                      Tesla = Tesla + 1;
                        break;
                    //default:
                      subother = subother + 1;
                        break;
                }
            }

            var TimelyResponseData = google.visualization.arrayToDataTable([
                ['Company response to consumer', 'Case'],
                ['Volkswagen', Volkswagen ,],
                ['Peugeot', Peugeot],
                ['Toyota', Toyota],
                ['BMW', BMW ],
                ['Renault', Renault],
                ['Audi', Audi],
                ['Skoda', Skoda],
                ['Ford', Ford],
                ['Hyundai', Hyundai],
                ['Tesla', Tesla],
                //['Other', other]
            ]);

            var optionsTimelyResponse = { title: 'จำนวนข้อมูลตัวอย่างทั้งหมด 1,159 ข้อมูล' };
            var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('piechartTimelyResponse'));
            chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

            var dataSubmitted = google.visualization.arrayToDataTable([
                ['Make', 'ข้อมูลที่เก็บได้', {
                    role: 'style'
                }, {
                    role: 'annotation'
                }],
                ['Volkswagen', Volkswagen, 'gold', '206,669 '],
                ['Peugeot', Peugeot, 'color: #F65A83', '61,033 '],
                ['Toyota', Toyota, 'color: #F9F5EB', '168,177 '],
                ['BMW', BMW, 'color: #607EAA', '73,315 '],
                ['Renault', Renault, 'color: #E04D01', '13,259 '],
                ['Audi', Audi, 'color: #FF0042', '70,475 '],
                ['Skoda', Skoda, 'color: #CCFF33', '66,007 '],
                ['Ford', Ford, 'color: #CC3366', '99,713 '],
                ['Hyundai', Hyundai, 'color: #33CC66', '34,251 '],
                ['Tesla', Tesla, 'color: #6600CC', '13,994 '],
                //['Other', subother , 'color: #1C3879', 'Other']
            ]);

            var optionSubmitted = {
                title: '10 ยอดขายยี่ห้อรถตัวอย่าง 10 ปี ตั้งเเต่ปี 2007-2017 (จำนวนข้อมูลตัวอย่างทั้งหมด 1,159 ข้อมูล)',
                legend: { position: 'none' }
            };

            var chartSubmitted = new google.visualization.BarChart(document.getElementById('barchartSubmitted'));
            chartSubmitted.draw(dataSubmitted, optionSubmitted);
        }
    };


}

function showCompliantCreateBox() {
  var d = new Date();
  const date = d.toISOString().split("T")[0];

  Swal.fire({
    title: "Create data New Car Sales in Norway",
    html:
      '<div class="mb-3"><label for="Year" class="form-label">Year</label>' +
      '<input class="form-control" id="Year" placeholder="Year"></div>' +

      '<div class="mb-3"><label for="Month" class="form-label">Month</label>' +
      '<input class="form-control" id="Month" placeholder="Month"></div>' +

      '<div class="mb-3"><label for="Make" class="form-label">Make</label>' +
      '<input class="form-control" id="Make" placeholder="Make"></div>' +

      '<div class="mb-3"><label for="Quantity" class="form-label">Quantity</label>' +
      '<input class="form-control" id="Quantity" placeholder="Quantity"></div>' +

      '<div class="mb-3"><label for="Pct" class="form-label">Pct</label>' +
      '<input class="form-control" id="Pct" placeholder="Pct"></div>',

    focusConfirm: false,
    preConfirm: () => {
      compliantCreate();
    },
  });
}

function compliantCreate() {
  const Year = document.getElementById("Year").value;
  const Month = document.getElementById("Month").value;
  const Make = document.getElementById("Make").value;
  const Quantity = document.getElementById("Quantity").value;
  const Pct = document.getElementById("Pct").value;

  console.log(JSON.stringify({
      "Year": Year,
      "Month": Month,
      "Make": Make,
      "Quantity": Quantity,
      "Pct": Pct,
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/complaints/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
      "Year": Year,
      "Month": Month,
      "Make": Make,
      "Quantity": Quantity,
      "Pct": Pct,
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
      Swal.fire(
      "Good job!", 
      "Create Compliant Successfully!", 
      "success"
      );
      loadTable();
    }
  };
}
function compliantDelete(id) {
  console.log("Delete: ", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/complaints/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
      "_id": id
  }));
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
          const objects = JSON.parse(this.responseText);
          console.log(objects);
          Swal.fire(
              'Good job!',
              'Delete Compliant Successfully!',
              'success'
          );
          loadTable();
      }
  };
}


function showCompliantEditBox(id) {
  console.log("edit", id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/complaints/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const object = JSON.parse(this.responseText).object;
          console.log("showCompliantEditBox", object);
          Swal.fire({
        title: "Edit New Car Sales in Norway",
        html:
          '<input id="id" class="swal2-input" placeholder="Year" type="hidden" value="' +object["_id"] +'"><br>' +
          
          '<div class="mb-3"><label for="Year" class="form-label">Year</label>' +
          '<input class="form-control" id="Year" placeholder="Year Name" value="' +object["Year"] +'"></div>' +
          
          '<div class="mb-3"><label for="Month" class="form-label">Month</label>' +
          '<input class="form-control" id="Month" placeholder="Month" value="' +object["Month"] +'"></div>' +
          
          '<div class="mb-3"><label for="Make" class="form-label">Make</label>' +
          '<input class="form-control" id="Make" placeholder="Make" value="' +object["Make"] +'"></div>' +
          
          '<div class="mb-3"><label for="Quantity" class="form-label">Quantity</label>' +
          '<input class="form-control" id="Quantity" placeholder="Quantity" value="' +object["Quantity"] +'"></div>' +
          
          '<div class="mb-3"><label for="Pct" class="form-label">Pct</label>' +
          '<input class="form-control" id="Pct" placeholder="Pct" value="' +object["Pct"] +'"></div>',

        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        },
      });
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const Year = document.getElementById("Year").value;
  const Month = document.getElementById("Month").value;
  const Make = document.getElementById("Make").value;
  const Quantity = document.getElementById("Quantity").value;
  const Pct = document.getElementById("Pct").value;

  console.log(JSON.stringify({
      "_id": id,
      "Year": Year,
      "Month": Month,
      "Make": Make,
      "Quantity": Quantity,
      "Pct": Pct,
    })
  );

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/complaints/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
        "_id":  id,
        "Year":  Year,
        "Month":  Month,
        "Make":  Make,
        "Quantity":  Quantity,
        "Pct":  Pct,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(
      "Good job!", 
      "Update Compliant Successfully!", 
      "success"
      );
      loadTable();
    }
  };
}
