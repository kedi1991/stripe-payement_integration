document.addEventListener('DOMContentLoaded', async () =>{
    //fetch the publishable key from the server
    const {publishableKey} = await fetch('/config').then(r => r.json())
    const stripe = Stripe(publishableKey)


    //fetch the client secret from the payment intent

    const clientSecret = await fetch('/create-payment-intent', {
        method: "POST",
        headers:{
            "content-Type":"application/json"
        },
    }).then(r => r.json())

    //mount the elements
    const elements = stripe.elements(clientSecret)
    const paymentElement = elements.create("payment")
    paymentElement.mount('#payment-element')
});