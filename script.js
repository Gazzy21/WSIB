$(document).ready(function () {
    const scheduleUrl = "https://api.npoint.io/cdf650906e66cebd400c";

    const bellSchedule = {
        1: { start: "8:24 AM", end: "9:31 AM" },
        2: { start: "9:36 AM", end: "10:43 AM" },
        3: { start: "10:48 AM", end: "11:55 AM" },
        4: { start: "12:41 PM", end: "1:48 PM" },
        5: { start: "1:53 PM", end: "3:00 PM" },
    };

    $("#submitDay").on("click", function () {
        const selectedDay = $("#dayInput").val().toUpperCase();
        if (!["A", "B", "C", "D", "E", "F", "G"].includes(selectedDay)) {
            alert("Please enter a valid day (A-G)");
            return;
        }
        $.ajax({
            type: "GET",
            url: scheduleUrl,
            success: function (response) {
                const schedule = response.schedule
                const dayFilter = schedule.filter(classInfo => classInfo.days.includes(selectedDay));            
                $('#scheduleList').empty();
                let i = 1
                dayFilter.forEach(element => {
                    let htmlString = `
                    <tr>
                        <td>${element.period}</td>
                        <td>${bellSchedule[i].start} - ${bellSchedule[i].end}</td>
                        <td>${element.class}</td>
                        <td>${element.teacher}</td>
                        <td>${element.room}</td>
                    </tr>
                    `
                    $('#scheduleList').append(htmlString);
                    i++
                });
            },
            error: function () {
                alert("Error Occured: Try again!");
            }
        });
    });
});