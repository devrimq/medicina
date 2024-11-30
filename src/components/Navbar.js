import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='bg-blue-500 p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<NavLink
					to='/'
					className='text-white text-xl font-bold'
					activeClassName='text-yellow-400'>
					Blog
				</NavLink>
				<div>
					<NavLink
						to='/'
						className='text-white mr-4 hover:text-gray-300'
						activeClassName='text-yellow-400'>
						Ana Sayfa
					</NavLink>
					<NavLink
						to='/create-article'
						className='text-white hover:text-gray-300'
						activeClassName='text-yellow-400'>
						Yeni Makale
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
