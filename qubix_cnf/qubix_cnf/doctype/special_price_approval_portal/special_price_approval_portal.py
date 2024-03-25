# Copyright (c) 2023, Shivansh and contributors
# For license information, please see license.txt

import frappe,json
from frappe.model.document import Document
from frappe.contacts.doctype.address.address import get_address_display
from erpnext.controllers.accounts_controller import get_taxes_and_charges
from frappe import _
from datetime import date,datetime
from datetime import timedelta
from dateutil.relativedelta import relativedelta, MO
from frappe.utils import (
	add_days,
	add_months,
	cint,
	date_diff,
	flt,
	get_first_day,
	get_last_day,
	get_link_to_form,
	getdate,
	rounded,
	today,
)

class SpecialPriceApprovalPortal(Document):
    pass
            




@frappe.whitelist()
def get_item_group(item_code):
	values = {'item_code': item_code}
	item_group= frappe.db.sql("""
		select
		    `tabItem`.item_group
		from
		    `tabItem`
	
	    where
			`tabItem`.item_code = %(item_code)s
	
		""", values=values, as_dict=False)
	
	return item_group or 0



@frappe.whitelist()
def make_sales_order(frm):
    val = json.loads(frm)
    if val["company"]:
        doc = frappe.new_doc("Sales Order")
        doc.customer = val["customer"]
        doc.customer_name = val["customer_name"]
        doc.company = val["company"]
        doc.selling_price_list = val["price_list"]
        doc.set_warehouse = val["set_warehouse"]
        doc.custom_special_price_order_no= val["name"]
        doc.custom_payment_type = val["payment_type"]
        doc.custom_type = val["type"]
        doc.custom_cash_discount = val["cash_discount"]
        doc.custom_sales_person = val["bde_sp"]
        for row in val["spap_item_details"]:
            doc.append("items",{'item_code':row['item_code'],
                                'item_name':row['item_code'],
                                'price_list_rate':row['mrp'],
                                'base_price_list_rate':row['mrp'],
                                'description':row['description'],
                                'uom':row['uom'],
                                'custom_is_fixed_rate':row['is_fixed_rate'],
                                'custom_is_special_rate':row['is_special_rate'],
                                'sales_group':row['sales_group'],
                                'item_group':row['item_group'],
                                'parent_item_group':row['parent_item_group'],
                                'st_av':row['st_av'],
                                'item_code_status':row['item_code_status'],
                                'discount_percentage':row['overall_discount'],
                                'is_special_rate':row['is_special_rate'],
                                'rate':row['stockist_rate'],
                                'base_rate':row['stockist_rate'],
                                'amount':row['value'],
                                'qty': 1 * row['qty']                     
                            })
            
        for row in val["taxes"]:
            doc.append("taxes",{'charge_type':row['charge_type'],
                                'account_head':row['account_head'],
                                'description':row['description'],
                                'cost_center':row['cost_center']            
                            })
        doc.save()
        frappe.msgprint("Automatic Sales Order has been Created")
        return doc