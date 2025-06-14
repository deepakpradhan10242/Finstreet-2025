import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck, CalendarDays } from 'lucide-react';

import club_logo from "../assets/finance club white logo.png";
import bitmlogo from "../assets/bitmlogo.png";
import iiclogo from "../assets/iic.png";

const Hero = () => {
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingText = "Welcome to FINSTREET'25";
    const typingSpeed = 100;
    const delayAfterTyping = 2000;
    const delayBeforeDeleting = 1000;

    useEffect(() => {
        let timeoutId;

        const typeEffect = () => {
            setTypedText(current => {
                if (!isDeleting && current === typingText) {
                    timeoutId = setTimeout(() => setIsDeleting(true), delayAfterTyping);
                    return current;
                }

                if (isDeleting && current === '') {
                    timeoutId = setTimeout(() => setIsDeleting(false), delayBeforeDeleting);
                    return current;
                }

                return isDeleting
                    ? current.slice(0, -1)
                    : typingText.slice(0, current.length + 1);
            });
        };

        timeoutId = setTimeout(typeEffect, typingSpeed);
        return () => clearTimeout(timeoutId);
    }, [typedText, isDeleting]);

    return (
        <section id="home" className="mt-32 px-6 sm:px-8 lg:px-16 relative text-white">
            {/* Optional Background Overlay */}
            <div className="-mt-16 h-screen absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50 z-0"></div>

            {/* Logos */}
            <div className="relative z-10 flex justify-center items-center gap-6 flex-wrap">
                <Link to="https://financeclubbitm.in/" target="_blank" rel="noopener noreferrer">
                    <img src={club_logo} alt="Finance Club" className="w-28 lg:w-36 hover:scale-105 transition-transform" />
                </Link>
                <img src={bitmlogo} alt="BIT Mesra" className="w-16 lg:w-24 hover:scale-105 transition-transform" />
                <img src={iiclogo} alt="IIC Logo" className="w-28 lg:w-36 hover:scale-105 transition-transform" />
            </div>

            {/* Typing Text */}
            <div className="relative z-10 text-center mt-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 font-street tracking-wider py-12">
                    <span>{typedText}</span>
                    <span className="animate-pulse">|</span>
                </h2>
            </div>

            {/* Description & Buttons */}
            <div className="relative z-10 mt-8 text-center max-w-3xl mx-auto">
                <p className="text-base sm:text-lg lg:text-xl font-medium text-white leading-relaxed">
                    Embark on a financial odyssey at <span className="text-yellow-400 font-semibold">Finstreet</span>. Explore investment insights, market trends, and innovative finance. 
                    Elevate your financial know-how – join the adventure! 🚀💰
                </p>

                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    {/* Register Events Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/events"
                            className="flex items-center gap-2 bg-yellow-100 text-black font-semibold py-2.5 px-6 rounded-xl text-base shadow-lg hover:bg-yellow-300 transition-all duration-300"
                            title="Go to Events Page"
                        >
                            <CalendarCheck className="w-5 h-5" />
                            Register Events
                        </Link>
                    </motion.div>

                    {/* Calendar Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/calendar"
                            className="flex items-center gap-2 bg-black/30 border-2 border-yellow-400 backdrop-blur-md text-white font-semibold py-2.5 px-6 rounded-xl text-base hover:bg-yellow-500 hover:text-black transition-all duration-300"
                            title="View Event Calendar"
                        >
                            <CalendarDays className="w-5 h-5" />
                            Calendar
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
