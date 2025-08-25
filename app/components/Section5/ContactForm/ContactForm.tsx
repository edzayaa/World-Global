import { FormEvent, useRef, useState } from "react";
import Bottom from "../../shared_components/Bottom/Bottom"
import "./styles.css"

const ContactForm = () => {
    
    const [selectValue, setSelectValue] = useState("")

    const send = (e: FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the form element
         //@ts-expect-error sss
        const form = e.target.closest('form');
        
        // Get all input elements inside the form
        const fullName = form.querySelector('input[name="full-name"]');
        const email = form.querySelector('input[name="email"]');
        const phoneNumber = form.querySelector('input[name="phone-number"]');
        const product = selectValue;
        const message = form.querySelector('textarea[name="message"]');

        // Simple validation checks
        if (!fullName.value.trim()) {
            alert('Please enter your full name.');
            fullName.focus();
            return;
        }

        if (!email.value.trim() || !email.value.includes('@')) {
            alert('Please enter a valid email address.');
            email.focus();
            return;
        }

        if (!phoneNumber.value.trim()) {
            alert('Please enter your phone number.');
            phoneNumber.focus();
            return;
        }
         //@ts-expect-error sss
        if (product.value === "") {
            alert('Please select a product.');
             //@ts-expect-error sss
            product.focus();
            return;
        }

        if (!message.value.trim()) {
            alert('Please enter your message.');
            message.focus();
            return;
        }

        // Create an object with the form data
        const formData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            phoneNumber: phoneNumber.value.trim(),
            //@ts-expect-error sss
            product: product.value,
            message: message.value.trim()
        };

        // Here you would typically send the data to an API
        console.log('Form data ready to be sent:', formData);
        
        /*
        fetch('https://your-api-endpoint.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Your message has been sent successfully!');
            form.reset(); // Reset the form fields after successful submission
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        });
        */
        
        // For this example, we'll just log and alert
        alert('Form submitted successfully!');
        form.reset(); // Reset the form after submission
    }
	return (
		<form className="contact_form">
			<div className="input_container">
				<input name="full-name" type="text" placeholder="Full Name" />
				<input name="email" type="email" placeholder="E-mail" />
			</div>
			<div className="input_container">
				<input name="phone-number" type="tel" placeholder="Phone Number" />
				<select  name="product" className={`${selectValue !== "" ?  'selected':''} `  } onChange={(e) => setSelectValue(e.target.value)} defaultValue={""}>
                    <option disabled={true}  value="">Select Bamboo or palms</option>
                    <option value="bamboo">Bamboo</option>
                    <option value="bamboo">Palms</option>
                </select>
                
			</div>
            <textarea name="message" placeholder="Message" />
            <div className="btn_container">
                <Bottom 
                    //@ts-expect-error dddd
                    onClick={ (e) => send(e)}
                    bgColor="yellow"
                    arrowColor="yellow"
                    bgArrowColor="white"
                    textColor="white"
                    
                    >
                    Submit
                </Bottom>
            </div>

		</form>
	)
}

export default ContactForm
