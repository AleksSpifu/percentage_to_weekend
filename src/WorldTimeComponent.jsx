import React, { useState, useEffect } from 'react';

const WorldTimeComponent = () => {
    const [currentNorwayTime, setCurrentNorwayTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentNorwayTime(new Date());
        }, 60000); // Update the time every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const getTimeInCity = (cityOffset) => {
        const norwayOffset = 2; // Norway's time offset is UTC+2
        const currentTime = new Date(currentNorwayTime.getTime() + cityOffset * 3600000);
        return currentTime;
    };

    const cities = [
        { name: 'Anchorage, USA', offset: -8 },
        { name: 'Los Angeles, USA', offset: -7 },
        { name: 'Denver, USA', offset: -6 },
        { name: 'Mexico City, Mexico', offset: -5 },
        { name: 'New York, USA', offset: -4 },
        { name: 'Buenos Aires, Argentina', offset: -3 },
        { name: 'Azores, Portugal', offset: -2 },
        { name: 'London, UK', offset: 0 },
        { name: 'Paris, France', offset: 1 },
        { name: 'Athens, Greece', offset: 2 },
        { name: 'Moscow, Russia', offset: 3 },
        { name: 'Dubai, UAE', offset: 4 },
        { name: 'Mumbai, India', offset: 5.5 },
        { name: 'Kathmandu, Nepal', offset: 5.75 },
        { name: 'Bangkok, Thailand', offset: 7 },
        { name: 'Hong Kong, Hong Kong', offset: 8 },
        { name: 'Tokyo, Japan', offset: 9 },
        { name: 'Sydney, Australia', offset: 10 },
        { name: 'Pago Pago, American Samoa', offset: -11 },
        { name: 'Baker Island, US Minor Outlying Islands', offset: -12 },
        { name: 'Midway Atoll, US Minor Outlying Islands', offset: -11 },
        { name: 'Baker Island, US Minor Outlying Islands', offset: -12 },
        { name: 'Honolulu, USA', offset: -10 },
        { name: 'Nome, USA', offset: -8 },
        { name: 'San Francisco, USA', offset: -7 },
        { name: 'Denver, USA', offset: -6 },
        { name: 'Chicago, USA', offset: -5 },
        { name: 'New York, USA', offset: -4 },
        { name: 'Rio de Janeiro, Brazil', offset: -3 },
        { name: 'Azores, Portugal', offset: -2 },
        { name: 'London, UK', offset: 0 },
        { name: 'Brussels, Belgium', offset: 1 },
        { name: 'Athens, Greece', offset: 2 },
        { name: 'Moscow, Russia', offset: 3 },
        { name: 'Dubai, UAE', offset: 4 },
        { name: 'Karachi, Pakistan', offset: 5 },
        { name: 'Kolkata, India', offset: 5.5 },
        { name: 'Yangon, Myanmar', offset: 6.5 },
        { name: 'Bangkok, Thailand', offset: 7 },
        { name: 'Hong Kong, Hong Kong', offset: 8 },
        { name: 'Tokyo, Japan', offset: 9 },
        { name: 'Sydney, Australia', offset: 10 },
        { name: 'Pago Pago, American Samoa', offset: -11 },
        { name: 'Baker Island, US Minor Outlying Islands', offset: -12 },
        { name: 'Honolulu, USA', offset: -10 },
        { name: 'Anchorage, USA', offset: -8 },
    ];

    const findCityWithTime = () => {
        const targetHour = 17; // 5 PM
        const matchingCities = cities.filter((city) => {
            const cityTime = getTimeInCity(city.offset);
            return cityTime.getHours() === targetHour;
        });
        if (matchingCities.length === 0) {
            return { name: 'Fuck me dude, idk, but in Norway it is', offset: 0 }
        }
        return matchingCities[Math.floor(Math.random() * matchingCities.length)];
    };

    const matchingCity = findCityWithTime();

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'absolute', bottom: 20 }}>
            <h1 style={{ color: '#bbbbbb', margin: 0, fontStyle: 'italic' }}>'It's always 5pm somewhere'</h1>
            {matchingCity && <>
                <h3 style={{ color: '#bbbbbb' }}>And now it is {matchingCity.name}: {getTimeInCity(matchingCity.offset).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}</h3>
            </>
            }

        </div>
    );
};

export default WorldTimeComponent;
