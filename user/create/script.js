var dropArea = $("#drag-and-drop-area");
var fileInput = $("#formFile")[0];
var fileListContainer = $("#fileList");
var filesArray = [];

let unitId;


$("#loading").hide();  




$('.openAll').click(function() {
    var parentAccordion = $(this).closest('.accordion-body');
    var closedItems = parentAccordion.find('.accordion-collapse:not(.show)');
    closedItems.collapse('show');
    $(this).hide(); // Hide the Open All button
    $(this).siblings('.closeAll').show(); // Show the Close All button
});

$('.closeAll').click(function() {
    var parentAccordion = $(this).closest('.accordion-body');
    var openItems = parentAccordion.find('.accordion-collapse.show');
    openItems.collapse('hide');
    $(this).hide(); // Hide the Close All button
    $(this).siblings('.openAll').show(); // Show the Open All button
});


function updateFileList() {
  fileListContainer.empty();
  filesArray.forEach((file, index) => {
    var fileCard = $('<div class="file-card"></div>');
    fileCard.append("<span>" + file.name + "</span>");
    var removeButton = $('<button type="button">&times;</button>');
    removeButton.on("click", function () {
      filesArray.splice(index, 1);
      updateFileInput();
      updateFileList();
    });
    fileCard.append(removeButton);
    fileListContainer.append(fileCard);
  });
}

function updateFileInput() {
  var dataTransfer = new DataTransfer();
  filesArray.forEach((file) => dataTransfer.items.add(file));
  fileInput.files = dataTransfer.files;
}

fileInput.addEventListener("change", function (e) {
  filesArray = Array.from(e.target.files);
  updateFileList();
});

dropArea.on("dragover", function (e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.addClass("dragover");
});

dropArea.on("dragleave", function (e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.removeClass("dragover");
});

dropArea.on("drop", function (e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.removeClass("dragover");

  var newFiles = e.originalEvent.dataTransfer.files;
  filesArray = Array.from(newFiles);
  updateFileInput();
  updateFileList();
});

  function showModal() {
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
      keyboard: false
    });
    myModal.show();
  }

  function hideModal() {
    var myModalEl = document.getElementById('myModal');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

      function animateDots() {
        var dotCount = 0;
        setInterval(function() {
            dotCount = (dotCount + 1) % 4; // Cycle from 0 to 3
            var dots = '.'.repeat(dotCount); // Create string of dots
            $('.loading-dots').text(dots); // Update the text of the dots
        }, 500); // Change dots every 500ms
    }

    // Call the animate function
    animateDots();

async function saveUnitInformation(address, unit) {
  try {
    let response = await $.ajax({
      url: "/api/unitsave.php",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        address: address,
        unit: unit,
        userId: userId,
      }),
      dataType: "json"
    });
    unitId = response.unitId;
    return response;
  } catch (error) {
    throw new Error("Error saving unit information: " + error.responseText);
  }
}

async function createVectorStore(vectorStoreName, assistantName, modelSelect, instructions, filesArray) {
  var formData = new FormData();
  formData.append("vector_store_name", vectorStoreName);
  formData.append("assistant_name", assistantName);
  formData.append("assistant_model", modelSelect);
  formData.append("instructions", instructions);
  $('#file').val(5);

  for (let i = 0; i < filesArray.length; i++) {
    formData.append("files", filesArray[i]);
  }

  try {
    let response = await $.ajax({
      url: "https://api.oceanswelldigital.net:8000/create-vector-store",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
    });
    return response;
  } catch (error) {
    throw new Error("Error creating vector store: " + error.responseText);
  }
}


async function handleFormSubmit(event) {
  event.preventDefault();

  if (typeof marked === 'undefined' || typeof marked.parse !== 'function') {
    console.error("Marked library is not loaded.");
    alert("Markdown parser is not available. Please try again later.");
    return;
  }
  var assistantName = $("#unit-address").val();
  var unitNumber = $("#unit-number").val();
  var modelSelect = "gpt-4o";
  var instructions =
    "You are a strata document reader. You will read PDF files of strata documents sent to you and extract information based on the questions provided. For each question, you will return the exact details word for word, along with the sources. Sources should be detailed by file name and page";
  var vectorStoreName = "Files for " + assistantName;

  if (filesArray.length > 0) {
    showModal()
    try {
      let saveUnitResponse = await saveUnitInformation(assistantName, unitNumber);

      console.log(saveUnitResponse.unitId);

      if (saveUnitResponse.success) {
        let vectorResponse = await createVectorStore(
          vectorStoreName,
          assistantName,
          modelSelect,
          instructions,
          filesArray
        );

        if (vectorResponse && vectorResponse.vector_store_id) {
          console.log("files uploaded");
          $('#file').val(15);
          $('#loadingtext').text("Reading Files");
          createAssistant(
            assistantName,
            modelSelect,
            vectorResponse.vector_store_id,
            instructions
          );
        } else {
          alert("Error creating vector store");
        }
      } else {
        alert("Error saving unit information");
      }
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("No files uploaded");
  }
}

$("#create").submit(handleFormSubmit);


function createAssistant(name, model, vectorStoreId, instructions) {
  $.ajax({
    url: "https://api.oceanswelldigital.net:8000/create-assistant",
    type: "POST",
    data: JSON.stringify({
      assistant_name: name,
      model: model,
      vector_store_id: vectorStoreId,
      instructions: instructions,
    }),
    contentType: "application/json",
    success: function (response) {
      let id = response.assistant_id;
      console.log("assistant created");
      $('#file').val(25);
      start(id);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error("AJAX error:", xhr.responseText, textStatus, errorThrown);
      notify("An error occurred. Please try again.");
    },
  });
}

let questionstotal;
let requeststotal;
let answerstotal;

let results = [];

function start(id) {
  $('#loadingtext').text("Extracting Information");
  $.getJSON("questionsfull.json", function (questions) {
    questionstotal = questions.length; // Count the total number of questions
    requeststotal = 0; // Initialize requeststotal
    answerstotal = 0; // Initialize answerstotal

    questions.forEach(function (item) {
      $.ajax({
        url: "https://api.oceanswelldigital.net:8000/chat-response",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          content: item.question,
          assistant_id: id,
        }),
        success: function (response) {
          answerstotal = answerstotal + 1;
          if (response.system) {
            console.log(
              "Response for question ID " + item.id + ":",
              response.system
            );

            // Use marked to convert Markdown to HTML
            const formattedResponse = marked.parse(response.system);

            // Update the <p> element with HTML content
            $("#" + item.id).html(formattedResponse); 
            
            // Collect the data
            results.push({
              category: item.id,
              content: formattedResponse,
              unitId: unitId 
            });
          } else {
            console.log("No system property found for question ID " + item.id);
          }
        },
        error: function (xhr, status, error) {
          console.error("Error for question ID " + item.id + ":", error);
        },
        complete: function () {
          requeststotal = requeststotal + 1;
          checkCompletion(); // Check if totals are equal
        },
      });
    });
  }).fail(function () {
    console.error("Failed to load questions from questionsdev.json");
  });
}


function checkCompletion() {
  // Calculate the percentage completion
  let percent = Math.round((1/ questionstotal) * 75);
  
  // Get the current value of the progress bar
  let currentProgress = $('#file').val();
  
  // Update the progress bar by adding the new percentage to the current value
  let newProgress = parseInt(currentProgress) + percent;
  
  $('#file').val(newProgress);
  
  // Check if all questions have been processed
  if (questionstotal === requeststotal) {
    hideModal();
    console.log("All questions have been processed.");
    $("#remove").remove();
    
    
    // Send collected data to the PHP script
    $.ajax({
      url: "/api/contentsave.php", // Change to the correct PHP file name
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ results: results }),
      success: function(response) {
        console.log("Data saved successfully:", response);
      },
      error: function(xhr, status, error) {
        console.error("Error saving data:", error);
      }
    });
    $(".answersfield").removeClass("d-none");
    hideModal()
  }
}


