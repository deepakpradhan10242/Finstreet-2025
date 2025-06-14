import React from 'react';
import { Landmark } from 'lucide-react';
import FinStreet_logo from "../assets/Finstreet-logo.png";
import group_photo from "../assets/stage.jpg";

const About = () => {
    return (
        <section id="about" className="relative mt-40 text-white px-6 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="py-16 sm:py-20 lg:py-28 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        {/* Text Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-yellow-400">
                                <img src={FinStreet_logo} alt="Finstreet Logo" className="h-10 w-10" />
                                <Landmark className="w-7 h-7" />
                                <h2 className="text-3xl md:text-4xl font-bold tracking-wide hover:text-yellow-300 transition">
                                    About Finstreet
                                </h2>
                            </div>

                            <p className="text-base md:text-lg font-medium leading-relaxed text-white/90">
                                Ready to discover the ultimate keys to financial triumph through fun and exciting events? 
                                Get set for a groundbreaking experience presented by the <span className="text-yellow-400 font-semibold">Finance Club</span>. 
                                Are you prepared to test your financial knowledge and skills, and venture into the realms of money management, 
                                investment strategies, and wealth creation?
                            </p>

                            <p className="text-base md:text-lg font-medium leading-relaxed text-white/90">
                                Brace yourself for an exhilarating experience that will ignite your ambitions and leave you 
                                anticipating the days until it unfolds. <span className="text-yellow-400 font-bold">Finstreet'25</span> — coming soon!
                            </p>
                        </div>

                        {/* Image Section */}
                        <div className="rounded-xl border-4 border-yellow-500 shadow-[0_10px_40px_rgba(255,215,0,0.3)] overflow-hidden transform hover:scale-95 transition-all duration-300">
                            <img
                                src={group_photo}
                                alt="Finstreet Group"
                                className="w-full h-72 sm:h-80 md:h-96 object-cover object-top"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
