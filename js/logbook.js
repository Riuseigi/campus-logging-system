$(document).ready(function () {
  fetch("php/get_all_logs.php")
    .then((res) => res.json())
    .then((response) => {
      let logData = [];
      for (let i = 0; i < response.length; i++) {
        let data = {
          id: response[i].id,
          full_name: response[i].full_name,
          contact_number: response[i].contact_number,
          address: response[i].address,
          age: response[i].age,
          temperature: response[i].temperature,
          gender: response[i].gender,
          reason: response[i].reason,
          time: response[i].time,
        };
        logData.push(data);
      }
      updateTable(logData);
    })
    .catch((error) => console.log(error));
});

function updateTable(logData) {
  $("#logbook-table").DataTable({
    data: logData,
    responsive: true,
    pageLength: 25,
    lengthChange: true,
    searching: true,
    ordering: true,
    columns: [
      { data: "full_name" },
      { data: "contact_number" },
      { data: "address" },
      { data: "age" },
      { data: "temperature" },
      { data: "gender" },
      { data: "reason" },
      { data: "time" },

      {
        data: "id",
        render: function (data, type, row, meta) {
          return (
            `<a href="#" data-id='` +
            data +
            `' class='btn btn-outline-info btn-rounded mr-1 edit-log-button'><i class="fas fa-pen"></i></a>` +
            `<a href="#" data-id='` +
            data +
            `' class='btn btn-outline-danger btn-rounded delete-log-button'><i class="fas fa-trash"></i></a>`
          );
        },
      },
    ],
  });
}

// delete log script
$(document).on("click", ".delete-log-button", function () {
  let id = $(this).data("id");
  if (confirm("Are you sure want to delete this Log ?")) {
    $.ajax({
      url: "php/delete_log.php",
      data: { id: id },
      type: "post",
      success: function (data) {
        let json = JSON.parse(data);
        let status = json.status;
        if (status == "failed") {
          alert("Delete Failed");
          return;
        }
      },
    });

    removeRowFromTable.call(this);
  } else {
    return null;
  }
});

let removeRowFromTable = function () {
  let table = $("#logbook-table").DataTable();
  table.row($(this).parents("tr")).remove().draw();
};
// delete log script

// edit log script
let selectedRowIndex = "";

$(document).on("click", ".edit-log-button", function () {
  let id = $(this).data("id");
  $("#edit-log-modal").modal("show");
  $.ajax({
    url: "php/get_single_log.php",
    data: { id: id },
    type: "post",
    success: function (data) {
      var json = JSON.parse(data);
      $("#edited-fullname").val(json.full_name);
      $("#edited-age").val(json.age);
      $("#edited-address").val(json.address);
      $("#edited-contactnumber").val(json.contact_number);
      $("#edited-temp").val(json.temperature);
      $("#edited-gender").val(json.gender).change();
      $("#edited-reason").val(json.reason).change();
      $("#edited-id").val(id);
      $("#edited-time").val(json.time);
    },
  });

  selectedRowIndex = this;
});

$(document).on("click", ".update-log-button", function () {
  let id = $("#edited-id").val();
  let fullname = $("#edited-fullname").val();
  let age = $("#edited-age").val();
  let gender = $("#edited-gender").val();
  let address = $("#edited-address").val();
  let contactnumber = $("#edited-contactnumber").val();
  let temperature = $("#edited-temp").val();
  let reason = $("#edited-reason").val();
  let time = $("#edited-time").val();

  $.ajax({
    url: "php/update_log.php",
    data: {
      id: id,
      fullname: fullname,
      age: age,
      gender: gender,
      address: address,
      contactnumber: contactnumber,
      temperature: temperature,
      reason: reason,
    },
    type: "post",
    success: function (data) {
      let json = JSON.parse(data);
      let status = json.status;

      if (status == "true") {
        $("#edit-log-modal").modal("hide");
        const logData = {
          id: id,
          fullname: fullname,
          age: age,
          gender: gender,
          address: address,
          contactnumber: contactnumber,
          temperature: temperature,
          reason: reason,
          time: time,
        };
        updateSingleRowInTable(logData);
        alert("Update Log Success");
      } else {
        alert("Update Log Failed");
      }
    },
  });
});

function updateSingleRowInTable(logData) {
  let table = $("#logbook-table").DataTable();
  table.row($(selectedRowIndex).parents("tr")).remove().draw();

  table.row
    .add({
      full_name: logData.fullname,
      contact_number: logData.contactnumber,
      address: logData.address,
      age: logData.age,
      temperature: logData.temperature,
      gender: logData.gender,
      reason: logData.reason,
      time: logData.time,
      id: logData.id,
    })
    .draw();

  selectedRowIndex = "";
}
// edit log script
