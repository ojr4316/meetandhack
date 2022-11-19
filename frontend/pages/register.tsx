export default function Register() {
    return (
        <form action="/api/form" method="post">
            <h1>Register</h1>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required />
            <label htmlFor="first">First</label>
            <input type="text" id="first" name="first" />
            <label htmlFor="last">Last Name</label>
            <input type="text" id="last" name="last" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Submit</button>
        </form>
    )

}

