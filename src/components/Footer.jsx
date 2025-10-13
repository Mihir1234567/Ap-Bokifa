import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-10">
            <p>
                &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 mt-3">
                <a href="#" className="hover:text-orange-400 transition">
                    Privacy Policy
                </a>
                <a href="#" className="hover:text-orange-400 transition">
                    Terms
                </a>
                <a href="#" className="hover:text-orange-400 transition">
                    Support
                </a>
            </div>
        </footer>
    );
};

export default Footer;
