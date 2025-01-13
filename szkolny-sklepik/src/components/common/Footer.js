import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-3">
            &copy; {new Date().getFullYear()} Szkolny Sklepik.
        </footer>
    );
}

export default Footer;