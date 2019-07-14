class TipCalculator {
    constructor(element) {
        this.$el = element.element

        this.$bill = this.$el.querySelector('[data-component="bill"]')
        this.$tip = this.$el.querySelector('[data-component="tip"]')
        this.$splitBill = this.$el.querySelector('[data-component="split-checkbox"]')
        this.$splitAmount = this.$el.querySelector('[data-component="between-amount"]')

        this.$splitBill.addEventListener("change", this.splitChange.bind(this))
        this.$el.addEventListener("change", this.calculate.bind(this))

        this.calculate()
    }

    splitChange() {
        let splitBetweenForm = document.querySelector(".form-group")
        let resultPerPersonBlock = document.querySelector('[data-component="resultPersonBlock"]')
        if (this.$splitBill.checked) {
            splitBetweenForm.removeAttribute("hidden")
            resultPerPersonBlock.removeAttribute("hidden")
            this.calculate()
        } else {
            splitBetweenForm.setAttribute("hidden", "true")
            resultPerPersonBlock.setAttribute("hidden", "true")
            this.$splitAmount.value = this.$splitAmount.min
        }
    }

    calculate() {
        let tipAmount = document.querySelector('[data-component="result"]')
        let totalPrice = document.querySelector('[data-component=total]')
        let tipPerPerson = document.querySelector('[data-component="resultPerson"]')
        let totalPerPerson = document.querySelector('[data-component=totalPerson]')

        tipAmount.value = this.$tip.value
        totalPrice.value = (this.$bill.value * this.$tip.value / 100).toFixed(2)

        tipPerPerson.value = tipAmount.value
        totalPerPerson.value = totalPrice.value

        if (this.$splitBill.checked) {
            tipPerPerson.value = (tipPerPerson.value / this.$splitAmount.value).toFixed(2)
            totalPerPerson.value = (totalPerPerson.value / this.$splitAmount.value).toFixed(2)
        }
    }
}

const main = new TipCalculator({element: document.querySelector('[data-selector="form"]')})