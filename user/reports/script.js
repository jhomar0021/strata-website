function getReports(userId) {
    $('#reports').empty();
    $.ajax({
        url: '/api/unitlist.php', // Adjust the URL to the path where your PHP script is located
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ userId: userId }),
        success: function(response) {
            var data = JSON.parse(response);
            if (data.success) {
                // Clear the previous reports
                $('#reports').empty();

                // Iterate through each unit and append a new card
                data.units.forEach(function(unit) {
                    var cardHtml = `
                        <div class="card mb-3 text-center text-lg-start">
                            <div class="card-header text-center">Date Added : ${unit.created}</div>
                            <div class="card-body row">
                                <div class="col-12 col-lg-2">
                                    <p>Unit No.</p>
                                    <h4>${unit.unit}</h4>
                                </div>
                                <div class="col-12 col-lg-7">
                                    <p>Address</p>
                                    <h4>${unit.address}</h4>
                                </div>
                                <div class="col-12 col-lg-3 text-center align-items-center pt-3">
                                    <button class="btn btn-primary mx-lg-2 clipboard-btn" data-link="https://example.com/view=${unit.id}"><i class="fa-solid fa-link"></i></button>
                                    <a href="report.html?view=${unit.id}" class="btn btn-primary mx-lg-2"><i class="fa-solid fa-eye"></i></a>
                                    <button class="btn btn-primary mx-lg-2 delete-btn" data-unitid="${unit.id}"><i class="fa-solid fa-eraser"></i></button>
                                </div>
                            </div>
                        </div>`;
                    $('#reports').append(cardHtml);
                });

                // Clipboard button functionality
                $('.clipboard-btn').click(function() {
                    var link = $(this).data('link');
                    navigator.clipboard.writeText(link).then(() => {
                        alert('Link copied to clipboard!');
                    }, () => {
                        alert('Failed to copy link.');
                    });
                });

                // Delete button functionality
                $('.delete-btn').click(function() {
                    var unitId = $(this).data('unitid');
                    $.ajax({
                        url: '/api/unitremove.php',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ id: unitId }),
                        success: function(response) {
                            var data = JSON.parse(response);
                            if (data.success) {
                                alert('Unit deleted successfully');
                                getReports(userId); // Refresh the reports after deletion
                            } else {
                                alert(data.error);
                            }
                        },
                        error: function() {
                            alert('Error deleting the unit.');
                        }
                    });
                });
            } else {
                // Handle errors or no units found
                $('#reports').html('<div>No units found or an error occurred.</div>');
            }
        },
        error: function(xhr, status, error) {
            // Handle AJAX errors
            $('#reports').html('<div>Error fetching reports. Please try again later.</div>');
        }
    });
}

var checkUserId = setInterval(function() {
    if (userId) {  
        getReports(userId);
        clearInterval(checkUserId);
    }
}, 100); 