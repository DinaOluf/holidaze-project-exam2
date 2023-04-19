import { Link } from 'react-router-dom';
import holidazeLogo from "../assets/images/holidaze-logo.png";
import { Logo } from './styles/logo.styles';

function Nav() {
    return (
        <nav className='row h-100 w-100 align-items-center'>
            <div className='col-4 col-sm-4 col-md-3 col-xl-2 d-flex justify-content-end px-0 ms-1'>
                <Link to='/' className='d-flex align-items-center text-decoration-none'>
                    <Logo src={holidazeLogo} alt='The Holidaze brand logo. A house shape with a circle in the middle depicting the sun' className='mb-2' />
                    <span className='fs-4 ps-2 text-dark'>Holidaze</span>
                </Link>
            </div>
            <div className='col px-0'>
                <ul className='row fs-6 ms-auto mb-0 list-style-type-none list-unstyled justify-content-end'>
                    <li className='col-4 col-sm-3 col-md-2 col-xl-2 col-xxl-1 px-0 me-2'>
                        <Link to='Login' className='text-dark text-decoration-none'>
                            New Venue
                        </Link>
                    </li>
                    <li className='col-3 col-sm-3 col-md-2 col-xl-2 col-xxl-1 px-0'>
                        <Link to='Register' className='text-dark text-decoration-none'>
                            Register
                        </Link>
                    </li>
                    <li className='col-3 col-sm-2 col-md-2 col-xl-2 col-xxl-2 px-0'>
                        <Link to='Login' className='text-dark text-decoration-none'>
                            Log in
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
  }

  export default Nav;