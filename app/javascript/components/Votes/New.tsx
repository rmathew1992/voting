import React, {useState, FormEvent} from "react";
import { Candidate } from "../../Types";

interface NewProps {
  candidates: Candidate[]
} 
interface VotingForm {
  selected: null | number
}

const New = ({ candidates }: NewProps) => {
    const [formData, setFormData] = useState<VotingForm>({
        selected: null
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
                    body: JSON.stringify({ vote: formData })
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
        selected: Number(value)
        });
    };

    return (
        <div>
            <h1>Candidate {candidates[0].name}</h1> 
            <form onSubmit={handleSubmit}>
                {candidates.map(candidate => { 
                    const isSelected = formData.selected !== null && candidate.id === formData.selected;
                    return(
                        <div>
                            <input type="radio" key={candidate.id} onChange={handleInputChange} value={candidate.id} checked={isSelected}/>
                            {candidate.name}
                        </div>
                    )
                 })}
            </form>
        </div>
    )
};

export default New;
