document.getElementById("bookingForm").onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Calculate days stayed
    const days = (new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24);
    const totalAmount = days * <%= listingDetails.price %> * 100; // in paise for Razorpay

    // Set hidden totalAmount field
    document.getElementById("finalAmount").value = totalAmount / 100; // INR for DB

    const res = await fetch("/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount })
    });

    const order = await res.json();

    const options = {
        key: "<%= process.env.RAZORPAY_KEY_ID %>",
        amount: order.amount,
        currency: order.currency,
        name: "Booking Payment",
        description: "Payment for your stay",
        order_id: order.id,
        handler: async function (response) {
            alert("Payment successful: " + response.razorpay_payment_id);

            // Save booking in DB
            await fetch("/save-booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    listingId: data.listingId,
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    totalAmount: totalAmount / 100, // INR
                    paymentId: response.razorpay_payment_id
                })
            });
        },
        prefill: { name: data.name },
        theme: { color: "#F37254" }
    };
    const rzp = new Razorpay(options);
    rzp.open();
};