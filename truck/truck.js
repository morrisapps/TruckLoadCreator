/*!
 * TruckLoadCreator (https://github.com/morrisapps/TruckLoadCreator)
 * Copyright 2022 (c) Corey Morris
 * Licensed under MIT (https://github.com/morrisapps/TruckLoadCreator/blob/master/LICENSE.md)
 */

/**
 * This class represents the templated truck.
 * (Ex. A truck with ID 0801, maximum height 90", Maximum depth (both sides) 90", maximum weight 50000 lb, etc...)
 */
class Truck {
    /**
     * Creates instance of truck
     * @param ID - The ID of the truck
     * @param height - The maximum height of the truck
     * @param weight - The maximum weight of the truck
     * @param frontWeight - The maximum weight of the front half of the truck represented as a percent of the total truck weight
     * @param backWeight - The maximum weight of the back half of the truck represented as a percent of the total truck weight
     * @param halfWeight - The half weight of the truck (Not just 50% of the maximum weight)
     * @param length - The full length of the truck
     * @param d1 - The top left depth (Or the full truck's depth if flatbed)
     * @param d2 - The top middle depth of the section
     * @param d3 - The top right depth of the section
     * @param d4 - The bottom left depth of the section
     * @param d5 - The bottom middle depth of the section
     * @param d6 - The bottom right depth of the section
     * @param w1 - The top left width of the section
     * @param w2 - The top middle width of the section
     * @param w3 - The top right width of the section
     * @param w4 - The bottom left width of the section
     * @param w5 - The bottom middle width of the section
     * @param w6 - The bottom right width of the section
     * @param {int} type - Type of trailer. 0 Barndoor, 1 flatbed, 2 Roll-Tite, 3 curtain, 4 Conestoga
     */
    constructor(ID, height, weight, frontWeightPercent, backWeightPercent, halfWeight, length, d1, d2, d3, d4, d5, d6, w1, w2, w3, w4, w5, w6, type) {
        this.ID = ID;
        this.height = height;
        this.weight = weight;
        this.frontWeightPercent = frontWeightPercent;
        this.backWeightPercent = backWeightPercent;
        this.halfWeight = halfWeight;
        this.length = length;
        this.d1 = d1;
        this.d2 = d2;
        this.d3 = d3;
        this.d4 = d4;
        this.d5 = d5;
        this.d6 = d6;
        this.w1 = w1;
        this.w2 = w2;
        this.w3 = w3;
        this.w4 = w4;
        this.w5 = w5;
        this.w6 = w6;
        this.type = type;

        this.setDoorText();
    }
    /**
     * Gets the Truck ID
     * @returns The ID of the truck
     */
    getID(){
        return this.ID;
    }

    /**
     * Sets the trucks ID
     * @param ID - The ID of the truck
     */
    setID(ID){
        this.ID = ID;
    }
    /**
     * Gets the Truck's maximum height
     * @returns The maximum height of the truck
     */
    getHeight(){
        return this.height;
    }
    /**
     * Sets the truck's maximum height
     * @param height - The maximum height of the truck
     */
    setHeight(height){
        this.height = height;
    }
    /**
     * Gets the Truck's maximum weight
     * @returns The maximum weight of the truck
     */
    getWeight(){
        return this.weight;
    }
    /**
     * Sets the truck's maximum weight
     * @param weight - The maximum weight of the truck
     */
    setWeight(weight){
        this.weight = weight;
    }
    /**
     * Gets the Truck's maximum front half weight as a percent of the total truck weight
     * @returns The maximum front half weight of the truck as a percent of the total truck weight
     */
    getFrontWeightPercent(){
        return this.frontWeightPercent;
    }
    /**
     * Sets the truck's front half maximum weight as a percent of the total truck weight
     * @param weight - The maximum weight of the front half of the truck's total weight as percent
     */
    setFrontWeightPercent(weight){
        this.frontWeightPercent = weight;
    }
    /**
     * Gets the Truck's maximum back half weight as a percent of the total truck weight
     * @returns The maximum back half weight of the truck as a percent of the total truck weight
     */
    getBackWeightPercent(){
        return this.backWeightPercent;
    }
    /**
     * Sets the truck's back half maximum weight as a percent of the total truck weight
     * @param weight - The maximum weight of the back half of the truck's total weight as percent
     */
    setBackWeightPercent(weight){
        this.backWeightPercent = weight;
    }
    /**
     * Gets the truck's half maximum weight
     * @returns The maximum half weight of the truck
     */
    getHalfWeight(){
        return this.halfWeight;
    }
    /**
     * Sets the truck's maximum half weight
     * @param halfWeight - The maximum half weight of the truck
     */
    setHalfWeight(halfWeight){
        this.halfWeight = halfWeight;
    }
    /**
     * Gets the Truck's length
     * @returns The length of the truck
     */
    getLength(){
        return this.length;
    }
    /**
     * Sets the truck's length
     * @param length - The length of the truck
     */
    setLength(length){
        this.weight = length;
    }
    /**
     * Gets the Truck's top left depth. If flatbed, this is the full truck depth instead.
     * @returns The truck's top left depth.
     */
    getD1(){
        return this.d1;
    }
    /**
     * Sets the truck's top left depth. If flatbed, set the full truck depth instead
     * @param d1 - The top left depth of the truck
     */
    setD1(d1){
        this.d1 = d1;
    }
    /**
     * Gets the Truck's top middle depth.
     * @returns The truck's top middle depth.
     */
    getD2(){
        return this.d2;
    }
    /**
     * Sets the truck's top middle depth.
     * @param d2 - The top middle depth of the truck
     */
    setD2(d2){
        this.d2 = d2;
    }
    /**
     * Gets the Truck's top right depth.
     * @returns The truck's top right depth.
     */
    getD3(){
        return this.d3;
    }
    /**
     * Sets the truck's top right depth.
     * @param d3 - The top right depth of the truck
     */
    setD3(d3){
        this.d3 = d3;
    }
    /**
     * Gets the Truck's bottom left depth.
     * @returns The truck's bottom left depth.
     */
    getD4(){
        return this.d4;
    }
    /**
     * Sets the truck's bottom left depth.
     * @param d4 - The bottom left depth of the truck
     */
    setD4(d4){
        this.d4 = d4;
    }
    /**
     * Gets the Truck's bottom middle depth.
     * @returns The truck's bottom middle depth.
     */
    getD5(){
        return this.d5;
    }
    /**
     * Sets the truck's bottom middle depth.
     * @param d5 - The bottom middle depth of the truck
     */
    setD5(d5){
        this.d5 = d5;
    }
    /**
     * Gets the Truck's bottom right depth.
     * @returns The truck's bottom right depth.
     */
    getD6(){
        return this.d6;
    }
    /**
     * Sets the truck's bottom right depth.
     * @param d6 - The bottom right depth of the truck
     */
    setD6(d6){
        this.d6 = d6;
    }
    /**
     * Gets the Truck's top left width.
     * @returns The truck's top left width.
     */
    getW1(){
        return this.w1;
    }
    /**
     * Sets the truck's top left width.
     * @param w1 - The top left width of the truck
     */
    setW1(w1){
        this.w1 = w1;
    }
    /**
     * Gets the Truck's top middle width.
     * @returns The truck's top middle width.
     */
    getW2(){
        return this.w2;
    }
    /**
     * Sets the truck's top middle width.
     * @param w2 - The top middle width of the truck
     */
    setW2(w2){
        this.w2 = w2;
    }
    /**
     * Gets the Truck's top right width.
     * @returns The truck's top right width.
     */
    getW3(){
        return this.w3;
    }
    /**
     * Sets the truck's top right width.
     * @param w3 - The top right width of the truck
     */
    setW3(w3){
        this.w3 = w3;
    }
    /**
     * Gets the Truck's bottom left width.
     * @returns The truck's bottom left width.
     */
    getW4(){
        return this.w4;
    }
    /**
     * Sets the truck's bottom left width.
     * @param w4 - The bottom left width of the truck
     */
    setW4(w4){
        this.w4 = w4;
    }
    /**
     * Gets the Truck's bottom middle width.
     * @returns The truck's bottom middle width.
     */
    getW5(){
        return this.w5;
    }
    /**
     * Sets the truck's bottom middle width.
     * @param w5 - The bottom middle width of the truck
     */
    setW5(w5){
        this.w5 = w5;
    }
    /**
     * Gets the Truck's bottom right width.
     * @returns The truck's bottom right width.
     */
    getW6(){
        return this.w6;
    }
    /**
     * Sets the truck's bottom right width.
     * @param w6 - The bottom right width of the truck
     */
    setW6(w6){
        this.w6 = w6;
    }
    /**
     * Gets the int representing which trailer type it is.
     * @returns {int} - 1 = Flatbed, 2 = Roll-Tite, 3 = Curtain, 4 = Conestoga
     */
    getType(){
        return this.type;
    }
    /**
     * Gets the text for top left section
     * @returns {string} - The text of the top left section
     */
    getDoorText1(){
        return this.door1;
    }
    /**
     * Gets the text for top middle section
     * @returns {string} - The text of the top middle section
     */
    getDoorText2(){
        return this.door2;
    }
    /**
     * Gets the text for top right section
     * @returns {string} - The text of the top right section
     */
    getDoorText3(){
        return this.door3;
    }
    /**
     * Gets the text for bottom left section
     * @returns {string} - The text of the bottom left section
     */
    getDoorText4(){
        return this.door4;
    }
    /**
     * Gets the text for bottom middle section
     * @returns {string} - The text of the bottom middle section
     */
    getDoorText5(){
        return this.door5;
    }
    /**
     * Gets the text for bottom right section
     * @returns {string} - The text of the bottom right section
     */
    getDoorText6(){
        return this.door6;
    }
    /**
     * Sets the door text fields based on trucks height, depth(s), and length
     */
    setDoorText(){
        if (this.getID() == "start" || this.getID() == "Custom Flatbed" || this.getID() == "46 Flatbed" || this.getID() == "48 Flatbed"){
            this.door1 = '';
            this.door2 = '';
            this.door3 = '';
            this.door4 = '';
            this.door5 = '';
            this.door6 = '';
        }else {
            if (this.getType() != 0){
                this.door1 = this.getLength().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD1().toString()+'\"D';
                this.door2 = '';
                this.door3 = '';
                this.door4 = '';
                this.door5 = '';
                this.door6 = '';
            } else {
                this.door1 = this.getW1().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD1().toString()+'\"D';
                this.door2 = this.getW2().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD2().toString()+'\"D';
                this.door3 = this.getW3().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD3().toString()+'\"D';
                this.door4 = this.getW4().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD4().toString()+'\"D';
                this.door5 = this.getW5().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD5().toString()+'\"D';
                this.door6 = this.getW6().toString()+'\'W - ' + this.getHeight().toString()+'\"H - '+this.getD6().toString()+'\"D';
            }
            if (this.getD1() != 0 && this.getD4() != 0 && this.getD1() != this.getD4()){this.door1 += " Offset"; this.door4 += " Offset"}
            if (this.getD2() != 0 && this.getD5() != 0 && this.getD2() != this.getD5()){this.door2 += " Offset"; this.door5 += " Offset"}
            if (this.getD3() != 0 && this.getD6() != 0 && this.getD3() != this.getD6()){this.door3 += " Offset"; this.door6 += " Offset"}

            if (this.getType() == 1){this.door1 += " Flatbed"}
            if (this.getType() == 2){this.door1 += " Roll-Tite"}
            if (this.getType() == 3){this.door1 += " Curtain"}
            if (this.getType() == 4){this.door1 += " Conestoga"}
        }
    }
}