import React, {useState, FormEvent} from "react";
import { Candidate, User } from "../../Types";
import { i } from "react-router/dist/development/fog-of-war-D4x86-Xc";

interface NewProps {
  candidates: Candidate[]
  currentUser: User
} 
interface VotingForm {
  candidate: {
    id?: number
    name: string
  }
  writeIn: boolean
}
type FormErrors = {
  candidate: {
    name?: string;
  }
  submissionError?: string
}

const New = ({ candidates, currentUser }: NewProps) => {
    const [formData, setFormData] = useState<VotingForm>({
        candidate: { 
            name: '',
        }, 
        writeIn: false
    });

    const [errors, setErrors] = useState<FormErrors>({
        candidate: {},
    });

    const validateForm = () => {
        const newErrors: FormErrors = { candidate: {} };

        if (!formData.candidate.name) {
            newErrors.candidate.name = "Candidate is required";
        }
        return newErrors
    }

    function hasErrors(errors: FormErrors) {
        return (
            !!errors.candidate.name
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const csrfTokenMeta = document.querySelector('[name="csrf-token"]') as HTMLMetaElement;
        const validationErrors = validateForm();
        if (hasErrors(validationErrors)) {
            setErrors(validationErrors);
            return
        }   

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
                const data = await response.json();
                if (!response.ok) {     
                    setErrors({
                        ...errors,
                        submissionError: data.data
                    })
                    return
                }
                window.location.href = '/'
                console.log('Form submitted successfully:', data);
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
            }, 
            writeIn: false
        });
    };

    const handleWriteIn = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData({
        ...formData,
            candidate: {
                id: undefined,
                name: value 
            },
            writeIn: true
        });
    };

    const writeInName = formData.writeIn ? formData.candidate.name : ''

    return (
        <div>
            <div>
                <h1> VOTE.WEBSITE </h1>
                <h1> {currentUser.email} </h1>
            </div>

            <h1> Cast your vote today! </h1>
            {errors.submissionError &&  <h1>{errors.submissionError}</h1> }
            <form onSubmit={handleSubmit}>
                {errors.candidate.name && <span style={{ color: "red" }}>{errors.candidate.name}</span>}
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
                <label>
                    Or, add a new candidate:
                    <input 
                        type="text" 
                        name="name" 
                        value={writeInName}
                        onChange={handleWriteIn}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default New;
