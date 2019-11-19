import React from 'react';

import {SignInContainer, ButtonsContainer} from './sign-in.styles'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

export default class SignIn extends React.Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {email, password} = this.state
        try{
            await auth.signInWithEmailAndPassword(email, password)

            this.setState({
                email: '',
                password: '',
            })
        }
        catch(error){
            console.error(error);
        }
    }

    handleChange = event => {
        const { value, name } = event.target

        this.setState({ [name]: value })
    }

    render() {
        return (
            <SignInContainer>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required />

                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required />

                    <ButtonsContainer>
                        <CustomButton type='submit' >
                            SIGN IN
                    </CustomButton>

                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            SIGN IN WITH GOOGLE
                    </CustomButton>
                    </ButtonsContainer>
                </form>
            </SignInContainer>
        )
    }
}