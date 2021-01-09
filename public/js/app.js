
const weatherForm = document.querySelector("form")
weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const address = document.querySelector("#address")

    console.log(address.value)

    fetch('/weather?address=' + address.value).then((response) => {
    response.json().then((data) => {

        if (data.error) {
            console.log(data.error)
            const forecast = document.querySelector("#forecast")
            forecast.innerHTML = ''

            const error = document.querySelector("#error")
            error.innerHTML = data.error

        } else {
            const forecast = document.querySelector("#forecast")
            forecast.innerHTML = data.forecast

            const error = document.querySelector("#error")
            error.innerHTML = ''
}
    })
})
})

