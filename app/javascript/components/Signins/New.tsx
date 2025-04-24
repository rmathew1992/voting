import React, {useState} from "react";


function New () {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        zipCode: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const csrfTokenMeta = document.querySelector('[name="csrf-token"]') as HTMLMetaElement;

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
                window.location.href = '/votes/new'
                console.log('Form submitted successfully:', data);
                //redirect
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
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Password:
                <input 
                    type="text" 
                    name="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Zip code:
                <input 
                    type="text" 
                    name="zipCode" 
                    value={formData.zipCode} 
                    onChange={handleInputChange}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
};

export default New;
