let title = document.querySelector(".title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.querySelector(".total")
let count = document.querySelector(".count")
let category = document.querySelector(".category")
let create = document.querySelector(".create")
let tbody = document.getElementById("tbody")
let btnDelte = document.querySelector(".deleteAll")
let search = document.querySelector(".search")

let mood = "create"
let tm;

// ================================ Get Total for products ================================

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value)
        total.innerHTML = result
        total.style.cssText = `backGround-color : green ; `
    } else {
        total.style.cssText = `backGround-color : #a00d02 ;`
        total.innerHTML = ""
    }
}
// ================================ create new products and localstorage  ================================

create.addEventListener("click", addProduct)

let newArrProduct;

if (localStorage.product != null) {
    newArrProduct = JSON.parse(localStorage.product)
} else {
    newArrProduct = [];
}

function addProduct() {

    let newObjProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()


    }
    // ======================== count  ==========================

    if (title.value != "" && price.value != "" && category.value != "" && newObjProduct.count <= 100) {

        if (mood === "create") {
            if (newObjProduct.count > 1) {
                for (let i = 0; i < newObjProduct.count; i++) {
                    newArrProduct.push(newObjProduct)
                }
            } else {
                newArrProduct.push(newObjProduct)
            }
        } else {
            newArrProduct[tm] = newObjProduct
            mood = "create"
            create.innerHTML = "Create"
            count.style.display = "block"
            count.style.cssText = "margin-left : .5% ;"
        }
        // ================================ clear data in input  ================================

        create.addEventListener("click", clearInput)

        function clearInput() {

            title.value = ""
            price.value = ""
            taxes.value = ""
            ads.value = ""
            discount.value = ""
            total.innerHTML = ""
            count.value = ""
            category.value = ""
        }
    }

    localStorage.setItem('product', JSON.stringify(newArrProduct))

}

// ================================ show data in table  ================================

create.addEventListener("click", showData)

function showData() {
    getTotal()
    let table = ""
    for (let i = 0; i < newArrProduct.length; i++) {
        table += `
<tr>
<td>${i + 1}</td>
<td>${newArrProduct[i].title}</td>
<td>${newArrProduct[i].price}</td>
<td>${newArrProduct[i].taxes}</td>
<td>${newArrProduct[i].ads}</td>
<td>${newArrProduct[i].discount}</td>
<td>${newArrProduct[i].total}</td>
<td>${newArrProduct[i].category}</td>
<td><button id="update" onclick="updateData(${i})">update</button></td>
<td><button id="delete" onclick="deleteData(${i})">delete</button> </td>
</tr>
`
    }

    tbody.innerHTML = table

    // ================================ Delete All product  ================================
    if (newArrProduct.length > 0) {

        btnDelte.innerHTML = `
        <button onclick="deleteAll()">Delete All  (${newArrProduct.length})</button>
        `

    } else {
        btnDelte.innerHTML = ""
    }

}
function deleteAll() {
    localStorage.clear()
    newArrProduct.splice(0)
    showData()
}
// ================================ Delete one product  ================================

+function deleteData(i) {
    newArrProduct.splice(i, 1)
    localStorage.product = JSON.stringify(newArrProduct)
    showData()
}

// ================================ Update product  ================================

function updateData(i) {
    title.value = newArrProduct[i].title
    price.value = newArrProduct[i].price
    taxes.value = newArrProduct[i].taxes
    ads.value = newArrProduct[i].ads
    discount.value = newArrProduct[i].discount
    getTotal();
    count.style.display = "none"
    category.value = newArrProduct[i].category
    create.innerHTML = "Update"
    mood = "update"
    tm = i
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// ================================ Search  ================================

let searchMood = "title"

function getSearchMood(id) {
    if (id == "SearchTitle") {
        searchMood = "title"
        search.placeholder = "Search By Title"
    } else {
        searchMood = "category"
        search.placeholder = "Search By Category"
    }
    search.focus()
    search.value = ""
    showData()
}

function searchData(value) {

    let table = ""

    if (searchMood == "title") {
        for (let i = 0; i < newArrProduct.length; i++) {

            if (newArrProduct[i].title.includes(value.toLowerCase())) {

                table += `
        <tr>
        <td>${i}</td>
        <td>${newArrProduct[i].title}</td>
        <td>${newArrProduct[i].price}</td>
        <td>${newArrProduct[i].taxes}</td>
        <td>${newArrProduct[i].ads}</td>
        <td>${newArrProduct[i].discount}</td>
        <td>${newArrProduct[i].total}</td>
        <td>${newArrProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button> </td>
        </tr>
    
        `
            }
        }
    } else {
        for (let i = 0; i < newArrProduct.length; i++) {

            if (newArrProduct[i].category.includes(value.toLowerCase())) {

                table += `
        <tr>
        <td>${i}</td>
        <td>${newArrProduct[i].title}</td>
        <td>${newArrProduct[i].price}</td>
        <td>${newArrProduct[i].taxes}</td>
        <td>${newArrProduct[i].ads}</td>
        <td>${newArrProduct[i].discount}</td>
        <td>${newArrProduct[i].total}</td>
        <td>${newArrProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button> </td>
        </tr>
        
        `
            }
        }
    }
    tbody.innerHTML = table
}
