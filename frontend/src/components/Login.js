import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Login.css'
export default function Login(props) {
    //set state
    let [username, setUsername] = React.useState('')
    let [password, setPassword] = React.useState('')

    let { checkUser } = React.useContext

    return (
        <div>
            <h1>Log in to Continue</h1>
            <Form className="loginform">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="username" placeholder="Enter Username" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="outline-dark" type="submit">Log In</Button>
            </Form>
        </div>
    )
}