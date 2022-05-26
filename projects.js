$('#startNewProject').on('click', function() {
    $("#newProjectTabUnderlay").removeClass("hidden");
    $("#newProjectTab").removeClass("hidden");
});

$('#closeProjectTab').on('click', function() {
    $("#newProjectTabUnderlay").addClass("hidden");
    $("#newProjectTab").addClass("hidden");
});

$('#saveProject').on('click', function() {
    var $newProjectTitle = $('input[id="projectName"]').val();
    var $newProjectCustomer = $('.select2-selection__rendered').html();
    $('#projectDefaultView').remove();
    var $submittedProject = $("<div class='project-header'><h3 class='semibold'>" + $newProjectTitle + "</h3><p><a>" + $newProjectCustomer + "</a></p></div>");
    $("#projectId").removeClass("hidden");
    $submittedProject.appendTo('.projects-view');
});

$(document).ready(function() {
    $(':input[id="saveProject"]').prop('disabled', true);
    $('input[id="projectName"]').keyup(function() {
        console.log($('.select2-selection__rendered').attr('title'));
        if ($(this).val() != '' && $('.select2-selection__rendered').attr('title') != "Who's the project for?") {
            $(':input[id="saveProject"]').prop('disabled', false);
        } else {
            $(':input[id="saveProject"]').prop('disabled', true);
        }
    });
    $('#customerSelection').on('select2:select', function() {
        if ($('input[id="projectName"]').val() != '' && $('.select2-selection__rendered').attr('title') != "Who's the project for?") {
            $(':input[id="saveProject"]').prop('disabled', false);
        } else {
            $(':input[id="saveProject"]').prop('disabled', true);
        }
    });
    $('.customer-list').select2({
        tags: true,
        placeholder: "Who's the project for?",
        width: '100%',
        selectOnClose: false,
        closeOnSelect: true,
        minimumInputLength: 1,
        dropdownCssClass: 'customer-list-dropdown',
    });
});

var customerList = {
    customer000: "Amy's Bird Sanctuary",
    customer001: "Bill's Windsurf Shop",
    customer002: "Chief and Ivan's Cat Cafe",
    customer003: "Diego Rodriguez",
    customer004: "Dukes Basketball Camp",
    customer005: "Dylan Solfrank",
    customer006: "Freeman Sporting Goods",
    customer007: "Video Games by Dan",
};

var customerSelection = $('#customerSelection');
$.each(customerList, function(val, text) {
    customerSelection.append(
        $('<option></option>').html(text)
    );
});

$(document).on('keyup', '.select2-search__field', function() {
    $('.select2-results li').each(function() {
        console.log($(this).text());
        if (Object.values(customerList).indexOf($(this).text()) === -1) {
            $(this).html('<span class="green">&#43;</span> Add ' + '<b>' + $('.select2-search input').val() + '</b>');
        }
    });
});