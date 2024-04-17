import React from 'react';
import "./Home.css";
import Product from './Product.js';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className='home__image'
            src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB4286684220_.jpg' alt=''/>

            <div className='home__row'>
                <Product 
                id="12321341"
                title="Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones" 
                price={29.99}image="https://m.media-amazon.com/images/I/81YkqyaFVEL._SY466_.jpg"
                rating={5} />

                <Product 
                id="49538094"
                title="Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB" 
                price={199.00}image="https://m.media-amazon.com/images/I/61GhF+JUXGL._AC_SX679_.jpg"
                rating={4} />
            </div>

            <div className='home__row'>
            <Product 
                id="4903850"
                title="SAMSUNG 55 Odyssey Ark 2nd Gen 4K UHD 1000R Curved Gaming Monitor, 165Hz, 1ms, 4 Input Multi View, Quantum Mini-LED, AMD FreeSync Premium Pro, HDR 10+, Height Adjustable Screen, LS55CG970NNXGO, 2023" 
                price={199.99}image="https://m.media-amazon.com/images/I/61mP47Yds-L._AC_SX679_.jpg"
                rating={3} />
                 <Product 
                id="23445930"
                title="Echo Dot (4th Gen) | Smart speaker with Alexa | Twilight Blue" 
                price={98.99}image="https://m.media-amazon.com/images/I/51maMLyRs4L._AC_SX679_.jpg"
                rating={3} />
                <Product 
                id="3254354345"
                title="Apple iPad Pro 12.9-inch (6th Generation): with M2 chip, Liquid Retina XDR Display, 256GB, Wi-Fi 6E + 5G Cellular, 12MP front/12MP and 10MP Back Cameras, Face ID, All-Day Battery Life – Silver" 
                price={1354.73}image="https://m.media-amazon.com/images/I/814P0ojHArL._AC_SX679_.jpg"
                rating={4} />
            </div>

            <div className='home__row'>
            <Product 
                id="90839332"
                title="SAMSUNG 27-Inch S39C Series FHD Curved Gaming Monitor, 75Hz, AMD FreeSync, Game Mode, Advanced Eye Comfort, Frameless Display, Built in Speakers, Slim Metal Stand, LS27C392EANXGO, 2023, Black" 
                price={1094.98}image="https://m.media-amazon.com/images/I/81VwF-U999L._AC_SX679_.jpg"
                rating={4} />

            <Product 
                id="32543345"
                title="PlayStation 5 Console CFI-1102A" 
                price={549.93}image="https://m.media-amazon.com/images/I/51051FiD9UL._SX522_.jpg"
                rating={5} />


            </div>

        </div>
    </div>
  )
}

export default Home
