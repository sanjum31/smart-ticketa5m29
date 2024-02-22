"use strict";
const buyTickets = document.getElementById("buyTickets");
const totalSeatElement = document.getElementById("totalSeat");
const totalPriceElement = document.getElementById("totalPrice");
const grandTotalElement = document.getElementById("grandTotal");
const seatElement = document.getElementsByClassName("kbd");
const seatDetails = document.getElementById("seatDetails");
const phoneElement = document.getElementById("phone");
const nextButtonElement = document.getElementById("nextButton");
const couponFieldElement = document.getElementById("couponField");
const applyCouponButtonElement = document.getElementById("applyCouponButton");
const discountElement = document.getElementById("discount");
const discountedPriceElement = document.getElementById("discountedPrice");
const confirmationElement = document.getElementById("confirmation");
const modal = document.getElementById("my_modal_8");
const totalSelectedSeatElement = document.getElementById("totalSelectedSeat");
const applyCouponAreaElement = document.getElementById("applyCouponArea");

let totalSeat = 8;
let ticketPrice = 550;
let totalPrice = 0;
let grandTotal = 0;
let discountedPrice = 0;
let maximumSeatSelect = 4;
let totalSelectedSeat = 0;
let phoneStatus = false;
let couponButtonStatus = false;
const couponCodeOne = "NEW15";
const couponCodeTwo = "Couple 20";
const couponCodeOneDiscount = 15 / 100;
const couponCodeTwoDiscount = 20 / 100;

// initialize total seat
totalSeatElement.textContent = totalSeat;
totalPriceElement.textContent = totalPrice;
grandTotalElement.textContent = grandTotal;
discountedPriceElement.textContent = discountedPrice;
totalSelectedSeatElement.textContent = totalSelectedSeat;
seatDetails.classList.add("hidden");
applyCouponButtonElement.disabled = true;
changeNextButtonStatus();

// buy ticket button click section move to paribohon
buyTickets.addEventListener("click", function () {
    var section = document.getElementById("paribohon");
    section.scrollIntoView({ behavior: "smooth" });
});

for (var i = 0; i < seatElement.length; i++) {
    var newDiv = document.createElement("div");
    seatElement[i].addEventListener("click", function (e, i) {
        if (this.classList.contains("bg-[#1DD100]")) {
            this.classList.remove("bg-[#1DD100]");
            totalSeat++;
            maximumSeatSelect++;
            totalSelectedSeat--;
            document.getElementById(this.innerText).remove();
            totalPrice -= ticketPrice;
            grandTotal -= ticketPrice;
            changeNextButtonStatus();
            changeCouponButtonStatus();
            changeApplyCouponAreaStatus();
            if (totalSelectedSeat == 0) {
                seatDetails.classList.add("hidden");
            }
            if (couponFieldElement.value === couponCodeOne || couponFieldElement.value === couponCodeTwo
            ) {
                discountElement.classList.add("hidden");
                discountedPrice = 0;
                discountedPriceElement.textContent = discountedPrice;
                grandTotalElement.textContent = grandTotal - discountedPrice;
            }
        } else {
            if (maximumSeatSelect > 0) {
                this.classList.add("bg-[#1DD100]");
                totalSeat--;
                maximumSeatSelect--;
                totalSelectedSeat++;
                newDiv.innerHTML += `<div class="flex justify-between p-3" id="${this.innerText}"><h1 class="font-inter text-sm text-[#03071299]">${this.innerText}</h1><h1 class="font-inter  text-sm text-[#03071299] pl-5">Economy</h1><h1 class="font-inter  text-sm text-[#03071299]">${ticketPrice}</h1></div>`;

                seatDetails.appendChild(newDiv);
                if (totalSelectedSeat == 1) {
                    seatDetails.classList.remove("hidden");
                }
                totalPrice += ticketPrice;
                grandTotal += ticketPrice;
                changeNextButtonStatus();
                changeCouponButtonStatus();
            } else {
                alert("Single person can buy maximum 4 tickets");
            }
        }
        totalSeatElement.textContent = totalSeat;
        totalPriceElement.textContent = totalPrice;
        grandTotalElement.textContent = grandTotal;
        totalSelectedSeatElement.textContent = totalSelectedSeat;
    });
}

phoneElement.addEventListener("input", function () {
    if (phoneElement.value != "" && !isNaN(phoneElement.value) && phoneElement.value.length >= 10
    ) {
        phoneStatus = true;
        changeNextButtonStatus();
    } else {
        phoneStatus = false;
        changeNextButtonStatus();
    }
});

applyCouponButtonElement.addEventListener("click", function () {
    if (!(maximumSeatSelect > 0)) {
        if (couponFieldElement.value === couponCodeOne) {
            discountedPrice = totalPrice * couponCodeOneDiscount;
            discountElement.classList.remove("hidden");
            discountedPriceElement.textContent = discountedPrice;
            grandTotalElement.textContent = grandTotal - discountedPrice;
            applyCouponAreaElement.classList.add("hidden");
        } else if (couponFieldElement.value === couponCodeTwo) {
            discountedPrice = totalPrice * couponCodeTwoDiscount;
            discountElement.classList.remove("hidden");
            discountedPriceElement.textContent = discountedPrice;
            grandTotalElement.textContent = grandTotal - discountedPrice;
            applyCouponAreaElement.classList.add("hidden");
        } else {
            alert("Coupon code not matched");
        }
    }
});

nextButtonElement.addEventListener("click", function () {
    modal.classList.add("modal-open");
});

confirmationElement.addEventListener("click", function () {
    modal.classList.remove("modal-open");
    location.reload();
});

function changeNextButtonStatus() {
    if (phoneStatus && maximumSeatSelect < 4 && maximumSeatSelect >= 0) {
        nextButtonElement.disabled = false;
    } else {
        nextButtonElement.disabled = true;
    }
}

function changeCouponButtonStatus() {
    if (totalSelectedSeat == 4) {
        applyCouponButtonElement.disabled = false;
    } else {
        applyCouponButtonElement.disabled = true;
    }
}

function changeApplyCouponAreaStatus() {
    applyCouponAreaElement.classList.remove("hidden");
}
