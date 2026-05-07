
$(document).ready(function () {

    $(".meal-details").hide();

    $(".btnDetails").on("change", function () {
        let targetId = $(this).data("target");

        if ($(this).is(":checked")) {
            $("#" + targetId).slideDown(300);
        } else {
            $("#" + targetId).slideUp(300);
        }
    });

  
    $("#btnContinue").on("click", function () {

        let selectedMeals = $(".mealSelect:checked");

        if (selectedMeals.length === 0) {
            alert("الرجاء اختيار وجبة واحدة على الأقل قبل المتابعة.");
            return;
        }

        $("#orderFormContainer").html(`
            <h2>نموذج الطلب</h2>

            <form id="orderForm">

                <label>الاسم الكامل (بالإنكليزية):</label>
                <input type="text" id="fullName" placeholder="John Doe">

                <label>رقم الحساب المصرفي:</label>
                <input type="text" id="accountNumber" placeholder="مثال: 055555">

                <label>تاريخ الطلب (dd-mm-yyyy):</label>
                <input type="text" id="orderDate" placeholder="01-05-2026">

                <label>رقم الموبايل:</label>
                <input type="text" id="mobileNumber" placeholder="09xxxxxxxx">

                <button type="button" id="btnSubmitOrder">إرسال</button>

            </form>
        `);
    });

    $(document).on("click", "#btnSubmitOrder", function () {

        let fullName = $("#fullName").val().trim();
        let accountNumber = $("#accountNumber").val().trim();
        let orderDate = $("#orderDate").val().trim();
        let mobileNumber = $("#mobileNumber").val().trim();

                                     // التحقق من الاسم الكامل
        if (fullName !== "") {
            let nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
            if (!nameRegex.test(fullName)) {
                alert("الاسم يجب أن يكون باللغة الإنكليزية مع فراغ واحد فقط بين الاسم والكنية.");
                return;
            }
        }

                                                 // التحقق من رقم   
        let accountRegex = /^[0-9]{6}$/;
        if (!accountRegex.test(accountNumber)) {
            alert("رقم الحساب المصرفي يجب أن يكون 6 أرقام تماماً.");
            return;
        }

               // التحقق من التاريخ
        if (orderDate !== "") {
            let dateRegex = /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/;
            if (!dateRegex.test(orderDate)) {
                alert("الرجاء إدخال تاريخ صحيح بالشكل dd-mm-yyyy.");
                return;
            }
        }

        // التحقق من رقم الموبايل
        if (mobileNumber !== "") {
let mobileRegex = /^(09(3|4|5|6)[0-9]{7})$/;
            if (!mobileRegex.test(mobileNumber)) {
                alert("رقم الموبايل غير صحيح أو لا ينتمي لشبكتي MTN أو Syriatel.");
                return;
            }
        }

                                // حساب المجموع والضريبة
        let total = 0;
        let selectedList = "";

        $(".mealSelect:checked").each(function () {
            let price = parseInt($(this).val());
            total += price;

            let mealName = $(this).closest("tr").find("td:nth-child(2)").text();

            selectedList += `- ${mealName} : ${price} ل.س\n`;
        });

        let tax = total * 0.10;
        let net = total - tax;

                                                    // عرض النتائج
        let resultMessage =
            "الوجبات المختارة:\n" +
            selectedList +
            "\n-------------------------\n" +
            "المجموع الكلي: " + total + " ل.س\n" +
            "الضريبة (10%): " + tax + " ل.س\n" +
            "المبلغ الصافي: " + net + " ل.س\n";

        alert(resultMessage);
    });

});























