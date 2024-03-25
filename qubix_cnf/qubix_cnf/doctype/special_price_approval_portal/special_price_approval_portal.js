// Copyright (c) 2023, Shivansh and contributors
// For license information, please see license.txt

frappe.ui.form.on('Special Price Approval Portal', {
	// refresh: function(frm) {

	// }
});


frappe.ui.form.on("Special Price Approval Portal", {
	setup: function(frm) {
		frm.set_query("hospital", function() {
			return {
				filters: [
					["Lead","custom_bde", "=", frm.doc.bde_sp]
				]
			};
		});
	}
});


frappe.ui.form.on('SPAP Item Details', {
    item_code: function(frm,cdt,cdn) {
            const d=locals[cdt][cdn]
            frappe.db.get_value("Item Price",{"item_code":d.item_code,'price_list':frm.doc.price_list,'selling': 1,
			'valid_from': ['<=', frm.doc.date], 
			'valid_upto': ['>=', frm.doc.date]},'price_list_rate', (r) => {
                if (r.price_list_rate) {
                    frappe.model.set_value(cdt,cdn,"mrp",r.price_list_rate);
                    frappe.model.set_value(cdt,cdn,"qty","1");
                    frappe.model.set_value(cdt,cdn,"stockist_rate",r.price_list_rate);
                    frappe.model.set_value(cdt,cdn,"value",r.price_list_rate);

                    
                }
            });
        },

        qty: function(frm,cdt,cdn) {
            const d=locals[cdt][cdn]
            frappe.model.set_value(cdt,cdn,"value",d.stockist_rate*d.qty);
        },
        hospital_rate: function(frm,cdt,cdn){
            const d=locals[cdt][cdn]
            frappe.model.set_value(cdt,cdn,"stockist_rate",d.hospital_rate);
            frappe.model.set_value(cdt,cdn,"value",d.hospital_rate*d.qty);
            frappe.model.set_value(cdt,cdn,"is_special_rate","1");
            
            
           
        },
        stockist_margin: function(frm,cdt,cdn){
            const d=locals[cdt][cdn]
            if(frm.doc.type=="Special"){
            frappe.model.set_value(cdt,cdn,"stockist_rate",(d.hospital_rate - (d.hospital_rate * d.stockist_margin/100 )));
            frappe.model.set_value(cdt,cdn,"overall_discount",((1 - (d.stockist_rate/d.mrp))*100));
            frappe.model.set_value(cdt,cdn,"value",(d.hospital_rate - (d.hospital_rate * d.stockist_margin/100 )));
            }
            else if(frm.doc.type=="Trade"){
                frappe.model.set_value(cdt,cdn,"stockist_rate",(d.mrp - (d.mrp * d.stockist_margin/100 )));
                frappe.model.set_value(cdt,cdn,"overall_discount",((1 - ((d.mrp - (d.mrp * d.stockist_margin/100 ))/d.mrp))*100));
                frappe.model.set_value(cdt,cdn,"value",(d.mrp - (d.mrp * d.stockist_margin/100 )));

            }
            else{

                
            }
        },
        stockist_rate: function(frm,cdt,cdn){
            const d=locals[cdt][cdn]
            if(frm.doc.type=="Trade"){
            // frappe.model.set_value(cdt,cdn,"stockist_rate",(d.hospital_rate - (d.hospital_rate * d.stockist_margin/100 )));
            frappe.model.set_value(cdt,cdn,"overall_discount",((1 - (d.stockist_rate/d.mrp))*100));
            frappe.model.set_value(cdt,cdn,"value",(d.stockist_rate));
    
   
        }
            else{

                
            }
        },
        hospital_discount: function(frm,cdt,cdn){
            const d=locals[cdt][cdn]
            frappe.model.set_value(cdt,cdn,"hospital_rate",(d.mrp - (d.mrp * d.hospital_discount/100)));
        }

    });


	frappe.ui.form.on("Special Price Approval Portal", "validate", function (frm, cdt, cdn) {
        var total = 0;
        var atotal =0;
        
        $.each(frm.doc.spap_item_details || [], function (i, d) {
            total += flt(d.value);
            atotal += flt(d.qty);
            
        });
        frm.set_value("total_amount", total);
        frm.set_value("total_qty", atotal);
         
    });


	
    frappe.ui.form.on('Special Price Approval Portal', {
        refresh: function(frm) {
                if(frm.doc.workflow_state=="Approved By HO"){
                       frm.add_custom_button(__('Make Sales Order'),()=>{
                                frm.events.make_sales_order(frm);
                       });
                }
                else{
                    
                }
                
            
            },
             make_sales_order:function(frm){
            return frappe.call({
                     method:"qubix_cnf.qubix_cnf.doctype.special_price_approval_portal.special_price_approval_portal.make_sales_order",
                    args: {
                            frm:frm.doc
                    },
            callback: function (r)
            {
                  var doc = frappe.model.sync(r.message);
                  frappe.set_route("Form", doc[0].doctype, doc[0].name);
            },
            });
    },
    });


    frappe.ui.form.on("SPAP Item Details", {
        item_code(frm, cdt, cdn) {
            let row = frappe.get_doc(cdt, cdn);
            if(row.item_code){
                frappe.call({
                    "method":"qubix_cnf.qubix_cnf.doctype.special_price_approval_portal.special_price_approval_portal.get_item_group",
                    "args":{
                        "item_code":row.item_code
                    },
                    callback:function(res){
                        console.log(res.message[0][0])
                        if(res.message){
                            row.item_group = res.message[0][0];
                            frm.refresh_field("spap_item_details");
                        }
                    }
        
                })
            }
        },
    });


    frappe.ui.form.on("SPAP Item Details", {
        item_code(frm, cdt, cdn) {
            let row = frappe.get_doc(cdt, cdn);
            if(row.item_code){
                frappe.call({
                    "method":"qubix_cnf.qubix_cnf.doctype.sales_order.sales_order.get_sales_group",
                    "args":{
                        "item_code":row.item_code
                    },
                    callback:function(res){
                        console.log(res.message[0][0])
                        if(res.message){
                            row.sales_group = res.message[0][0];
                            frm.refresh_field("spap_item_details");
                        }
                    }
        
                })
            }
        },
    });

    frappe.ui.form.on("SPAP Item Details", {
        item_code(frm, cdt, cdn) {
            let row = frappe.get_doc(cdt, cdn);
            if(row.item_code){
                frappe.call({
                    "method":"qubix_cnf.qubix_cnf.doctype.sales_order.sales_order.get_item_av",
                    "args":{
                        "item_code":row.item_code,
                        "warehouse":row.warehouse
                    },
                    callback:function(res){
                        console.log(res.message[0][0])
                        if(res.message){
                            row.st_av = res.message[0][0];
                            frm.refresh_field("spap_item_details");
                        }
                    }
        
                })
            }
        },
    });
    


    frappe.ui.form.on("SPAP Item Details", {
        item_code(frm, cdt, cdn) {
            let row = frappe.get_doc(cdt, cdn);
            if(row.item_code){
                frappe.call({
                    "method":"qubix_cnf.qubix_cnf.doctype.sales_order.sales_order.get_item_av",
                    "args":{
                        "item_code":row.item_code,
                        "warehouse":row.warehouse
                    },
                    callback:function(res){
                        console.log(res.message[0][0])
                        if(res.message>0){
                            row.item_code_status = "YES";
                            frm.refresh_field("items");
                        }else{
                            row.item_code_status = "NO";
                            frm.refresh_field("items");
                        }
                    }
        
                })
            }
        },
    });


    frappe.ui.form.on("Special Price Approval Portal", {
        setup: function(frm) {
            frm.set_query("sales_taxes_and_charges_template", function() {
                return {
                    filters: [
                        ["Sales Taxes and Charges Template","company", "=", frm.doc.company]
                    ]
                };
            });
        }
    });





    // frappe.ui.form.on('Special Price Approval Portal', {
    //     validate(frm) {
    //      if(frm.doc.company = "Zeus Distributors" && frm.doc.state == "Rajasthan") {
            
    //         frm.set_value("sales_taxes_and_charges_template","In-State GST(Sales) - ZD");    
            
    //     }
    
    //     else{		
    //         frm.set_value("sales_taxes_and_charges_template","Out-State GST(Sales) - ZD");     
                
    //         }
    //         }
    // })
    
 

    frappe.ui.form.on("Special Price Approval Portal", "validate", function(frm) { 
	
		frm.doc.hospitals_name = frm.doc.hospital_name + " - " + frm.doc.territory + " - " + frm.doc.old_lead_id; 
		
	});



// frappe.ui.form.on('Special Price Approval Portal', {
//         validate(frm) {
//          if(frm.doc.company == "Sanket Enterprises") {
//             if(frm.doc.state != "Maharashtra"){
//                 frm.set_value("sales_taxes_and_charges_template","Out-State GST(Sales) - SE");
//             }
//             else{
//                 frm.set_value("sales_taxes_and_charges_template","In-State GST(Sales) - SE");
//             }
//             }
    
//         else if(frm.doc.company=="Gopal Enterprises"){
//             if(frm.doc.state != "Uttar Pradesh"){
//             frm.set_value("sales_taxes_and_charges_template","Output GST Out-state - GE");
    
//             }
//             else{
//                 frm.set_value("sales_taxes_and_charges_template","In-State GST(Sales) - GE");
//             }
//         }
        
//         else	{		
             
//             }
//             }
//     })
    








    
frappe.ui.form.on("Special Price Approval Portal", {
        get_taxes: function(frm){
    if(frm.doc.sales_taxes_and_charges_template=="Out-State GST(Sales) - ZD"){
       for (let i = 0; i < 1; i++) {
             
             var a = frappe.model.add_child(cur_frm.doc, "Special Price Approval Portal", "taxes");
             a.charge_type = "On Net Total";
             a.account_head = "Output Tax IGST - ZD";
             a.description = "Output Tax IGST";
             a.cost_center = "Main - ZD";
    
          refresh_field("taxes");
        
            }
          }
          else if(frm.doc.sales_taxes_and_charges_template=="In-State GST(Sales) - ZD"){
           for (let i = 0; i < 1; i++) {
             
              var a = frappe.model.add_child(cur_frm.doc, "Special Price Approval Portal", "taxes");
              a.charge_type = "On Net Total";
              a.account_head = "Output Tax CGST - ZD";
              a.description = "Output Tax CGST";
              a.cost_center = "Main - ZD";
     
              var b = frappe.model.add_child(cur_frm.doc, "Special Price Approval Portal", "taxes");
              b.charge_type = "On Net Total";
              b.account_head = "Output Tax SGST - ZD";
              b.description = "Output Tax SGST";
              b.cost_center = "Main - ZD";
       
           refresh_field("taxes");
           
             }
           
           }
          
          else{
             
          }
     
       }
         });