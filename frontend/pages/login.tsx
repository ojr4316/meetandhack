export default function Login(){
    return(
        <form action="/api/form" method="post">
          <label htmlFor="last">Email</label>
          <input type="text" id="email" name="email" required />
          <label htmlFor="last">Password</label>
          <input type="text" id="last" name="last" required />
          <button type="submit">Sign In</button>
        </form>
    )
    
}