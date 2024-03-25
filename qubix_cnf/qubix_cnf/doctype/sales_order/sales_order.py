from __future__ import unicode_literals
import frappe
from datetime import datetime
import json
import frappe.utils
from frappe.utils import cstr, flt, getdate, cint, nowdate, add_days, get_link_to_form, strip_html
from frappe import _
from six import string_types
from frappe.model.utils import get_fetch_values
from frappe.model.mapper import get_mapped_doc
from erpnext.stock.stock_balance import update_bin_qty, get_reserved_qty
from frappe.desk.notifications import clear_doctype_notifications
from frappe.contacts.doctype.address.address import get_company_address
from erpnext.controllers.selling_controller import SellingController
from erpnext.selling.doctype.customer.customer import check_credit_limit
from erpnext.stock.doctype.item.item import get_item_defaults
from erpnext.setup.doctype.item_group.item_group import get_item_group_defaults
from erpnext.manufacturing.doctype.production_plan.production_plan import get_items_for_material_requests
from erpnext.accounts.doctype.sales_invoice.sales_invoice import validate_inter_company_party, update_linked_doc,\
	unlink_inter_company_doc



@frappe.whitelist()
def get_item_av(item_code,warehouse):
	values = {'item_code': item_code,"warehouse":warehouse}
	st_av= frappe.db.sql("""
		select sum(actual_qty) from tabBin where warehouse= %(warehouse)s and item_code= %(item_code)s
		""", values=values, as_dict=False)
	
	return st_av or 0



@frappe.whitelist()
def get_sales_group(item_code):
	values = {'item_code': item_code}
	sales_group= frappe.db.sql("""
		select
		    `tabItem`.custom_sales_group
		from
		    `tabItem`
	
	    where
			
	        `tabItem`.item_code = %(item_code)s
	
		""", values=values, as_dict=False)
	
	return sales_group or 0