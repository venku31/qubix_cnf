frappe.ui.form.on('Purchase Invoice', {
	validate(frm) {
     if(frm.doc.company=="Sanket Enterprises" ) {
		if(frm.doc.is_return){
            frm.set_value("naming_series","PRET-.SE.-.YY.-");
        }
        else{
            frm.set_value("naming_series","PINV-.SE.-.YY.-");
        }
		}
        else if(frm.doc.company=="Gopal Enterprises"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","PRET-.GE.-.YY.-");

        }
        else{
            frm.set_value("naming_series","PINV-.GE.-.YY.-");
        }
    }
    else if(frm.doc.company=="Kameswari Agencies"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","PRET-.KA.-.YY.-");

        }
        else{
            frm.set_value("naming_series","PINV-.KA.-.YY.-");
        }
    }
    else if(frm.doc.company=="Zeus Distributors"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","PRET-.ZD.-.YY.-");

        }
        else{
            frm.set_value("naming_series","PINV-.ZD.-.YY.-");
        }
    }
    else if(frm.doc.company=="Aptiv Medical"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","PRET-.AM.-.YY.-");

        }
        else{
            frm.set_value("naming_series","PINV-.AM.-.YY.-");
        }
    }
    else if(frm.doc.company=="Advance Surgical"){
        if(frm.doc.is_return){
        frm.set_value("naming_series","PRET-.AS.-.YY.-");

        }
        else{
            frm.set_value("naming_series","PINV-.AS.-.YY.-");
        }
    } 
    else	{		
         
        }
        }
})
