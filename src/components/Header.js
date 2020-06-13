import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link to="/" className="item">
				<h1
					style={{
						color: '#01bdf0',
						textTransform: 'uppercase',
						fontSize: '3.2rem',
					}}
				>
					<span style={{ textTransform: 'lowercase' }}>i</span>Stream
				</h1>
			</Link>
			<div className="right menu">
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;
