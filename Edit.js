let choosen_element = []
let values_index = 0
let lokal = JSON.parse(localStorage.getItem("punkt"))
const title = document.getElementById("edit_title")
const description = document.getElementById("edit_description")
const end = document.getElementById("edit_sluttdate")
function Open_edit() {
    localStorage.setItem("Rediger", JSON.stringify(choosen_element))
    window.location.href = "Edit/Edit.html"

}
function Edit() {
    choosen_element = JSON.parse(localStorage.getItem("Rediger"))
    if (lokal.length > 0) {
        for (let i=0; i < lokal.length; i++) {
            if (lokal[i][0] === choosen_element[0]) {
                values_index = i
            }
        }
    }
    title.value = choosen_element[0]
    description.value = choosen_element[1]
    end.value = choosen_element[3]
}
function Close_edit() {
    window.location.href = "../TODO.html"
}

function Done_edit() {
    if (lokal.length > 0) {
        lokal[values_index][0] = title.value
        lokal[values_index][1] = description.value
        lokal[values_index][3] = end.value
        localStorage.setItem("punkt", JSON.stringify(lokal))
        localStorage.setItem("Rediger", " ")

    } else {
        choosen_element[0] = title.value
        choosen_element[1] = description.value
        choosen_element[3] = end.value
        localStorage.setItem("Rediger", JSON.stringify(choosen_element))
    }
    
    window.location.href = "../TODO.html"
}
document.addEventListener("keydown", function Enter_done() {
    if (event.key === "Enter") {
        Done_edit()
    }
})