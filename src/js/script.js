(function($, window, document) {

  // new task card
  var createTaskCard =  function(step, task, asignee) {
    var taskName = $(document.createElement('p'));
    var wrapper = $(document.createElement('div'));
    var btn = $(document.createElement('button'));
    var link = $(document.createElement('a'));
    var selectWrapper = $(document.createElement('div'));
    var select = $(document.createElement('select'));
    var asigneeElement = $(document.createElement('p'));
    var userIcon = $(document.createElement('span'));
    var assigneeWrapper = $(document.createElement('div'));
    var clearfix =  $(document.createElement('div'));
    var users = ["Arun", "Sunny", "Athira", "Rahul"];

    taskName
    .text(task)
    .addClass("card-head");
    btn.addClass("btn");
    select.append($("<option value='"+ undefined +"' >-Select Engineer-</option>"));
    wrapper.addClass("card-wrapper");
    clearfix.addClass("clearfix");
    userIcon.addClass("glyphicon glyphicon-user");
    if (step === 1) {
      // Creating select input
      for (var i = 0; i < users.length; i++) {
        select
        .append($("<option></option>")
        .attr("value", users[i])
        .text(users[i]));
      }
      select.addClass("form-control user-select");
      selectWrapper
      .append(select)
      .addClass("form-group");
      btn
      .text("Assign")
      .addClass("new-task-btn")
      .on("click", getNewTaskValues);
      wrapper.addClass("new-task-card");
      return wrapper.append(taskName, selectWrapper, btn, clearfix);
    }
    else if (step === 2) {
      asigneeElement
      .text(asignee)
      .addClass("card-asignee");
      btn
      .text("Dev Complete")
      .addClass("dev-complete-btn")
      .on("click", getDevCompleteTaskValues);
      assigneeWrapper.append(userIcon, asigneeElement);
      wrapper.addClass("dev-task-card");
      return wrapper.append(taskName, assigneeWrapper, btn, clearfix);
    }
    else if (step === 3) {
      asigneeElement
      .text(asignee)
      .addClass("card-asignee");
      btn
      .text("Test Complete")
      .addClass("test-complete-btn")
      .on("click", getTestCompleteTaskValues)
      link
      .text("Back to Dev")
      .addClass("back-link")
      .on("click", goBackToDev);
      assigneeWrapper.append(userIcon, asigneeElement);
      wrapper.addClass("test-task-card");
      return wrapper.append(taskName, assigneeWrapper, btn, link, clearfix);
    }
    else if (step === 4) {
      asigneeElement
      .text(asignee)
      .addClass("card-asignee");
      assigneeWrapper.append(userIcon, asigneeElement);
      wrapper.addClass("completed-task-card");
      return wrapper.append(taskName, assigneeWrapper);
    }
  }

  // Assign handler callback
  function getNewTaskValues(event) {
    var btn = $(this);
    var parentDiv = btn.parent(".new-task-card");
    var taskName = btn.siblings(".card-head").text();
    var assignedUser = btn.siblings(".form-group").children(".user-select").val();
    var step2_wrapper = $("#step2 .task");
    if (assignedUser !== "undefined") {
      // Create card for next step
      step2_wrapper.append(createTaskCard(2, taskName, assignedUser));
      // Remove current card
      parentDiv.remove();
    }
    else {
      displayModal("Select Engineer to Assign");
    }
  }
  
  // Dev complete handler callback
  function getDevCompleteTaskValues(event) {
    var btn = $(this);
    var taskName = btn.siblings(".card-head").text();
    var parentDiv = btn.parent(".dev-task-card");
    var assignedUser = parentDiv.find(".card-asignee").text();
    var step3_wrapper = $("#step3 .task");
    // Create card for next step
    step3_wrapper.append(createTaskCard(3, taskName, assignedUser));
    // Remove current card
    parentDiv.remove();
  }

  // go back to dev handler callback
  function goBackToDev(event) {
    var step2_wrapper = $("#step2 .task");
    var btn = $(this);
    var parentDiv = btn.parent(".test-task-card");
    var taskName = btn.siblings(".card-head").text();
    var assignedUser = parentDiv.find(".card-asignee").text();
    // Create card for next step
    step2_wrapper.append(createTaskCard(2, taskName, assignedUser));
    // Remove current card
    parentDiv.remove();
  }

  // test complete tesk handler callback
  function getTestCompleteTaskValues(event) {
    var btn = $(this);
    var taskName = btn.siblings(".card-head").text();
    var parentDiv = btn.parent(".test-task-card");
    var assignedUser = parentDiv.find(".card-asignee").text();
    var step4_wrapper = $("#step4 .task");
    // Create card for next step
    step4_wrapper.append(createTaskCard(4, taskName, assignedUser));
    // Remove current card
    parentDiv.remove();
  }

  function displayModal(body){
    var feedbackModal = $("#feedbackMdl");
    feedbackModal.find(".modal-body p").html(body);
    feedbackModal.modal("show");
  }
  //  DOM READY
  $(function() {

    // New task submit handler
    $("#createNewTaskBtn").on("click", function() {
      var taskName = $("#newTaskNameInp");
      var step1_wrapper = $("#step1 .task");
      if (taskName.val() !== "") {
        step1_wrapper.append(createTaskCard(1, taskName.val()));
        taskName.val("");
      }
      else {
        displayModal("Enter Task Name");
      }
    });
  });
}(window.jQuery, window, document));
