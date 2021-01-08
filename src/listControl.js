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
let previousUnitListElement = null;
let unitsNotInCanvas;

//Notes
//Due to limitations with html code, ID cannot contain whitespace.
//This is an issue as customer name/unit ID is passed through the ID of element div.
//To get around this, all whitespaces are replaced with % and then replaced again to whitespaces when needed.


/**
 * Create sortable Customer List
 */
Sortable.create(custList, {
    onChoose: function (e) {
        let custName = e.item.attributes.id.value.replace(/%/g, " ");
        _customer.value = custName;

        //Calls onNameChange() to set customer information in the sidebar as it's selected.
        //False parameter tells onNameChange() to not call listCustomer()
        onNameChange(false);
        //Sets the border style of each element in Customer List, if element is currently selected, apply selected border color
        updateListCust(custName);
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
                    }
                });
                //Update all units
                updateUnits(units);

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

/**
 * Selects unit in unit list. If unit exists in canvas also makes it actively selected
 * @param e - The selected unit in the list element
 */
function unitsOnSelect(e) {
    let id;
    if (e.item.attributes.id.value != null) {
        id = e.item.attributes.id.value;
        if (id == previousUnitListElement) {
            previousUnitListElement = id;
        } else {
            previousUnitListElement = null;
            editing = false;
        }
        let activeUnit = getIDUnit(id.replace(/%/g, " "));
        if (activeUnit != null) {
            canvas.discardActiveObject().requestRenderAll();
            if (activeUnit.inCanvas == true) {
                canvas.setActiveObject(activeUnit).requestRenderAll();
                _tag.value = '';
                _location.value = '';
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
            setBundleCheck(activeUnit.customer);
            createSide();
            setUnitFields(activeUnit);
        }
    }
    previousUnitListElement = id;
}


/**
 * Create sortable Unit list
 */
Sortable.create(unitsList, {
    onChoose: function (e) {
        unitsOnSelect(e);
    },
    onStart: function (e) {
        unitsOnSelect(e);
    },
    chosenClass: 'listChosen',
    sort: false,
    animation: 150
});

/**
 * Selects customer in customer list.
 * @param e - The selected customer in the list element
 */
function updateListCust(CustName) {
    for (var i = 0, len = customers.length; i < len; i++) {
        let tempCustName = customers[i].name.replace(/ /g, '%');
        let tempName = document.getElementById(tempCustName);
        if (CustName.replace(/ /g, '%') == tempName.id) {
            if (isCustInTruck(tempName.id.replace(/%/g, ' ')) == true) {
                tempName.style.border = '1px solid rgb(81, 179, 68)';
                tempName.style.backgroundColor = 'rgba(81,179,68,0.4)';
            } else {
                tempName.style.border = '1px solid #fb8302';
                tempName.style.backgroundColor = 'rgba(251,131,2,0.4)';
            }
        } else {
            if (isCustInTruck(tempName.id.replace(/%/g, ' ')) == true) {
                tempName.style.border = '1px solid #ccc';
                tempName.style.backgroundColor = 'white';
            } else {
                tempName.style.border = '1px solid rgb(179,42,52)';
                tempName.style.backgroundColor = 'rgba(179,42,52,0.4)';
            }
        }
    }
}

/**
 * Updates the unitsList and highlights the given unit in the list
 * @param unit - The unit that is to be highlighted as selected
 */
function updateListUnits(unit) {
    for (var i = 0, len = units.length; i < len; i++) {
        let tempName = document.getElementById(units[i].id.replace(/ /g, '%'));
        if (canvas.getActiveObject() == units[i]) {
            tempName.style = "background-color: rgba(81, 179, 68,0.4); border: 1px solid rgb(81, 179, 68); white-space: nowrap; width: 99%;";
        } else if (units[i].inCanvas != true) {
            if (units[i] === unit) {
                tempName.style = "background-color: rgba(251,131,2,0.4); border: 1px solid #fb8302; white-space: nowrap; width: 99%;";
            } else {
                tempName.style = "background-color: rgba(179,42,52,0.4); border: 1px solid rgb(179,42,52); white-space: nowrap; width: 99%;";
            }
        } else {
            tempName.style = "background-color: white; white-space: nowrap; width: 99%;";
        }
    }
}

/**
 * Creates unitsList and sets appropriate colors to each unit. Sets drag handlers for dragging to canvas
 * @param {unit} unitFromList - The currently selected unit
 */
function listUnits(unitFromList) {
    var html = '';
    for (var i = 0, len = units.length; i < len; i++) {
        let tempName = units[i].id.replace(/ /g, '%');
        if (canvas.getActiveObject() == units[i]) {
            html += '<div style="background-color: rgba(81, 179, 68,0.4); border: 1px solid rgb(81, 179, 68); white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
        } else if (units[i].inCanvas != true) {
            if (units[i] === unitFromList) {
                html += '<div style="background-color: rgba(251,131,2,0.4); border: 1px solid #fb8302; white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
            } else {
                html += '<div style="background-color: rgba(179,42,52,0.4); border: 1px solid rgb(179,42,52); white-space: nowrap; width: 99%;" class="list-group-item-unit" draggable="true" id=' + tempName + '>' + units[i].item(1).text + '</div>';
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
    unitsNotInCanvas = 0;
    units.forEach(function (unit) {
        if (unit.unitWidth <= 96) {
            shortUnits++;
        } else {
            longUnits++;
        }
        if (!unit.inCanvas){
            unitsNotInCanvas++;
        }
    });

    //Changes color of Units not in Truck to red if there is any
    if (unitsNotInCanvas > 0){
        document.getElementById('uNot').style.color = 'red';
        document.getElementById('uNotText').style.color = 'red';
    }else {
        document.getElementById('uNot').style.color = 'black';
        document.getElementById('uNotText').style.color = 'black';
    }

    document.getElementById('uNot').innerText = unitsNotInCanvas.toString();
    document.getElementById("tShorts").innerText = shortUnits.toString();
    document.getElementById("tLongs").innerText = longUnits.toString();

    //Drag handler
    uList = document.querySelectorAll('.list-group-unit div');
    [].forEach.call(uList, function (list) {
        list.addEventListener('dragstart', handleDragStart, false);
        list.addEventListener('dragend', handleDragEnd, false);
    });
}

/**
 * Creates custList and sets appropriate colors to each customer
 */
function listCustomer() {
    var html = '';
    let custsNotInCanvas = 0;
    for (var i = 0, len = customers.length; i < len; i++) {
        let tempName = customers[i].name.replace(/ /g, '%');
        if (_customer.value == customers[i].name) {
            if (isCustInTruck(tempName.replace(/%/g, ' ')) == false) {
                custsNotInCanvas++;
                html += '<div style="background-color: rgba(251,131,2,0.4); border: 1px solid #fb8302; white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true"  id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            } else {
                html += '<div style="background-color: rgba(81,179,68,0.4); border: 1px solid rgb(81, 179, 68); white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true"  id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            }
        } else {
            if (isCustInTruck(tempName.replace(/%/g, ' ')) == false) {
                custsNotInCanvas++;
                html += '<div style="background-color: rgba(179,42,52,0.4); border: 1px solid rgb(179,42,52); white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true" id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            } else {
                html += '<div style="background-color: white; white-space: nowrap; width: 99%; max-width: 99%; overflow: hidden;" class="list-group-item-cust" draggable="true" id=' + tempName + '>' + '(' + customers[i].drop + ') ' + customers[i].name + '  </div>';
            }
        }
    }
    html += '';
    custList.innerHTML = html;

    //Changes color of Units not in Truck to red if there is any
    if (custsNotInCanvas > 0){
        document.getElementById('cNot').style.color = 'red';
        document.getElementById('cNotText').style.color = 'red';
    }else {
        document.getElementById('cNot').style.color = 'black';
        document.getElementById('cNotText').style.color = 'black';
    }
    document.getElementById('cNot').innerText = custsNotInCanvas.toString();
}

/**
 * Triggers searching the list for customers
 */
function onCustSearch() {
    var input, list;
    input = document.getElementById('custSearch');
    list = document.getElementById("custList");
    onSearch(input, list);
}

/**
 * Triggers searching the list for units
 */
function onUnitSearch() {
    var input, list;
    input = document.getElementById('unitSearch');
    list = document.getElementById("unitList");
    onSearch(input, list);
}

/**
 * Searches the list based on input and displays only the matching results in the list
 * @param input - The text input that will be the search value
 * @param list - The list to search though
 */
function onSearch(input, list) {
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