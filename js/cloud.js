let scraper = "asst_Cq755e9gJvyzeFO9qLnjjXSO";
let chat = "asst_2EpWRWvPO84tB28YIzsdV5qW";
let reviews = "asst_dHyRv9cpXodGScDxsQLfoN1u";
let facebook = "asst_2EpWRWvPO84tB28YIzsdV5qW";
let role = "asst_uLH55e80fzuviAeuj6jr0ehr";

function openAi(url, message, tool, successCallback, errorCallback) {
  $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      content: message,
      assistant_id: tool,
    }),
    success: successCallback,
    error: errorCallback,
  });
}

