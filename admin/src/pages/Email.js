import React, { useState } from 'react';
import { sendEmail } from '../service/Email';

const Email = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        secondRecipient: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await sendEmail(formData);
            alert(result.message);
            setFormData({
                from: '',
                to: '',
                secondRecipient: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            alert("Failed to send email");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="from">From:</label>
            <input
                type="email"
                name="from"
                id="from"
                value={formData.from}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="to">To:</label>
            <input
                type="email"
                name="to"
                id="to"
                value={formData.to}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="secondRecipient">Second Email:</label>
            <input
                type="email"
                name="secondRecipient"
                id="secondRecipient"
                value={formData.secondRecipient}
                onChange={handleInputChange}
            />
            <label htmlFor="subject">Subject:</label>
            <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="message">Message:</label>
            <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                required
            ></textarea>
            <button type="submit">Send Email</button>
        </form>
    );
};

export default Email;
