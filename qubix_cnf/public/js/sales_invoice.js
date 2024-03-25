frappe.ui.form.on('Sales Invoice', {
	validate(frm) {
     if(frm.doc.company=="Sanket Enterprises" ) {
		if(frm.doc.is_return){
            frm.set_value("naming_series","SRET-.SE.-.YY.-");
        }
        else{
            frm.set_value("naming_series","SINV-.SE.-.YY.-");
        }
		}
        else if(frm.doc.company=="Gopal Enterprises"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","SRET-.GE.-.YY.-");

        }
        else{
            frm.set_value("naming_series","SINV-.GE.-.YY.-");
        }
    }
    else if(frm.doc.company=="Kameswari Agencies"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","SRET-.KA.-.YY.-");

        }
        else{
            frm.set_value("naming_series","SINV-.KA.-.YY.-");
        }
    }
    else if(frm.doc.company=="Zeus Distributors"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","SRET-.ZD.-.YY.-");

        }
        else{
            frm.set_value("naming_series","SINV-.ZD.-.YY.-");
        }
    }
    else if(frm.doc.company=="Aptiv Medical"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","SRET-.AM.-.YY.-");

        }
        else{
            frm.set_value("naming_series","SINV-.AM.-.YY.-");
        }
    }
    
    else if(frm.doc.company=="Advance Surgical"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","SRET-.AS.-.YY.-");

        }
        else{
            frm.set_value("naming_series","SINV-.AS.-.YY.-");
        }
    }
    else	{		
         
        }
        }
})
