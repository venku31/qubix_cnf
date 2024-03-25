// frappe.ui.form.on('Delivery Note', {
// 	onload(frm) {
//      if(frm.doc.company=="Sanket Enterprises" ) {
// 		if(frm.doc.is_return){
//             frm.set_value("naming_series","DRET-.SE.-.YY.-");
//         }
//         else{
//             frm.set_value("naming_series","DN-.SE.-.YY.-");
//         }
// 		}
//         else if(frm.doc.company=="Gopal Enterprises"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.GE.-.YY.-");
// }
//         else{
//             frm.set_value("naming_series","DN-.GE.-.YY.-");
//         }
//     }
//     else if(frm.doc.company=="Kameswari Agencies"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.KA.-.YY.-");

//         }
//         else{
//             frm.set_value("naming_series","DN-.KA.-.YY.-");
//         }
//     }
//     else if(frm.doc.company=="Zeus Distributors"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.ZD.-.YY.-");

//         }
        
//         else{
//             frm.set_value("naming_series","DN-.ZD.-.YY.-");
//         }
//     }
//     else if(frm.doc.company=="Aptiv Medical"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.AM.-.YY.-");

//         }
//         else{
//             frm.set_value("naming_series","DN-.AM.-.YY.-");
//         }
//     } 
//     else	{		
         
//         }
//         }
// })



// frappe.ui.form.on('Delivery Note', {
// 	before_save(frm) {
//      if(frm.doc.company=="Sanket Enterprises" ) {
// 		if(frm.doc.is_return){
//             frm.set_value("naming_series","DRET-.SE.-.YY.-");
//         }
//         else{
//             frm.set_value("naming_series","DN-.SE.-.YY.-");
//         }
// 		}
//         else if(frm.doc.company=="Gopal Enterprises"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.GE.-.YY.-");
// }
//         else{
//             frm.set_value("naming_series","DN-.GE.-.YY.-");
//         }
//     }
//     else if(frm.doc.company=="Kameswari Agencies"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.KA.-.YY.-");

//         }
//         else{
//             frm.set_value("naming_series","DN-.KA.-.YY.-");
//         }
//     }
//     else if(frm.doc.company=="Zeus Distributors"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.ZD.-.YY.-");

//         }
//         else{
//             frm.set_value("naming_series","DN-.ZD.-.YY.-");
//         }
//     }
//     else if(frm.doc.company=="Aptiv Medical"){
//         if(frm.doc.is_return){
//         frm.set_value("naming_series","DRET-.AM.-.YY.-");

//         }
//         else{
//             frm.set_value("naming_series","DN-.AM.-.YY.-");
//         }
//     } 
//     else	{		
         
//         }
//         }
// })


frappe.ui.form.on('Delivery Note', {
	onload: function(frm) {
		frm.set_query('batch_no', 'items', function(doc, cdt, cdn) {
			var item = locals[cdt][cdn];
			if(!item.item_code) {
				frappe.throw(__("Please enter Item Code to get Batch Number"));
			} else {
				var filters = {
						'item_code': item.item_code
					}
				return {
					query : "erpnext.controllers.queries.get_batch_no",
					filters: filters
				}
			}
		});
	}
})


frappe.ui.form.on("Delivery Note", "onload", function(frm, cdt, cdn) {
        
    $.each(frm.doc.items || [], function(i, d) {
        if (d.is_free_item==1){
        d.discount_percentage=100;
        d.rate=0;
        d.amount=0;

    }
    });
    refresh_field("items");
     });

frappe.ui.form.on("Delivery Note", "validate", function(frm, cdt, cdn) {
        
        $.each(frm.doc.items || [], function(i, d) {
            if (d.is_free_item==1){
            d.discount_percentage=100;
            d.rate=0;
    
        }
        });
        refresh_field("items");
         });



        //  batch cust start


frappe.ui.form.on("Delivery Note", {
           
                setup: function(frm) {
                    if(frm.doc.custom_export != 1 || frm.doc.custom_type != "Tender"){
                       frm.add_fetch("batch_no", "mrp", "price_list_rate")
                    }
                    else{

                    }
                    }
                
            });
frappe.ui.form.on("Delivery Note", "onload", function(frm, cdt, cdn) {
                $.each(frm.doc.items || [], function(i, d) {
                if(d.custom_is_special_rate != 1 && frm.doc.custom_export != 1 && frm.doc.custom_type != "Tender" && d.custom_is_fixed_rate != 1){
                    d.discount_amount=0;
                 if (d.custom_is_free_item!=1 && (d.item_code == "QN 4242" || d.item_code == "QBL306U" || d.item_code == "QN 849" || d.item_code == "Q 810" || d.item_code == "QN 4259" || d.item_code == "QN 5087" || d.item_code == "SS35W5" || d.item_code == "SS35W" || d.item_code == "QS 2615/180" || d.item_code == "QBL315U" || d.item_code == "QN 2407" || d.item_code == "QN 2438" || d.item_code == "QNT 622"  || d.item_code == "Training Suturing Kit" || d.item_code == "QSG 025" || d.item_code == "SUTURING PAD" || d.item_code == "QBL316U" || d.item_code == "QLMC 151" || d.item_code == "QLM3DLL" || d.item_code == "QLM3DLR" || d.item_code == "QLMC 115")){
                  
                d.rate=Math.round(d.price_list_rate-(d.price_list_rate*d.discount_percentage/100));
		        }
               
                 else{
                d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
               }
            }else{
                
            }

              });
              refresh_field("items");
               });

frappe.ui.form.on("Delivery Note", "validate", function(frm, cdt, cdn) {
            $.each(frm.doc.items || [], function(i, d) {
             if(d.custom_is_special_rate != 1 && frm.doc.custom_export != 1 && frm.doc.custom_type != "Tender" && d.custom_is_fixed_rate != 1){
                    d.discount_amount=0;
                 if (d.custom_is_free_item!=1 && (d.item_code == "QN 4242" || d.item_code == "QN 849" || d.item_code == "QBL306U" || d.item_code == "QN 5087" || d.item_code == "Q 810" || d.item_code == "QN 4259" ||d.item_code == "SS35W5" || d.item_code == "SS35W" || d.item_code == "QS 2615/180" || d.item_code == "QBL315U" || d.item_code == "QN 2407" || d.item_code == "QN 2438" || d.item_code == "QNT 622"  || d.item_code == "Training Suturing Kit" || d.item_code == "QSG 025" || d.item_code == "SUTURING PAD" || d.item_code == "QBL316U" || d.item_code == "QLMC 151" || d.item_code == "QLM3DLL" || d.item_code == "QLM3DLR" || d.item_code == "QLMC 115")){
                  
                d.rate=Math.round(d.price_list_rate-(d.price_list_rate*d.discount_percentage/100));
		        }
               
                 else{
                d.rate=d.price_list_rate-(d.price_list_rate*d.discount_percentage/100);
               }
            }else{
                
            }
          });
          refresh_field("items");
           });  


// discount % calcutaion on fixed rates
           frappe.ui.form.on("Delivery Note", "validate", function(frm, cdt, cdn) {
            
            $.each(frm.doc.items || [], function(i, d) {
             if(frm.doc.custom_type=="Trade" && d.custom_is_fixed_rate==1){
                    d.discount_amount=0;
                    d.discount_percentage=((1 - (d.net_rate/d.price_list_rate))*100);
             
            }
            else if(frm.doc.custom_type=="Special" && d.custom_is_special_rate==1){
                d.discount_amount=0;
                d.discount_percentage=((1 - (d.net_rate/d.price_list_rate))*100);
            }
            else if(frm.doc.custom_type=="Export"){
                d.discount_amount=0;
                d.discount_percentage=((1 - (d.net_rate/d.price_list_rate))*100);
            }
            else if(frm.doc.custom_type=="Tender"){
                d.discount_amount=0;
                d.discount_percentage=((1 - (d.net_rate/d.price_list_rate))*100);
            }
            else{

            }
          });
          
          refresh_field("items");
           });





      

frappe.ui.form.on("Delivery Note", "before_submit", function(frm, cdt, cdn) {
    if(frm.doc.set_posting_time!=1){
        frappe.throw("You Cannot Submit Delivery Note without Selecting Edit Posting Date");
        frappe.validated = false; }
  
   });
