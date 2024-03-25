frappe.ui.form.on('Sales Order', {
	validate(frm) {
     if(frm.doc.company=="Sanket Enterprises" ) {
		  frm.set_value("naming_series","SO-.SE.-.YY.-");
        }
        else if(frm.doc.company=="Gopal Enterprises"){
            frm.set_value("naming_series","SO-.GE.-.YY.-");
    }
    else if(frm.doc.company=="Kameswari Agencies"){
        frm.set_value("naming_series","SO-.KA.-.YY.-");
    }
    else if(frm.doc.company=="Zeus Distributors"){
        frm.set_value("naming_series","SO-.ZD.-.YY.-");
    }
    else if(frm.doc.company=="Aptiv Medical"){
        frm.set_value("naming_series","SO-.AM.-.YY.-");
    }
    else if(frm.doc.company=="Advance Surgical"){
        frm.set_value("naming_series","SO-.AS.-.YY.-");
    } 
    else{		
         
        }
        }
})



frappe.ui.form.on("Sales Order", "validate", function(frm, cdt, cdn) {
    $.each(frm.doc.items || [], function(i, d) {
    if (d.rate>0.1){
        d.is_free_item=0;

    }
    });
    
});




frappe.ui.form.on("Sales Order Item", {
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
                        row.custom_st_av = res.message[0][0];
                        frm.refresh_field("items");
                    }
                }
    
            })
        }
    },
});

frappe.ui.form.on("Sales Order Item", {
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
						row.custom_item_code_status = "YES";
						frm.refresh_field("items");
					}else{
                        row.custom_item_code_status = "NO";
                        frm.refresh_field("items");
                    }
				}
	
			})
		}
    },
});

frappe.ui.form.on("Sales Order Item", {
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
                        row.custom_sales_group = res.message[0][0];
                        frm.refresh_field("items");
                    }
                }
    
            })
        }
    },
});

// fixed rate customisation

// frappe.ui.form.on("Sales Order", "onload", function(frm, cdt, cdn) {
//     if(frm.doc.custom_type=="Trade"){
// $.each(frm.doc.items || [], function(i, d) {
        
//       if(d.item_code=="QLM 0306")  {
//             d.rate=600;
//             if(d.item_code=="QLM 0306" && d.rate==600){
//                 // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                 d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                 d.is_fixed_rate=1;
//              }
        
//         }
         
//             else if(d.item_code=="QLM 611"){
//                 d.rate=2650;
                
//                 if(d.item_code=="QLM 611" && d.rate==2650){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 715"){
//                 d.rate=2875;
                
//                 if(d.item_code=="QLM 715" && d.rate==2875){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 115"){
//                 d.rate=1825;
                
//                 if(d.item_code=="QLM 115" && d.rate==1825){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1215"){
//                 d.rate=2200;
                
//                 if(d.item_code=="QLM 1215" && d.rate==2200){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 151"){
//                 d.rate=3300;
                
//                 if(d.item_code=="QLM 151" && d.rate==3300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 303"){
//                 d.rate=4100;
                
//                 if(d.item_code=="QLM 303" && d.rate==4100){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 611"){
//                 d.rate=2650;
                
//                 if(d.item_code=="QUM 611" && d.rate==2650){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 715"){
//                 d.rate=2875;
                
//                 if(d.item_code=="QUM 715" && d.rate==2875){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 115"){
//                 d.rate=1825;
                
//                 if(d.item_code=="QUM 115" && d.rate==1825){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 1218"){
//                 d.rate=2600;
                
//                 if(d.item_code=="QUM 1218" && d.rate==2600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QUM 151"){
//                 d.rate=3300;
                
//                 if(d.item_code=="QUM 151" && d.rate==3300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QUM 2025"){
//                 d.rate=4100;
                
//                 if(d.item_code=="QUM 2025" && d.rate==4100){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 611"){
//                 d.rate=3000;
                
//                 if(d.item_code=="QK 611" && d.rate==3000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QK 715"){
//                 d.rate=3100;
                
//                 if(d.item_code=="QK 715" && d.rate==3100){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QK 611N"){
//                 d.rate=2450;
                
//                 if(d.item_code=="QK 611N" && d.rate==2450){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715N"){
//                 d.rate=2450;
                
//                 if(d.item_code=="QK 715N" && d.rate==2450){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 611"){
//                 d.rate=3800;
                
//                 if(d.item_code=="QLMC 611" && d.rate==3800){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 9"){
//                 d.rate=6700;
                
//                 if(d.item_code=="QLMC 9" && d.rate==6700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 715"){
//                 d.rate=5600;
                
//                 if(d.item_code=="QLMC 715" && d.rate==5600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 115"){
//                 d.rate=7400;
                
//                 if(d.item_code=="QLMC 115" && d.rate==7400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 151"){
//                 d.rate=9500;
                
//                 if(d.item_code=="QLMC 151" && d.rate==9500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 15"){
//                 d.rate=9500;
                
//                 if(d.item_code=="QLMC 15" && d.rate==9500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
            
//             else if(d.item_code=="QLMC 1520"){
//                 d.rate=11300;
                
//                 if(d.item_code=="QLMC 1520" && d.rate==11300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 303"){
//                 d.rate=18000;
                
//                 if(d.item_code=="QLMC 303" && d.rate==18000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 12"){
//                 d.rate=7400;
                
//                 if(d.item_code=="QLMC 12" && d.rate==7400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLM3DLR"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QLM3DLR" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLM3DLL"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QLM3DLL" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1218"){
//                 d.rate=2600;
                
//                 if(d.item_code=="QLM 1218" && d.rate==2600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1520"){
//                 d.rate=4125;
                
//                 if(d.item_code=="QLM 1520" && d.rate==4125){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1520"){
//                 d.rate=4125;
                
//                 if(d.item_code=="QLM 1520" && d.rate==4125){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 20"){
//                 d.rate=13500;
                
//                 if(d.item_code=="QLMC 20" && d.rate==13500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QK 715NG"){
//                 d.rate=2470;
                
//                 if(d.item_code=="QK 715NG" && d.rate==2470){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715NS"){
//                 d.rate=3600;
                
//                 if(d.item_code=="QK 715NS" && d.rate==3600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QNT 622"){
//                 d.rate=500;
                
//                 if(d.item_code=="QNT 622" && d.rate==500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL316U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL316U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL315U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL315U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL326U"){
//                 d.rate=3750;
                
//                 if(d.item_code=="QBL326U" && d.rate==3750){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }


//             else if(d.item_code=="QBL325U"){
//                 d.rate=3750;
                
//                 if(d.item_code=="QBL325U" && d.rate==3750){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL306U"){
//                 d.rate=2400;
                
//                 if(d.item_code=="QBL306U" && d.rate==2400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL305U"){
//                 d.rate=2400;
                
//                 if(d.item_code=="QBL305U" && d.rate==2400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL804U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL804U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL814U"){
//                 d.rate=3000;
                
//                 if(d.item_code=="QBL814U" && d.rate==3000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL824U"){
//                 d.rate=4050;
                
//                 if(d.item_code=="QBL824U" && d.rate==4050){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715NR"){
//                 d.rate=2450;
                
//                 if(d.item_code=="QK 715NR" && d.rate==2450){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="NG 715"){
//                 d.rate=2250;
                
//                 if(d.item_code=="NG 715" && d.rate==2250){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715RJ"){
//                 d.rate=3600;
                
//                 if(d.item_code=="QK 715RJ" && d.rate==3600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QLMC 12-8"){
//                 d.rate=7400;
                
//                 if(d.item_code=="QLMC 12-8" && d.rate==7400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 15-8"){
//                 d.rate=9500;
                
//                 if(d.item_code=="QLMC 15-8" && d.rate==9500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 15"){
//                 d.rate=3300;
                
//                 if(d.item_code=="QLM 15" && d.rate==3300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QTM3DXLR"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QTM3DXLR" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QTM3DXLL"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QTM3DXLL" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7004PE"){
//                 d.rate=9000;
                
//                 if(d.item_code=="QN7004PE" && d.rate==9000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7003PE"){
//                 d.rate=6000;
                
//                 if(d.item_code=="QN7003PE" && d.rate==6000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL2115U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL2115U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL327U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL327U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7007PE"){
//                 d.rate=10800;
                
//                 if(d.item_code=="QN7007PE" && d.rate==10800){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

            
            
//             else if(d.item_code=="QN7006PE"){
//                 d.rate=7200;
                
//                 if(d.item_code=="QN7006PE" && d.rate==7200){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7001PE"){
//                 d.rate=4800;
                
//                 if(d.item_code=="QN7001PE" && d.rate==4800){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7002PE"){
//                 d.rate=7200;
                
//                 if(d.item_code=="QN7002PE" && d.rate==7200){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }






//             else{

                
//             }

       
//     });
// }
// else{

// }
// refresh_field("items");
// });

// frappe.ui.form.on("Sales Order", "validate", function(frm, cdt, cdn) {
//     if(frm.doc.custom_type=="Trade"){
// $.each(frm.doc.items || [], function(i, d) {
        
//       if(d.item_code=="QLM 0306")  {
//             d.rate=600;
//             if(d.item_code=="QLM 0306" && d.rate==600){
//                 // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                 d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                 d.is_fixed_rate=1;
//              }
        
//         }
//          else if(d.item_code=="QLM 611"){
//                 d.rate=2650;
                
//                 if(d.item_code=="QLM 611" && d.rate==2650){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 715"){
//                 d.rate=2875;
                
//                 if(d.item_code=="QLM 715" && d.rate==2875){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 115"){
//                 d.rate=1825;
                
//                 if(d.item_code=="QLM 115" && d.rate==1825){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1215"){
//                 d.rate=2200;
                
//                 if(d.item_code=="QLM 1215" && d.rate==2200){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 151"){
//                 d.rate=3300;
                
//                 if(d.item_code=="QLM 151" && d.rate==3300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 303"){
//                 d.rate=4100;
                
//                 if(d.item_code=="QLM 303" && d.rate==4100){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 611"){
//                 d.rate=2650;
                
//                 if(d.item_code=="QUM 611" && d.rate==2650){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 715"){
//                 d.rate=2875;
                
//                 if(d.item_code=="QUM 715" && d.rate==2875){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 115"){
//                 d.rate=1825;
                
//                 if(d.item_code=="QUM 115" && d.rate==1825){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 1218"){
//                 d.rate=2600;
                
//                 if(d.item_code=="QUM 1218" && d.rate==2600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QUM 151"){
//                 d.rate=3300;
                
//                 if(d.item_code=="QUM 151" && d.rate==3300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QUM 2025"){
//                 d.rate=4100;
                
//                 if(d.item_code=="QUM 2025" && d.rate==4100){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 611"){
//                 d.rate=3000;
                
//                 if(d.item_code=="QK 611" && d.rate==3000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715"){
//                 d.rate=3100;
                
//                 if(d.item_code=="QK 715" && d.rate==3100){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                    

//             }else if(d.item_code=="QK 611N"){
//                 d.rate=2450;
                
//                 if(d.item_code=="QK 611N" && d.rate==2450){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715N"){
//                 d.rate=2450;
                
//                 if(d.item_code=="QK 715N" && d.rate==2450){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 611"){
//                 d.rate=3800;
                
//                 if(d.item_code=="QLMC 611" && d.rate==3800){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 9"){
//                 d.rate=6700;
                
//                 if(d.item_code=="QLMC 9" && d.rate==6700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 715"){
//                 d.rate=5600;
                
//                 if(d.item_code=="QLMC 715" && d.rate==5600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 115"){
//                 d.rate=7400;
                
//                 if(d.item_code=="QLMC 115" && d.rate==7400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 151"){
//                 d.rate=9500;
                
//                 if(d.item_code=="QLMC 151" && d.rate==9500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 15"){
//                 d.rate=9500;
                
//                 if(d.item_code=="QLMC 15" && d.rate==9500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
            
//             else if(d.item_code=="QLMC 1520"){
//                 d.rate=11300;
                
//                 if(d.item_code=="QLMC 1520" && d.rate==11300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 303"){
//                 d.rate=18000;
                
//                 if(d.item_code=="QLMC 303" && d.rate==18000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 12"){
//                 d.rate=7400;
                
//                 if(d.item_code=="QLMC 12" && d.rate==7400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLM3DLR"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QLM3DLR" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLM3DLL"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QLM3DLL" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1218"){
//                 d.rate=2600;
                
//                 if(d.item_code=="QLM 1218" && d.rate==2600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1520"){
//                 d.rate=4125;
                
//                 if(d.item_code=="QLM 1520" && d.rate==4125){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLM 1520"){
//                 d.rate=4125;
                
//                 if(d.item_code=="QLM 1520" && d.rate==4125){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QLMC 20"){
//                 d.rate=13500;
                
//                 if(d.item_code=="QLMC 20" && d.rate==13500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QK 715NG"){
//                 d.rate=2470;
                
//                 if(d.item_code=="QK 715NG" && d.rate==2470){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715NS"){
//                 d.rate=3600;
                
//                 if(d.item_code=="QK 715NS" && d.rate==3600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QNT 622"){
//                 d.rate=500;
                
//                 if(d.item_code=="QNT 622" && d.rate==500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL316U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL316U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL315U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL315U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL326U"){
//                 d.rate=3750;
                
//                 if(d.item_code=="QBL326U" && d.rate==3750){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }


//             else if(d.item_code=="QBL325U"){
//                 d.rate=3750;
                
//                 if(d.item_code=="QBL325U" && d.rate==3750){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL306U"){
//                 d.rate=2400;
                
//                 if(d.item_code=="QBL306U" && d.rate==2400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL305U"){
//                 d.rate=2400;
                
//                 if(d.item_code=="QBL305U" && d.rate==2400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL804U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL804U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL814U"){
//                 d.rate=3000;
                
//                 if(d.item_code=="QBL814U" && d.rate==3000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QBL824U"){
//                 d.rate=4050;
                
//                 if(d.item_code=="QBL824U" && d.rate==4050){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715NR"){
//                 d.rate=2450;
                
//                 if(d.item_code=="QK 715NR" && d.rate==2450){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="NG 715"){
//                 d.rate=2250;
                
//                 if(d.item_code=="NG 715" && d.rate==2250){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QK 715RJ"){
//                 d.rate=3600;
                
//                 if(d.item_code=="QK 715RJ" && d.rate==3600){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QLMC 12-8"){
//                 d.rate=7400;
                
//                 if(d.item_code=="QLMC 12-8" && d.rate==7400){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QLMC 15-8"){
//                 d.rate=9500;
                
//                 if(d.item_code=="QLMC 15-8" && d.rate==9500){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }

//             else if(d.item_code=="QLMC 15"){
//                 d.rate=3300;
                
//                 if(d.item_code=="QLM 15" && d.rate==3300){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QTM3DXLR"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QTM3DXLR" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }else if(d.item_code=="QTM3DXLL"){
//                 d.rate=4000;
                
//                 if(d.item_code=="QTM3DXLL" && d.rate==4000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7004PE"){
//                 d.rate=9000;
                
//                 if(d.item_code=="QN7004PE" && d.rate==9000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7003PE"){
//                 d.rate=6000;
                
//                 if(d.item_code=="QN7003PE" && d.rate==6000){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL2115U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL2115U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QBL327U"){
//                 d.rate=2700;
                
//                 if(d.item_code=="QBL327U" && d.rate==2700){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7007PE"){
//                 d.rate=10800;
                
//                 if(d.item_code=="QN7007PE" && d.rate==10800){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
           
            
//             else if(d.item_code=="QN7006PE"){
//                 d.rate=7200;
                
//                 if(d.item_code=="QN7006PE" && d.rate==7200){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7001PE"){
//                 d.rate=4800;
                
//                 if(d.item_code=="QN7001PE" && d.rate==4800){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }
//             else if(d.item_code=="QN7002PE"){
//                 d.rate=7200;
                
//                 if(d.item_code=="QN7002PE" && d.rate==7200){
//                     // d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
//                     d.discount_percentage=(((d.price_list_rate-d.rate)/d.price_list_rate*100));
//                     d.is_fixed_rate=1;    
//                 }                      

//             }


//             else{

                
//             }

       
//     });
// }
// else{

// }
// refresh_field("items");
// });

// fixed rate customisation end
