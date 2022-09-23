import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className='container'>
        <h1><Link to="/">Wilders Book</Link></h1>
        <nav><Link to='/wilders/'>Wilder</Link> <Link to='/skills/'>Skills</Link></nav>
      </div>
    </header>
  );
}
