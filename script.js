var selectedRow = null

function rendertabelmahasiswa(dataawal){
    let index = 0;
    let tbody = document.getElementById("studentlist").querySelector('tbody');
    tbody.innerHTML = '';
    for(index = 0; index < dataawal.length; index++){
        let colname = '<td>'+dataawal[index].namamahasiswa+'</td>';
        let colNIM = '<td>'+dataawal[index].NomorInduk+'</td>';
        let coljurusan = '<td>'+dataawal[index].Jurusan+'</td>';
        let colangkatan = '<td>'+dataawal[index].Angkatan+'</td>';
        let doublebutton = '<td> <button onClick="ModalEdit(this)" class="editbutton">Edit</button><br><button onClick="Delete(this)" class="deletebutton">Delete</button>';

        let barisbaru = '<tr>'+colname+colNIM+coljurusan+colangkatan+doublebutton+'</tr>';
        tbody.innerHTML += barisbaru;
    }
}

function loadfirstdata(){
    let request = new XMLHttpRequest();
    request.open('GET','first.json', true);

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let dataawal = JSON.parse(request.responseText);
            console.log(dataawal);
            rendertabelmahasiswa(dataawal);
        }
        else{
            alert('Page Not Found');
        }
    }
    request.onerror = function(){
        alert('Request Failed! Check your internet connection');
    }
    request.send();
}

function onDocFinish(){
    loadfirstdata();
}

function onModalSubmit(){
    if(validatemodalbox()){
        var formData = readEditData();
    if(selectedRow==null)
        insertNewData(formData);
        else
        updateData(formData);
    }
}

function onFormSubmit(){
    if (validate()){
        var formData = readFormData();
    if(selectedRow==null)
        insertNewData(formData);
        else
        updateEditData(formData);

    clearForm();
    }
}

function readFormData(){
    var formData = {};
    formData["namamahasiswa"] = document.getElementById("namamahasiswa").value;
    formData["NomorInduk"] = document.getElementById("NomorInduk").value;
    formData["Jurusan"] = document.getElementById("Jurusan").value;
    formData["Angkatan"] = document.getElementById("Angkatan").value;
    return formData
}

function readEditData(){
    console.log('test')
    var formData = {};
    formData["namahasiswa"] = document.getElementById("namahasiswa").value;
    formData["NoInduk"] = document.getElementById("NoInduk").value;
    formData["Jurus"] = document.getElementById("Jurus").value;
    formData["Angkat"] = document.getElementById("Angkat").value;
    return formData
}

function insertNewData(data){
    var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    var newrow = table.insertRow(table.length);
    cell1 = newrow.insertCell(0);
    cell1.innerHTML = data.namamahasiswa;
    cell2 = newrow.insertCell(1);
    cell2.innerHTML = data.NomorInduk;
    cell3 = newrow.insertCell(2);
    cell3.innerHTML = data.Jurusan;
    cell4 = newrow.insertCell(3);
    cell4.innerHTML = data.Angkatan;
    cell4 = newrow.insertCell(4);
    cell4.innerHTML = `<button onClick="ModalEdit(this)" class="editbutton">Edit</button><br>
                       <button onClick="Delete(this)" class="deletebutton">Delete</button>`;
}

function clearForm(){
    document.getElementById("namamahasiswa").value = "";
    document.getElementById("NomorInduk").value = "";
    document.getElementById("Jurusan").value = "";
    document.getElementById("Angkatan").value = "";
}

function ModalEdit(td){
    var modalBg = document.querySelector('.modalbox');
    modalBg.classList.add('boxactive');
    document.getElementById("modalbox").style.display="inline-flex";
    selectedRow = td.parentElement.parentElement;
    console.log(selectedRow);
    document.getElementById("namahasiswa").value = selectedRow.cells[0].innerHTML;
    document.getElementById("NoInduk").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Jurus").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Angkat").value = selectedRow.cells[3].innerHTML;
}

function Edit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("namamahasiswa").value = selectedRow.cells[0].innerHTML;
    document.getElementById("NomorInduk").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Jurusan").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Angkatan").value = selectedRow.cells[3].innerHTML;
}

function updateData(formData){
    selectedRow.cells[0].innerHTML = formData.namahasiswa;
    selectedRow.cells[1].innerHTML = formData.NoInduk;
    selectedRow.cells[2].innerHTML = formData.Jurus;
    selectedRow.cells[3].innerHTML = formData.Angkat;
}

function updateEditData(formData){
    selectedRow.cells[0].innerHTML = formData.namamahasiswa;
    selectedRow.cells[1].innerHTML = formData.NomorInduk;
    selectedRow.cells[2].innerHTML = formData.Jurusan;
    selectedRow.cells[3].innerHTML = formData.Angkatan;
}

function Delete(td){
    if(confirm('Hapus data ini ?')){
        row = td.parentElement.parentElement;
        document.getElementById("studentlist").deleteRow(row.rowIndex);
        clearForm();
    } 
}

function validate() {
    isValid = true;
    if (document.getElementById("namamahasiswa").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function validatemodalbox() {
    isValid = true;
    if (document.getElementById("namahasiswa").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function modalclose(){
    var modalBg = document.querySelector('.modalbox');
    modalBg.classList.remove('boxactive');
}

var closemodalbox = document.querySelector('.closemodal');

closemodalbox.addEventListener('click',function(){
    var modalBg = document.querySelector('.modalbox');
    modalBg.classList.remove('boxactive');
})