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
                <div style={{ display: 'flex', justifyContent: 'space-between',  padding: '15px'}}>
                    <p>VOTE.WEBSITE</p>
                    <p> {currentUser.email} </p>
                </div>
                <hr style={{ margin: '0'}} />
            </div>

            <div style={{ position: 'relative', width: '500px', maxWidth: '100%', margin: '50px auto' }}>
                <h1> Cast your vote today! </h1>
                {errors.submissionError && <h1>{errors.submissionError}</h1>}
                <form onSubmit={handleSubmit}>
                {errors.candidate.name && <span style={{ color: "red" }}>{errors.candidate.name}</span>}
                {candidates.map(candidate => {
                    const isSelected = candidate.id === formData.candidate.id && !formData.writeIn;
                    return (
                    <div key={"container" + candidate.id}>
                        <input
                        type="radio"
                        key={candidate.id}
                        onChange={handleInputChange}
                        value={candidate.id}
                        checked={isSelected}
                        name="candidate"
                        />
                        {candidate.name}
                    </div>
                    )
                })}
                <hr />
                <div style={{display: 'flex', flexDirection: 'column', paddingBottom: '15px'}}>
                    <label>
                        Or, add a new candidate:
                    </label>
                    <input
                    type="text"
                    style={{width: '200px', borderRadius: '5px', border: "1px solid #ccc"}}
                    name="name"
                    value={writeInName}
                    onChange={handleWriteIn}
                    />
                </div>
                <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
};

export default New;
