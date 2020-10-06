var selectedRow = null

function onFormSubmit(){
    var formData = readFormData();
    if(selectedRow==null)
        insertNewData(formData);
        else
        updateData(formData);

    clearForm();
}

function readFormData(){
    var formData = {};
    formData["namamahasiswa"] = document.getElementById("namamahasiswa").value;
    formData["NomorInduk"] = document.getElementById("NomorInduk").value;
    formData["Jurusan"] = document.getElementById("Jurusan").value;
    formData["Angkatan"] = document.getElementById("Angkatan").value;
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
    cell4.innerHTML = `<a onClick="Edit(this)">Edit</a>
                       <a onClick="Delete(this)">Delete</a>`;
}

function clearForm(){
    document.getElementById("namamahasiswa").value = "";
    document.getElementById("NomorInduk").value = "";
    document.getElementById("Jurusan").value = "";
    document.getElementById("Angkatan").value = "";
}

function Edit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("namamahasiswa").value = selectedRow.cells[0].innerHTML;
    document.getElementById("NomorInduk").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Jurusan").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Angkatan").value = selectedRow.cells[3].innerHTML;
}

function updateData(formData){
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