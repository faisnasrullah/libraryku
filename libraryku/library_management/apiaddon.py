import frappe

@frappe.whitelist()
# http://localhost:8000/api/method/libraryku.library_management.apiaddon.ins_employee
def ins_employee(first_name, gender, date_of_birth, date_of_joining):
    employee = frappe.new_doc("Employee")
    employee.first_name = first_name
    employee.gender = gender
    employee.date_of_birth = date_of_birth
    employee.date_of_joining = date_of_joining
    employee.save()
    frappe.response["code"]= 200
    frappe.response["status"] = "Success Insert"
    frappe.response["data"] = employee