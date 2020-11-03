/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2020 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

let uList;
let cList;
let custList = document.getElementById('custList');
let unitsList = document.getElementById('unitList');
let cListChoose = false;

//Notes
//Due to limitations with html code, ID cannot contain whitespace.
//This is an issue as customer name is passed through the ID of customer div.
//To get around this, all whitespaces are replaced with % and then replaced again to whitespaces when needed.


//Create sortable Customer list
Sortable.create(custList, {
    onChoose: function (e) {
        let custName = e.item.attributes.id.value.replace(/%/g, " ");
        document.getElementById("name").value = custName;

        //Calls onNameChange() to set customer information in the sideway as it's selected.
        //False parameter tells onNameChange() to not call listCustomer()
        onNameChange(false);
        //Sets the border style of each element in Customer List, if element is currently selected, apply selected border color
        for (let i = 0; i < e.target.childNodes.length; i++) {
            if (i == e.oldIndex) {
                if (isCustInTruck(e.target.childNodes[i].id) == true) {
                    e.target.childNodes[i].style.border = '1px solid rgb(81, 179, 68)';
                } else {
                    e.target.childNodes[i].style.border = '1px solid #fb8302';
                }
            } else {
                if (isCustInTruck(e.target.childNodes[i].id) == true) {
                    e.target.childNodes[i].style.border = '1px solid white';
                } else {
                    e.target.childNodes[i].style.border = '1px solid rgb(179,42,52)';
                }
            }
        }
    },
    onUnchoose: function (e) {
        //cListChoose is a global variable that when set to true won't change information from the canvas object deselect handle is called.
        cListChoose = true;
        canvas.discardActiveObject().renderAll();
        cListChoose = false;
    },
    onSort: function (e) {
        let currentDrop = e.from.childNodes[e.newIndex].attributes.id.value.replace(/%/g, " ");
        let oldDrop = e.from.childNodes.length - e.newIndex;

        var r = confirm("This will sort all customers drops and place " + currentDrop + " to drop " + oldDrop);

        if (r == true) {
            //Accept changes
            //Change Customer Drops
            for (let i = 0; i < e.from.childNodes.length; i++) {
                let customer = getCustomer(e.from.childNodes[i].attributes.id.value.replace(/%/g, " "));
                let newDrop = (e.from.childNodes.length) - i;

                //Change Unit Drops matching customer
                units.forEach(function (unit) {
                    if (unit.customer == customer.name) {
                        unit.drop = newDrop;
                        unitText(customer.name, unit.unitWidth, unit.unitHeight, newDrop, unit.ae, unit.item(1), unit.item(0), unit.location);
                        canvas.requestRenderAll();
                    }
                });
                //Update Customers drop in listed sequence
                customer.drop = newDrop;
            }

        } else {
            //Cancel changes
            listCustomer();
        }
        sortCustomer();
        sortUnit();
        updateRack();
    },
    chosenClass: 'listChosen',
    animation: 150
});

function unitsOnSelect(e) {
    let activeUnit = getIDUnit(e.item.attributes.id.value.replace(/%/g, " "));
    if (activeUnit != null) {
        canvas.discardActiveObject().requestRenderAll();
        if (activeUnit.inCanvas == true) {
            canvas.setActiveObject(activeUnit).requestRenderAll();
            document.getElementById('ae').value = '';
            document.getElementById('location').value = '';
            editOff();
        } else {
            editObject(null, activeUnit);
        }
        if (editing == false) {
            updateListUnits();
        } else {
            updateListUnits(activeUnit);
        }
        updateListCust(activeUnit.customer);
        createSide();
    }
}

//Create sortable Unit list
Sortable.create(unitsList, {
    onChoose: function (e) {
        unitsOnSelect(e);
    },
    chosenClass: 'listChosen',
    sort: false,
    animation: 150
});

function updateListCust(CustName) {
    for (var i = 0, len = customers.length; i < len; i++) {
        let tempCustName = customers[i].name.replace(/ /g, '%');
        let tempName = document.getElementById(tempCustName);

        if (CustName == tempName.id) {
            if (isCustInTruck(tempName.id) == true) {
                tempName.style.border = '1px solid rgb(81, 179, 68)';
            } else {
                tempName.style.border = '1px solid #fb8302';
            }
        } else {
            if (isCustInTruck(tempName.id) == true) {
                tempName.style.border = '1px solid #ccc';
            } else {
                tempName.style.border = '1px solid rgb(179,42,52)';
            }
        }
    }
}

function updateListUnits(unit) {
    for (var i = 0, len = units.length; i < len; i++) {
        let tempName = document.getElementById(units[i].id.replace(/ /g, '%'));
        if (canvas.getActiveObject() == units[i]) {
            tempName.style = "background-color: white; border: 1px solid rgb(81, 179, 68); white-space: nowrap; width: 99%;";
        } else if (units[i].inCanvas != true) {
            if (units[i] === unit) {
                tempName.style = "background-color: white; border: 1px solid #fb8302; white-space: nowrap; width: 99%;";
            } else {
                tempName.style = "background-color: white; border: 1px solid rgb(179,42,52); white-space: nowrap; width: 99%;";
            }
        } else {
            tempName.style = "background-color: white; white-space: nowrap; width: 99%;";
        }
    }
}

function listUnits(unitFromList) {
    var html = '';
    for (var i = 0, len = units.length; i < len; i++) {
        let tempName = units[i].id.replace(/ /g, '%');
        if (canvas.getActiveObject() == units[i]) {
            html += '<div style="background-color: white; border: 1px solid rgb(81, 179, 68); white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
        } else if (units[i].inCanvas != true) {
            if (units[i] === unitFromList) {
                html += '<div style="background-color: white; border: 1px solid #fb8302; white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
            } else {
                html += '<div style="background-color: white; border: 1px solid rgb(179,42,52); white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
            }
        } else {
            html += '<div style="background-color: white; white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
        }

    }
    html += '';
    unitsList.innerHTML = html;

    //Displays total longs or shorts information
    let shortUnits = 0;
    let longUnits = 0;
    units.forEach(function (unit) {
        if (unit.unitWidth <= 96) {
            shortUnits++;
        } else {
            longUnits++;
        }
    });
    document.getElementById("tShorts").innerText = shortUnits.toString();
    document.getElementById("tLongs").innerText = longUnits.toString();

    //Drag handler
    uList = document.querySelectorAll('.list-group-unit div');
    [].forEach.call(uList, function (list) {
        list.addEventListener('dragstart', handleDragStart, false);
        list.addEventListener('dragend', handleDragEnd, false);
    });
}

function listCustomer() {
    var html = '';
    for (var i = 0, len = customers.length; i < len; i++) {
        let tempName = customers[i].name.replace(/ /g, '%');
        if (document.getElementById('name').value == customers[i].name) {
            if (isCustInTruck(tempName) == false) {
                html += '<div style="background-color: white; border: 1px solid #fb8302; white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true"  id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            } else {
                html += '<div style="background-color: white; border: 1px solid rgb(81, 179, 68); white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true"  id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            }
        } else {
            if (isCustInTruck(tempName) == false) {
                html += '<div style="background-color: white; border: 1px solid rgb(179,42,52); white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true" id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            } else {
                html += '<div style="background-color: white; white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true" id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            }
        }
    }
    html += '';

    custList.innerHTML = html;
}

function onCustSearch() {
    var input, list;
    input = document.getElementById('custSearch');
    list = document.getElementById("custList");
    onSearch(input, list);
}

function onUnitSearch() {
    var input, list;
    input = document.getElementById('unitSearch');
    list = document.getElementById("unitList");
    onSearch(input, list);
}


function onSearch(input, list) {
    //Credit to https://www.w3schools.com/howto/howto_js_filter_lists.asp
    var filter, div, a, i, txtValue;
    filter = input.value.toUpperCase();
    div = list.getElementsByTagName('div');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < div.length; i++) {
        a = div[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
}