frappe.ui.form.on('Payment Entry', {
	validate(frm) {
     if(frm.doc.company=="Sanket Enterprises" ) {
		  frm.set_value("naming_series","ACC-.SE.-PAY-.YYYY.-");
        }
        else if(frm.doc.company=="Gopal Enterprises"){
            frm.set_value("naming_series","ACC-.GE.-PAY-.YYYY.-");
    }
    else if(frm.doc.company=="Kameswari Agencies"){
        frm.set_value("naming_series","ACC-.KA.-PAY-.YYYY.-");
    }
    else if(frm.doc.company=="Zeus Distributors"){
        frm.set_value("naming_series","ACC-.ZD.-PAY-.YYYY.-");
    }
    else if(frm.doc.company=="Aptiv Medical"){
        frm.set_value("naming_series","ACC-.AM.-PAY-.YYYY.-");
    }
    else if(frm.doc.company=="Advance Surgical"){
        frm.set_value("naming_series","ACC-.AS.-PAY-.YYYY.-");
    } 
    else	{		
         
        }
        }
})
