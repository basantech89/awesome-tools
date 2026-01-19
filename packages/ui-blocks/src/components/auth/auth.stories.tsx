import {
	Button,
	CardDescription,
	CardTitle,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@awesome-tools/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import z from 'zod'

import { FormBuilder } from '../forms/form-builder'
import { PasswordField } from '../forms/password-field'
import { TextField } from '../forms/text-field'
import { Auth, AuthAction, AuthContent, AuthFooter, AuthHeader } from './auth'
import { SigninContent, SigninForm } from './sign-in'
import { SignupContent, SignupForm } from './sign-up'
import type { Provider } from '#blocks/types'

const meta = {
	title: 'Components/Auth/Authentication',
	component: Auth,
} satisfies Meta<typeof Auth>

export default meta

type Story = StoryObj<typeof meta>

const action = fn()

const providers: Provider[] = [
	{
		name: 'google',
		action: fn(),
	},
	{
		name: 'meta',
		action: fn(),
	},
	{
		name: 'apple',
		action: fn(),
	},
	{
		name: 'github',
		action: fn(),
	},
]

export const Default: Story = {
	args: {},
	render: () => (
		<Auth>
			<AuthHeader>
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Login to your account</CardDescription>
			</AuthHeader>
			<SigninContent action={action}>
				<form>
					<SigninForm
						forgotPassword={
							<a
								className="ml-auto text-sm underline-offset-2 hover:underline"
								href="/"
							>
								Forgot your password?
							</a>
						}
					/>
				</form>
			</SigninContent>
			<AuthFooter>
				Don&apos;t have an account?&nbsp;
				<a className="underline underline-offset-4" href="/">
					Sign up
				</a>
			</AuthFooter>
		</Auth>
	),
	play: async ({ canvas, userEvent }) => {
		const emailInput = canvas.getByLabelText('Email')
		await userEvent.type(emailInput, 'user@example.com')
		expect(emailInput).toHaveValue('user@example.com')

		const passwordInput = canvas.getByPlaceholderText('Password')
		await userEvent.type(passwordInput, 'Test@123')
		expect(passwordInput).toHaveValue('Test@123')

		const submitButton = canvas.getByRole('button', { name: 'Login' })

		await userEvent.click(submitButton)

		expect(action).toHaveBeenCalled()
	},
}

export const ManyProviders: Story = {
	render: () => (
		<Auth>
			<AuthHeader>
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Login to your account</CardDescription>
			</AuthHeader>
			<SigninContent action={action}>
				<form>
					<SigninForm
						forgotPassword={
							<a
								className="ml-auto text-sm underline-offset-2 hover:underline"
								href="/"
							>
								Forgot your password?
							</a>
						}
					/>
				</form>
			</SigninContent>
			<AuthAction providers={providers} />
			<AuthFooter>
				Don&apos;t have an account?&nbsp;
				<a className="underline underline-offset-4" href="/">
					Sign up
				</a>
			</AuthFooter>
		</Auth>
	),
}

export const OneProvider: Story = {
	render: () => (
		<Auth>
			<AuthHeader>
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Login to your account</CardDescription>
			</AuthHeader>
			<SigninContent action={action}>
				<form>
					<SigninForm
						forgotPassword={
							<a
								className="ml-auto text-sm underline-offset-2 hover:underline"
								href="/"
							>
								Forgot your password?
							</a>
						}
					/>
				</form>
			</SigninContent>
			<AuthAction providers={providers.slice(0, 1)} />
			<AuthFooter>
				Don&apos;t have an account?&nbsp;
				<a className="underline underline-offset-4" href="/">
					Sign up
				</a>
			</AuthFooter>
		</Auth>
	),
}

export const TwoProviders: Story = {
	render: () => (
		<Auth>
			<AuthHeader>
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Login to your account</CardDescription>
			</AuthHeader>
			<SigninContent action={action}>
				<form>
					<SigninForm
						forgotPassword={
							<a
								className="ml-auto text-sm underline-offset-2 hover:underline"
								href="/"
							>
								Forgot your password?
							</a>
						}
					/>
				</form>
			</SigninContent>
			<AuthAction providers={providers.slice(0, 2)} />
			<AuthFooter>
				Don&apos;t have an account?&nbsp;
				<a className="underline underline-offset-4" href="/">
					Sign up
				</a>
			</AuthFooter>
		</Auth>
	),
}

export const ThreeProviders: Story = {
	render: () => (
		<Auth>
			<AuthHeader>
				<CardTitle>Welcome Back</CardTitle>
				<CardDescription>Login to your account</CardDescription>
			</AuthHeader>
			<SigninContent action={action}>
				<form>
					<SigninForm
						forgotPassword={
							<a
								className="ml-auto text-sm underline-offset-2 hover:underline"
								href="/"
							>
								Forgot your password?
							</a>
						}
					/>
				</form>
			</SigninContent>
			<AuthAction providers={providers.slice(0, 3)} />
			<AuthFooter>
				Don&apos;t have an account?&nbsp;
				<a className="underline underline-offset-4" href="/">
					Sign up
				</a>
			</AuthFooter>
		</Auth>
	),
}

export const CustomContent: Story = {
	render: () => (
		<Auth>
			<AuthHeader className="justify-items-center-safe">
				<CardTitle className="font-dasher text-4xl">WELCOME BACK</CardTitle>
				<CardDescription>Login to your account</CardDescription>
			</AuthHeader>
			<AuthContent
				action={action}
				defaultValues={{ username: '', password: '' }}
				schema={z.object({
					username: z.string().min(1, 'Username is required'),
					password: z.string().min(1, 'Password is required'),
				})}
			>
				<form>
					<FieldGroup>
						<TextField
							label="Username"
							name="username"
							placeholder="johndoe"
							required
						/>
						<div className="grid gap-3">
							<PasswordField
								id="password"
								name="password"
								placeholder="Password"
								required
							>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<a
									className="ml-auto text-end text-sm underline-offset-2 hover:underline"
									href="/"
								>
									Forgot your password?
								</a>
							</PasswordField>
						</div>
						<FormBuilder.Submit>
							<Button className="w-full">Login</Button>
						</FormBuilder.Submit>
					</FieldGroup>
				</form>
			</AuthContent>
			<AuthAction providers={providers.slice(0, 2)} />
			<AuthFooter>
				Don&apos;t have an account?&nbsp;
				<a className="underline underline-offset-4" href="/">
					Sign up
				</a>
			</AuthFooter>
		</Auth>
	),
}

export const Signup: Story = {
	render: () => (
		<Auth>
			<AuthHeader className="justify-items-center-safe">
				<CardTitle className="font-dasher text-4xl">WELCOME</CardTitle>
				<CardDescription>Create your account</CardDescription>
			</AuthHeader>
			<SignupContent action={action}>
				<form>
					<SignupForm />
				</form>
			</SignupContent>
			<AuthAction providers={providers.slice(0, 3)} />
			<AuthFooter>
				<FieldDescription className="px-6 text-center">
					By clicking continue, you agree to our{' '}
					<a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
				</FieldDescription>
			</AuthFooter>
		</Auth>
	),
}
