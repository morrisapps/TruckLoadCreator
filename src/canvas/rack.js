/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

var rackBox;
var rackText;
var rackCustomers = [];


function rackLoad() {
    rackBox = new fabric.Rect({
        width: 747,
        height: 175,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        hasControls: false,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        top: 680,
        left: 20,
        rx: 10,
        ry: 10
    });
    rackText = new fabric.IText(' Customers ', {
        width: 1000,
        height: 500,
        top: 671,
        left: 40,
        stroke: "black",
        strokeWidth: 0,
        hasControls: true,
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        backgroundColor: 'white',
        editingBorderColor: 'blue',
        editable: true,
        fontSize: 16,
        fixedWidth: 150,
        fixedHeight: 300,
        fixedFontSize: 12
    });

    window.rack = new fabric.Group([rackBox, rackText], {
        top: 730,
        left: 20,
        hasControls: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        id: 'rack'
    });

    var top = 747;
    var left = 30
    var columnCounter = 0;
    //Max width for rackCustomers should be 178
    //Max width with eclipse 157

    for (var i = 0; i <= 43; i++){
        if (columnCounter > 10){
            left = left + 185;
            top = 747;
            columnCounter = 0;
        }
        columnCounter++;
        rackCustomers[i] = new fabric.IText('', {
            height: 170,
            stroke: 'black',
            strokeWidth: 0,
            hasControls: false,
            selectable: true,
            lockMovementX: true,
            lockMovementY: true,
            hasBorders: false,
            textBackgroundColor: 'white',
            //backgroundColor: "white",
            //charSpacing: -20,
            //splitByGrapheme: true,
            fontSize: 14,
            top: top,
            left: left,
            rx: 10,
            ry: 10
        });
        top = top + 15;
        window.rack.addWithUpdate(rackCustomers[i]);
    }
    canvas.add(rack);
}

function updateRack() {
    let i = 0;
    customers.reverse();
    while (i < rackCustomers.length) {
        if (customers[i] != null) {
            let custText = "(" + customers[i].drop + ") " + customers[i].name;
            let inRack = '';
            if (customers[i].rack == true){
                inRack = ' -RK';
                rack.item(i+2).set({fontWeight: 'bold'});
            }else {
                rack.item(i+2).set({fontWeight: 'normal'});
            }
            rack.item(i+2).set({text: custText + inRack});
            while (rack.item(i+2).width > 178) {
                custText = cutText(custText, 0, custText.length - 1);
                rack.item(i+2).set({text: custText + '...' + inRack});
                if (custText.length <= 0) {
                    break;
                }
            }
        }else {
            rack.item(i+2).set({text: ''});
        }
        i++;
    }
    customers.reverse();
    canvas.requestRenderAll();
    saveToBrowser();
}
