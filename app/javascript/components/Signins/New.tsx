import React, {useState} from "react";
import { i } from "react-router/dist/development/fog-of-war-D4x86-Xc";

interface SigninForm {
    email: string
    password: string
    zipCode: string
}
type FormErrors = {
  email?: string;
  zipCode?: string;
  password?: string;
}

function New () {
    const [formData, setFormData] = useState<SigninForm>({
        email: '',
        password: '',
        zipCode: '',
    });
    const [errors, setErrors] = useState<FormErrors>({
        email: '',
        password: '',
        zipCode: '',
    });


    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.zipCode) {
            newErrors.zipCode = "Zipcode is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        return newErrors;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const csrfTokenMeta = document.querySelector('[name="csrf-token"]') as HTMLMetaElement;
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            return
        }   

        if (csrfTokenMeta) {
            const csrfToken = csrfTokenMeta.content;
            try {
                const response = await fetch('/signins', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify({ user: formData })
                })
                if (!response.ok) {
                    // In the future we could add more error handling on the page itself
                    console.error('Form submission failed:', response.statusText);
                    return
                }
                const data = await response.json();
                window.location.href = '/votes/new?'
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    return (
        <div>
            <h1> Sign in to vote </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email:
                        <input 
                            type="text" 
                            name="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>
                <div>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                </div>
                <div>
                    <label>
                        Zip code:
                        <input 
                            type="text" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleInputChange}
                        />
                    </label>
                    {errors.zipCode && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default New;
