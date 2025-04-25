import React, {useState, FormEvent} from "react";
import { Candidate, User } from "../../Types";

interface NewProps {
  candidates: Candidate[]
  currentUser: User
} 
interface VotingForm {
  candidate: {
    id: null | number
    name: null | string
  }
  currentUser: User
}

const New = ({ candidates, currentUser }: NewProps) => {
    const [formData, setFormData] = useState<VotingForm>({
        candidate: { 
            id: null,
            name: null,
        }, 
        currentUser
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const csrfTokenMeta = document.querySelector('[name="csrf-token"]') as HTMLMetaElement;

        if (csrfTokenMeta) {
            const csrfToken = csrfTokenMeta.content;
            try {
                const response = await fetch('/votes', { 
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify(formData)
                })
                if (!response.ok) {     
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
            candidate: {
                id: Number(value),
                name: name 
            }
        });
    };

    return (
        <div>
            <h1> {currentUser.email} </h1>
            <form onSubmit={handleSubmit}>
                {candidates.map(candidate => { 
                    const isSelected = formData.candidate.id !== null && candidate.id === formData.candidate.id;
                    return(
                        <div key={"container" + candidate.id}>
                            <input 
                                type="radio" 
                                key={candidate.id} 
                                onChange={handleInputChange} 
                                value={candidate.id} 
                                checked={isSelected}
                                name={candidate.name}
                            />
                            {candidate.name}
                        </div>
                    )
                 })}
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default New;
