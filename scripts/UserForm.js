$("#btnUserClear").click(function () {
  clearUserForm();
});

$("#frmUserForm").submit(function () { //Event : submitting the form
  saveUserForm();
  return true;
});

function checkUserForm() { //Check for empty fields in the form
  
  if (($("#txtFirstName").val() != "") &&
    ($("#txtLastName").val() != "") &&
    ($("#txtaNumber").val() != "") &&
    ($("#slcFacultyType option:selected").val() !=
      "Select Faculty")) {
    return true;
  } else {
    return false;
  }
}

function saveUserForm() {
  if (checkUserForm()) {
    var user = {
      "FirstName": $("#txtFirstName").val(),
      "LastName": $("#txtLastName").val(),
      "ANumber": $(
        "#txtaNumber").val(),
      "NewPassword": $("#changePassword").val(),
      "FacultyType": $(
        "#slcFacultyType option:selected").val()
    };

    try {
      localStorage.setItem("user", JSON.stringify(
        user));
      alert("Saving Information");

      $.mobile.changePage("#pageMenu");
      window.location.reload();
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }

}

function clearUserForm() {
  localStorage.removeItem("user");
  alert("The stored data have been removed");
  $("#slcFacultyType").val("Select Faculty");
  $('#slcFacultyType').selectmenu('refresh',
    true);
 
}

function showUserForm() { //Load the stored values in the form
  try {
    var user = JSON.parse(localStorage.getItem(
      "user"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  if (user != null) {
    $("#txtFirstName").val(user.FirstName);
    $("#txtLastName").val(user.LastName);
    $("#txtaNumber").val(user.ANumber);
    $("#changePassword").val(user.NewPassword);
    $('#slcFacultyType option[value=' + user.FacultyType +
      ']').attr('selected', 'selected');
    $("#slcFacultyType option:selected").val(
      user.FacultyType);
    $('#slcFacultyType').selectmenu('refresh',
      true);
  }
}