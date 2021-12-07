// --- global variables ---
        //JQUERY
        if (localStorage.getItem("Array") == null) {
            loans = [
                { loan_year: 2020, loan_amount: 10000.00, loan_int_rate: 0.0453 },
                { loan_year: 2021, loan_amount: 10000.00, loan_int_rate: 0.0453 },
                { loan_year: 2022, loan_amount: 10000.00, loan_int_rate: 0.0453 },
                { loan_year: 2023, loan_amount: 10000.00, loan_int_rate: 0.0453 },
                { loan_year: 2024, loan_amount: 10000.00, loan_int_rate: 0.0453 }
            ];
        }

        else {
            loans = JSON.parse(localStorage.getItem("Array"));
        }


        // --- function: loadDoc() ---

        $(document).ready(function () {

            // pre-fill defaults for first loan year
            var defaultYear = loans[0].loan_year;
            //document.getElementById("loan_year0" + 1).value = defaultYear++;
            $("#loan_year0" + 1).val(defaultYear++);

            var defaultLoanAmount = loans[0].loan_amount;
            //document.getElementById("loan_amt0" + 1).value = defaultLoanAmount.toFixed(2);
            $("#loan_amt0" + 1).val(defaultLoanAmount.toFixed(2));

            var defaultInterestRate = loans[0].loan_int_rate;
            //document.getElementById("loan_int0" + 1).value = defaultInterestRate;
            $("#loan_int0" + 1).val(defaultInterestRate);

            var loanWithInterest = loans[0].loan_amount * (1 + loans[0].loan_int_rate);
            // document.getElementById("loan_bal0" + 1).innerHTML = toComma(loanWithInterest.toFixed(2));
            $("#loan_amt0" + 1).html(toComma(loanWithInterest.toFixed(2)));

            // pre-fill defaults for other loan years
            for (var i = 2; i < 6; i++) {
                $("#loan_year0" + i).attr({
                    "value": defaultYear++,
                    "disabled": true,
                    "style.backgroundColor": "gray",
                    "style.color": "white",
                })


                $("#loan_amt0" + i).val((loans[i - 1].loan_amount).toFixed(2));

                $("#loan_int0" + i).attr({
                    "value": defaultInterestRate,
                    "disabled": true,
                    "style.backgroundColor": "gray",
                    "style.color": "white",
                })

                /*document.getElementById("loan_year0" + i).value = defaultYear++;
                document.getElementById("loan_year0" + i).disabled = true;
                document.getElementById("loan_year0" + i).style.backgroundColor = "gray";
                document.getElementById("loan_year0" + i).style.color = "white";
                document.getElementById("loan_amt0" + i).value = defaultLoanAmount.toFixed(2);
                document.getElementById("loan_int0" + i).value = defaultInterestRate;
                document.getElementById("loan_int0" + i).disabled = true;
                document.getElementById("loan_int0" + i).style.backgroundColor = "gray";
                document.getElementById("loan_int0" + i).style.color = "white"; */

                loanWithInterest = (loanWithInterest + defaultLoanAmount) * (1 + defaultInterestRate);

                $("#loan_amt0" + i).html(toComma(loanWithInterest.toFixed(2)));

                //document.getElementById("loan_bal0" + i).innerHTML = toComma(loanWithInterest.toFixed(2));

            } // end: "for" loop

            // all input fields: select contents on fucus
            $("input[type=text]").focus(function () {
                $(this).select();
                $(this).css("background-color", "yellow");
            });
            $("input[type=text]").blur(function () {
                $(this).css("background-color", "white");
            });

            // set focus to first year
            $("#loan_year01").focus();
            $("#loan_year01").blur(function () {
                updateLoansArray();
            });

            $("#loan_int01").blur(function () {
                updateLoansArray();
            });

            for (var i = 1; i < 6; i++) {
                $("#loan_amt0" + i).blur(function () {
                    updateLoansArray();
                });
            }

        });

        function toComma(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function updateLoansArray() {
            //Regular Expression gotten from user SpYk3HH on stackOverflow
            var patt = new RegExp(/^-?\d+\.?\d*$|^\d*\.?\d+$/);

            var balance = 0;

            var val1 = $("#loan_year01").val();
            if (patt.test(val1) == false) {
                alert("INVALID YEAR ENTRY");
                $("#loan_year01").val(0);
            }

            for (var i = 1; i < 6; i++) {
                var val2 = $("#loan_amt0" + i).val();
                if (patt.test(val2) == false) {
                    alert("INVALID AMNT ENTRY");
                    $("#loan_amt0" + i).val(0);
                }
            }

            var val3 = $("#loan_int01").val();
            if (patt.test(val3) == false) {
                alert("INVALID YEAR ENTRY");
                $("#loan_int01").val(0);
            }


            loans[0].loan_year = parseInt($("#loan_year01").val());
            loans[0].loan_int_rate = parseFloat($("#loan_int01").val());

            //Enters new loan and interest rates
            for (var i = 1; i < 5; i++) {
                loans[i].loan_year = loans[0].loan_year + i;
                $("#loan_year0" + (i + 1)).val(loans[i].loan_year);
                loans[i].loan_int_rate = loans[0].loan_int_rate;
                $("#loan_int0" + (i + 1)).val(loans[i].loan_int_rate);
            }

            for (var i = 0; i < 5; i++) {
                loans[i].loan_amount = parseFloat($("#loan_amt0" + (i + 1)).val());
            }


            //Does calculations
            var rate = loans[0].loan_int_rate;
            var balance2;
            var amount = loans[0].loan_amount;
            balance = balance + ((amount * rate) + amount);
            $("#loan_bal01").html("$" + toComma(parseFloat(balance).toFixed(2)));

            for (var i = 1; i < 5; i++) {
                var amount2 = loans[i].loan_amount;
                balance = ((balance + amount2) * rate) + balance + amount2;
                $("#loan_bal0" + (i + 1)).html("$" + toComma(parseFloat(balance).toFixed(2)));
                
                //Used to store final balance
                balance2 = balance;
            }

            var loanArray = JSON.stringify(loans);
            localStorage.setItem("Array", loanArray);
            
            //To figure out interest, add amount 1 - > 5 together and subtract it from final amount

            var finalBal = balance2;
            var totalAmt = 0;
            for (i = 0; i < 5; i++) {
                totalAmt = totalAmt + loans[i].loan_amount;
            }

            var accruedInterest = finalBal - totalAmt;

            $("#loan_int_accrued").html("$" + toComma(accruedInterest.toFixed(2)));

        }


        //ANGULAR
        var app = angular.module("app", []); 
        app.controller("controller", function($scope) {
            $scope.showPayments = function () {
                var loans = [];
                var replacedComma = ($("#loan_bal05").html()).replace(",","");
                while (replacedComma.includes(",") == true) {
                    var replacedComma = replacedComma.replace(",","");
                    console.log(replacedComma);
                }
                var bal5 = parseFloat(replacedComma.replace("$",""));
                var intRate = parseFloat($("#loan_int01").val());
                var payment = 6500;

                var i = 0, balance3 = 0, year = 0, prevBal = 0, prevInt = 0;

                do {
                    var vals = {};
                    if (bal5 < payment) {
                        vals.year = parseInt($("#loan_year05").val()) + 1;
                        vals.amt = "$" + toComma(payment);
                        vals.int = "$0.00";
                        vals.bal = "$0.00";
                    }

                    else {
                        if (i == 0) {
                            vals.year = parseInt($("#loan_year05").val()) + 1;
                            vals.amt = "$" + toComma(((payment).toFixed(2)));
                            vals.int = "$" + toComma(((bal5 - payment) * intRate).toFixed(2));
                            vals.bal = "$" + toComma(((bal5 - payment) * (parseFloat($("#loan_int01").val()) + parseFloat(1))).toFixed(2));
                            prevBal = ((bal5 - payment) * (parseFloat($("#loan_int01").val()) + parseFloat(1)));
                            prevInt = ((bal5 - payment) * intRate);
                        }

                        else {
                            vals.year = parseInt($("#loan_year05").val()) + i + 1;
                            vals.amt = "$" + toComma((payment).toFixed(2));
                            vals.int = "$" + toComma(((prevBal - payment) * intRate).toFixed(2));
                            vals.bal = "$" + toComma(((prevBal - payment) * (parseFloat($("#loan_int01").val()) + parseFloat(1))).toFixed(2));
                            prevBal = (prevBal - payment) * (parseFloat($("#loan_int01").val()) + parseFloat(1));
                            prevInt = ((prevBal - payment) * intRate);
                        }
                    }

                    balance3 = prevBal;
                    year = vals.year + 1;

                    loans.push(vals);

                    i++;

                //Makes sure loop does not go negative (As there is no reason to)
                } while (balance3 > payment && i < 10);

                var vals = {};
                if (balance3 > payment) {
                    vals.year = year;
                    vals.amt = "$" + toComma(balance3.toFixed(2));
                    vals.int  = "$0.00";
                    vals.bal = "$0.00";
                }

                if (balance3 < payment && balance3 != 0) {
                    vals.year = year;
                    vals.amt = "$" + toComma(balance3.toFixed(2));
                    vals.int  = "$0.00";
                    vals.bal = "$0.00";
                }

                loans.push(vals);
                $scope.loans = loans;

            };
        
        });
