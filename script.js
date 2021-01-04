$(function () {
    changeColor();
    var draggingGroupName = "appointmentsGroup";
/* Eklenmek üzere sürüklenecek görevleri oluşturan bölüm*/
    var createItemElement = function(data) {
        $("<div>")
            .text(data.text)
            .addClass("item dx-card dx-theme-background-color dx-theme-text-color")
            .appendTo("#list")
            .dxDraggable({
                group: draggingGroupName,
                data: data,
                clone: true,
                onDragEnd: function(e) {    
                    if (e.toData) {
                        e.cancel = true; 
                        
                    }
                },
                onDragStart: function(e) {
                    e.itemData = e.fromData;
                    
                }
            });
}

    $("#scroll").dxScrollView({});


    $("#list").dxDraggable({
        data: "dropArea",
        group: draggingGroupName,
        onDragStart: function(e) {
            e.cancel = true;
        }
    });
 /* oluşturduğumuz pre-card görevleri createItemElement fonksiyonuna gönderiyoruz*/
    tasks.forEach(function(task) {
        createItemElement(task);
    });

    
/* Takvim kısmındaki görünüm, sürükleme ve ekleyip silme işlemleri kısmı*/
    $("#scheduler").dxScheduler({
        timeZone: "Europe/Istanbul",
        dataSource: appointments,
        views: [{
            type: "day",
            intervalCount: 3
        }],
        currentDate: new Date(2021, 0, 04),
        startDayHour: 9,
        endDayHour: 21,
        height: 600,
        editing: true,
        appointmentDragging: {
            group: draggingGroupName,
            onRemove: function(e) {
                e.component.deleteAppointment(e.itemData);
                createItemElement(e.itemData);
            },
            onAdd: function(e) {
                e.component.addAppointment(e.itemData);
                changeColor();
            }  
        }
        
    });
    
});


function changeColor(){
    /*Plandaki kartların başlık kısımlarının rengini  değiştiren fonksiyon*/
    $(document).ready(function(){
        
        let x = document.getElementsByClassName('dx-scheduler-appointment-title');
        for(var i=0; i <x.length; i++){
            if(document.getElementsByClassName('dx-scheduler-appointment-title')[i].outerText == tasks[0].text){
            document.getElementsByClassName('dx-scheduler-appointment-title')[i].style.backgroundColor = "red";
            }
            if(document.getElementsByClassName('dx-scheduler-appointment-title')[i].outerText == tasks[1].text){
                document.getElementsByClassName('dx-scheduler-appointment-title')[i].style.backgroundColor = "green";
                }
                if(document.getElementsByClassName('dx-scheduler-appointment-title')[i].outerText == tasks[2].text){
                    document.getElementsByClassName('dx-scheduler-appointment-title')[i].style.backgroundColor = "blue";
                    }
                    if(document.getElementsByClassName('dx-scheduler-appointment-title')[i].outerText == tasks[3].text){
                        document.getElementsByClassName('dx-scheduler-appointment-title')[i].style.backgroundColor = "brown";
                        }
                        if(document.getElementsByClassName('dx-scheduler-appointment-title')[i].outerText == tasks[4].text){
                            document.getElementsByClassName('dx-scheduler-appointment-title')[i].style.backgroundColor = "cyan";
                            }
                            if(document.getElementsByClassName('dx-scheduler-appointment-title')[i].outerText == tasks[5].text){
                                document.getElementsByClassName('dx-scheduler-appointment-title')[i].style.backgroundColor = "purple";
                                }
        }
 
    });
    }

 /* Hazırlanmış kartlar */
var tasks = [
    {
        text: "Brifing"
    }, {
        text: "Check Messages"
    }, {
        text: "Book Flight from Antalya to Tallinn"
    },{
        text: "New Intern Interview"
    },{
        text: "Personal Computer Upgrade Plan"
    },{
        text: "Approve New Online Marketing Strategy"
    }
];



/* Açılışta sanki önceden planlanmış gibi takvim üzerinde görünen planlar*/
var appointments = [{
        text: "Book Flight from Antalya to Tallinn",
        startDate: new Date("2021-01-04T19:00:00.000Z"),
        endDate: new Date("2021-01-04T20:00:00.000Z"),
        allDay: true
    }, {
        text: "Personal Computer Upgrade Plan",
        startDate: new Date("2021-01-05T07:00:00.000Z"),
        endDate: new Date("2021-01-05T10:00:00.000Z")
    }, {
        text: "Check Messages",
        startDate: new Date("2021-01-05T11:00:00.000Z"),
        endDate: new Date("2021-01-05T12:35:00.000Z")
    }, {
        text: "Approve New Online Marketing Strategy",
        startDate: new Date("2021-01-06T10:00:00.000Z"),
        endDate: new Date("2021-01-06T12:00:00.000Z")
    }
];
