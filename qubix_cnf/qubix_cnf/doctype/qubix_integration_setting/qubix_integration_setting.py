# Copyright (c) 2024, Qubix  and contributors
# For license information, please see license.txt

import frappe
from qubix_cnf.qubix_cnf.doctype.qubix_integration_setting.frappeclient import FrappeClient
from frappe.model.document import Document
import json
from frappe import _
from urllib.parse import urljoin

class QubixIntegrationSetting(Document):
	pass

@frappe.whitelist()
def sync_master(self, method):
    integrate_doc = frappe.get_doc('Qubix Integration Setting','Qubix Integration Setting') 
    api_key = frappe.db.get_single_value('Qubix Integration Setting','api_key')
    api_secret = frappe.db.get_single_value('Qubix Integration Setting','api_secret')
    url = frappe.db.get_single_value('Qubix Integration Setting','url')
    clientroot = FrappeClient(url)
    clientroot.authenticate(api_key,api_secret)
    docu_tujuan = clientroot.get_value(self.doctype, "name", {"name":self.name})
    doc = frappe.get_doc(self.doctype, self.name)
    

    if doc.get("docstatus") == 1:
        return

    if doc.get("amended_from"):
        return

    kolom_parent = frappe.db.sql(""" SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='tab{}' """.format(self.doctype))

    kolom_child = frappe.db.sql(""" SELECT td.fieldname, td.options
        FROM `tabDocField` td
        WHERE parent = "{}" AND fieldtype = "Table" AND td.fieldname !="item_defaults" AND td.fieldname !="Accounts"
        GROUP BY td.`fieldname`
        ORDER BY OPTIONS;
         """.format(self.doctype))
    
    kolom_table = frappe.db.sql("""SELECT td.fieldname, ic.COLUMN_NAME, ic.DATA_TYPE  FROM `tabDocField` td 
        JOIN INFORMATION_SCHEMA.COLUMNS ic ON CONCAT("tab",td.`options`) = ic.`TABLE_NAME`
        WHERE parent = "{}" AND fieldtype = "Table"
        ORDER BY OPTIONS """.format(self.doctype))
    

    pr_doc = {}

    # for temp_baris_item in self.get("uoms") :
    # 	tampungan = temp_baris_item.get("uom")
    # 	frappe.throw(str(tampungan))
    
    for rowkolom in kolom_parent:
        if str(rowkolom[0]) != "docstatus" and str(rowkolom[0]) != "valuation_method":
            if str(doc.get(str(rowkolom[0]))) != "None" :
                if str(rowkolom[1]) == "date" or str(rowkolom[1]) == "datetime" or str(rowkolom[1]) == "time" :
                    if not docu_tujuan:
                        pr_doc.update({ (rowkolom[0]) : str(doc.get(str(rowkolom[0]))) })
                    elif str(rowkolom[0]) != "creation" and str(rowkolom[0]) != "modified":
                        pr_doc.update({ (rowkolom[0]) : str(doc.get(str(rowkolom[0]))) })

                else:
                    pr_doc.update({ (rowkolom[0]) : (doc.get(str(rowkolom[0]))) })

    for rowkolom in kolom_child:
        if self.get(rowkolom[0]):
            pr_doc_items = []
            for rowtable in self.get(rowkolom[0]):
                pr_doc_child = {}
                # frappe.throw(str(rowtable.get("uom")))
                for rowbaris in kolom_table:

                    if rowbaris[0] == rowkolom[0]:
                        if str(rowbaris[1]) != "docstatus" and str(rowbaris[1]) != "name":
                            if str(rowtable.get(str(rowbaris[1]))) != "None" :
                                if str(rowbaris[2]) == "date" or str(rowbaris[2]) == "datetime" or str(rowbaris[2]) == "time" :
                                    if not docu_tujuan:
                                        pr_doc_child.update({ rowbaris[1] : str(rowtable.get(str(rowbaris[1]))) })
                                    elif str(rowbaris[1]) != "creation" and str(rowbaris[1]) != "modified":
                                        pr_doc_child.update({ rowbaris[1] : str(rowtable.get(str(rowbaris[1]))) })
                                else:
                                    pr_doc_child.update({ rowbaris[1] : (rowtable.get(str(rowbaris[1]))) })
                pr_doc_items.append(pr_doc_child)					
            # frappe.throw(str(pr_doc_items))
            pr_doc.update({ rowkolom[0]: pr_doc_items })
    
    pr_doc.update({ "doctype": doc.doctype })
        
    docu_tujuan = clientroot.get_value(self.doctype, "name", {"name":self.name})
    if docu_tujuan:
        clientroot.update(pr_doc)
    else:
        clientroot.ignore_permissions=True
        clientroot.ignore_mandatory=True
        clientroot.insert(pr_doc)

@frappe.whitelist()
def sync_customer_master(self, method):
    integrate_doc = frappe.get_doc('Qubix Integration Setting','Qubix Integration Setting') 
    api_key = frappe.db.get_single_value('Qubix Integration Setting','api_key')
    api_secret = frappe.db.get_single_value('Qubix Integration Setting','api_secret')
    url = frappe.db.get_single_value('Qubix Integration Setting','url')
    clientroot = FrappeClient(url)
    clientroot.authenticate(api_key,api_secret)
    docu_tujuan = clientroot.get_value(self.doctype, "name", {"name":self.name})
    doc = frappe.get_doc(self.doctype, self.name)
    

    if doc.get("docstatus") == 1:
        return

    if doc.get("amended_from"):
        return
    is_sync = frappe.db.get_value('Customer Group',{"name":doc.get("customer_group")},'is_synch')
    if self.is_sync == 1:
        kolom_parent = frappe.db.sql(""" SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='tab{}' """.format(self.doctype))

        kolom_child = frappe.db.sql(""" SELECT td.fieldname, td.options
        FROM `tabDocField` td
        WHERE parent = "{}" AND fieldtype = "Table" AND td.fieldname !="item_defaults" AND td.fieldname !="Accounts"
        GROUP BY td.`fieldname`
        ORDER BY OPTIONS;
         """.format(self.doctype))
    
        kolom_table = frappe.db.sql("""SELECT td.fieldname, ic.COLUMN_NAME, ic.DATA_TYPE  FROM `tabDocField` td 
        JOIN INFORMATION_SCHEMA.COLUMNS ic ON CONCAT("tab",td.`options`) = ic.`TABLE_NAME`
        WHERE parent = "{}" AND fieldtype = "Table"
        ORDER BY OPTIONS """.format(self.doctype))
    

        pr_doc = {}

        # for temp_baris_item in self.get("uoms") :
        # 	tampungan = temp_baris_item.get("uom")
        # 	frappe.throw(str(tampungan))
    
        for rowkolom in kolom_parent:
            if str(rowkolom[0]) != "docstatus" and str(rowkolom[0]) != "valuation_method":
                if str(doc.get(str(rowkolom[0]))) != "None" :
                    if str(rowkolom[1]) == "date" or str(rowkolom[1]) == "datetime" or str(rowkolom[1]) == "time" :
                        if not docu_tujuan:
                            pr_doc.update({ (rowkolom[0]) : str(doc.get(str(rowkolom[0]))) })
                        elif str(rowkolom[0]) != "creation" and str(rowkolom[0]) != "modified":
                            pr_doc.update({ (rowkolom[0]) : str(doc.get(str(rowkolom[0]))) })

                    else:
                        pr_doc.update({ (rowkolom[0]) : (doc.get(str(rowkolom[0]))) })

        for rowkolom in kolom_child:
            if self.get(rowkolom[0]):
                pr_doc_items = []
                for rowtable in self.get(rowkolom[0]):
                    pr_doc_child = {}
                    # frappe.throw(str(rowtable.get("uom")))
                    for rowbaris in kolom_table:

                        if rowbaris[0] == rowkolom[0]:
                            if str(rowbaris[1]) != "docstatus" and str(rowbaris[1]) != "name":
                                if str(rowtable.get(str(rowbaris[1]))) != "None" :
                                    if str(rowbaris[2]) == "date" or str(rowbaris[2]) == "datetime" or str(rowbaris[2]) == "time" :
                                        if not docu_tujuan:
                                            pr_doc_child.update({ rowbaris[1] : str(rowtable.get(str(rowbaris[1]))) })
                                        elif str(rowbaris[1]) != "creation" and str(rowbaris[1]) != "modified":
                                            pr_doc_child.update({ rowbaris[1] : str(rowtable.get(str(rowbaris[1]))) })
                                    else:
                                        pr_doc_child.update({ rowbaris[1] : (rowtable.get(str(rowbaris[1]))) })
                    pr_doc_items.append(pr_doc_child)					
                # frappe.throw(str(pr_doc_items))
                pr_doc.update({ rowkolom[0]: pr_doc_items })
        
        pr_doc.update({ "doctype": doc.doctype })
            
        docu_tujuan = clientroot.get_value(self.doctype, "name", {"name":self.name})
        if docu_tujuan:
            clientroot.update(pr_doc)
        else:
            clientroot.ignore_permissions=True
            clientroot.ignore_mandatory=True
            clientroot.insert(pr_doc)
