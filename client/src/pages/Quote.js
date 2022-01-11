import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

function App() {
    const history = useHistory();
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('');

    async function populateQuote() {
        const req = await fetch('http://localhost:8888/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        //console.log(data);
        if(data.status === 'ok') {
            //setTempQuote('');
            setQuote(data.quote);
        } else {
            alert(data.error);
        }

    }

    async function updateQuote() {
        const req = await fetch('http://localhost:8888/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote
            })
        })

        const data = await req.json()
        //console.log(data);
        if(data.status === 'ok') {
            setTempQuote('');
            setQuote(tempQuote);
        } else {
            alert(data.error);
        }

    }

    useEffect( () => {
        const token = localStorage.getItem('token')

        if(token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            console.log(user);

            if(!user) {
                localStorage.removeItem('token');
                history.replace('/login');
            } else {
                populateQuote();
            }
        }
    })

    return (
        <div>
            <h1>Your quote: {quote || 'No quote found'}</h1>

            <form onSubmit={updateQuote}>
                <input type="text"
                    placeholder="quote"
                    value={tempQuote}
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <input type="submit" value="Update Quot" />
            </form>
        </div>
    )
}

export default App;