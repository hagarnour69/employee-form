//HTml elements
var employeeNameInput=document.getElementById("EmployeeName");
var employeeMailInput =document.getElementById("EmployeeMail");
var employeeTeleInput =document.getElementById("EmployeeTele");
var EmployeeIdInput =document.getElementById("EmployeeID");
var ProducCategoryInput =document.getElementById("Branches");
var ProducImageInput =document.getElementById("productImage");
var productSearchInput =document.getElementById("Search");
var addBtn=document.getElementById("addproduct");
var SetUP=document.getElementById("updateproduct");
var productContainer=[];//to avoid overwrite 
if(localStorage.getItem(`products`)==null)
  {
    productContainer=[];
  }
  else
  {
    productContainer=JSON.parse(localStorage.getItem('products'));
    DisplayProduct(productContainer);

  }
function GetProduct()
{
var product={
  EmployeeName:employeeNameInput.value ,
  EmployeeEmail:employeeMailInput.value ,
  EmployeeTele:employeeTeleInput.value ,
  EmployeeID:EmployeeIdInput.value,
  ProducCategory:ProducCategoryInput.value,
  ProducImage:`images/products/${ProducImageInput.files[0]?.name}`
}
productContainer.push(product);
clearForm();
SetItems();
DisplayProduct(productContainer);
}

function clearForm() {
  employeeNameInput.value=null;
  employeeMailInput.value=null;
  employeeTeleInput.value=null;
  EmployeeIdInput.value=null;
  ProducCategoryInput.value=null;
  ProducImageInput.value=null;
}
function DisplayProduct(arry)
 {
  var elementConetnt=``;
  for(var i=0;i<arry.length;i++)
    {
      elementConetnt+=`<tr class="text-center">
      <td>${arry[i].EmployeeID}</td>
      <td>${arry[i].EmployeeName}</td>
      <td><a href="mailto:${arry[i].EmployeeEmail}" class="text-decoration-none text-black">${arry[i].EmployeeEmail}</a></td>
      <td><a href="tel:${arry[i].EmployeeTele}" class="text-decoration-none text-black">${arry[i].EmployeeTele}</a></td>
      <td>${arry[i].ProducCategory}</td>
      <td><img class=" " src="${arry[i].ProducImage}"/></td>
      <td><button class="btn btn-sm bg-danger text-white py-2 px-3" onclick="DeleteItem(${i})"><i class="fa-solid fa-trash-can"></i>
 </button> </td>
      <td><button class="btn btn-sm bg-warning text-white py-2 px-3" onclick="setFormForUpdate(${i})"> <i class="fa-solid fa-pencil"></i>
 </button> </td>
    </tr>`;
    }
    document.getElementById("productDisplay").innerHTML=elementConetnt;

}
function DeleteItem(ItemIndex)
{
  productContainer.splice(ItemIndex,1);
  DisplayProduct(productContainer);
  localStorage.setItem('products',JSON.stringify(productContainer));

}
function searchItem() 
{
  var term=productSearchInput.value;
  var searchContent=` `;
  var searchItems=[];
  for (var i=0; i < productContainer.length; i++)
     {
    if (productContainer[i].EmployeeName.toLowerCase().includes(term.toLowerCase())) 
      {
      
    searchItems.push(productContainer[i]);
    }
    }
DisplayProduct(searchItems);
  }

function SetItems()
{
  localStorage.setItem('products',JSON.stringify(productContainer));

}
var upDateIndex;
function setFormForUpdate(i)
 {
  upDateIndex=i;
  addBtn.classList.add('d-none');
  SetUP.classList.remove('d-none');
  employeeMailInput.value = productContainer[upDateIndex].EmployeeEmail;
  employeeNameInput.value = productContainer[upDateIndex].EmployeeName;
  EmployeeIdInput.value =productContainer[upDateIndex].EmployeeID;
  employeeTeleInput.value =productContainer[upDateIndex].EmployeeTele;
   ProducCategoryInput.value =productContainer[upDateIndex].ProducCategory;
   ProducImageInput =productContainer[upDateIndex].ProducImage;

}
function updateProduct() 
{
  SetUP.classList.add('d-none');
  addBtn.classList.remove('d-none');
  productContainer[upDateIndex].EmployeeName= employeeNameInput.value ;
  productContainer[upDateIndex].EmployeeEmail= employeeMailInput.value ;
  productContainer[upDateIndex].EmployeeID=EmployeeIdInput.value;
  productContainer[upDateIndex].EmployeeTele=employeeTeleInput.value;
  productContainer[upDateIndex].ProducCategory=ProducCategoryInput.value;
  //productContainer[upDateIndex].ProducImage=ProducImageInput.files[0]?.name;
  clearForm();
  DisplayProduct(productContainer);
 SetItems();
}

function Validate(element)
{
  
  var regex={
    //EmployeeName:,
    EmployeeID:/^[0-9]{4,6}$/,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    EmployeeMail:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,3}$/,
    EmployeeTele:/^(\+20)[0-2,3]{1}[0-9]{9}$/,
    EmployeeName:/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
    
  }
  if (regex[element.id].test(element.value))
     {
      element.classList.remove('is-invalid');
      element.classList.add('is-valid');
console.log("match");
return true;
     }
else
{
  element.classList.add('is-invalid');
  element.classList.remove('is-valid');
  console.log("nomatch");
  return false;
}
}
var alert=document.getElementById("alert");
addBtn.addEventListener("click",function(e)
{
if(employeeNameInput.classList.contains('is-valid')&&employeeMailInput.classList.contains('is-valid')&&employeeTeleInput.classList.contains('is-valid')&&EmployeeIdInput.classList.contains('is-valid'))
  {
    alert.classList.add('d-none');

    GetProduct();
    employeeNameInput.classList.remove('is-valid');
    employeeMailInput.classList.remove('is-valid');
    employeeTeleInput.classList.remove('is-valid');
    EmployeeIdInput.classList.remove('is-valid');
clearForm();
  }
  else{
    alert.classList.remove('d-none');

  }
})

