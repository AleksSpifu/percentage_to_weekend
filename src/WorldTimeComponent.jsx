import React, { useState, useEffect } from 'react';

const WorldTimeComponent = () => {
    const [currentNorwayTime, setCurrentNorwayTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentNorwayTime(new Date());
        }, 1000); // Update the time every second

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
        { name: 'Anchorage', offset: -8 },
        { name: 'Los Angeles', offset: -7 },
        { name: 'Denver', offset: -6 },
        { name: 'Mexico City', offset: -5 },
        { name: 'New York', offset: -4 },
        { name: 'Buenos Aires', offset: -3 },
        { name: 'London', offset: 0 },
        { name: 'Paris', offset: 1 },
        { name: 'Moscow', offset: 3 },
        { name: 'Dubai', offset: 4 },
        { name: 'Athens', offset: 2 },
        { name: 'Mumbai', offset: 5.5 },
        { name: 'Bangkok', offset: 7 },
        { name: 'Hong Kong', offset: 8 },
        { name: 'Tokyo', offset: 9 },
        { name: 'Sydney', offset: 10 },
        { name: 'Honolulu', offset: -10 },
        { name: 'Samoa', offset: -11 },
        { name: 'Pago Pago', offset: -11 },
        { name: 'Baker Island', offset: -12 },
        { name: 'Midway Atoll', offset: -11 },
        { name: 'Pitcairn Islands', offset: -8 },
        { name: 'Kiritimati', offset: 14 },
        { name: 'Enderbury', offset: 13 },
        { name: 'Wake Island', offset: 12 },
        { name: 'Tarawa', offset: 12 },
        { name: 'Majuro', offset: 12 },
        { name: 'Kwajalein', offset: 12 },
        { name: 'Auckland', offset: 12 },
        { name: 'Tongatapu', offset: 13 },
        { name: 'Apia', offset: 13 },
        { name: 'Nuku`alofa', offset: 13 },
        { name: 'Fakaofo', offset: 13 },
        { name: 'Kiritimati', offset: 14 },
        { name: 'Funafuti', offset: 12 },
        { name: 'Tuvalu', offset: 12 },
        { name: 'Baker Island', offset: -12 },
        { name: 'Wake Island', offset: 12 },
        { name: 'Howland Island', offset: -11 },
        { name: 'Midway Atoll', offset: -11 },
        { name: 'Niue', offset: -11 },
        { name: 'Alofi', offset: -11 },
        { name: 'Penrhyn', offset: -10 },
        { name: 'Niue', offset: -11 },
        { name: 'Pago Pago', offset: -11 },
        { name: 'Avarua', offset: -10 },
        { name: 'Rarotonga', offset: -10 },
        { name: 'Hawaii', offset: -10 },
        { name: 'Honolulu', offset: -10 },
        { name: 'Adak', offset: -9 },
        { name: 'Nome', offset: -8 },
        { name: 'Anchorage', offset: -8 },
        { name: 'Juneau', offset: -8 },
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
        return matchingCities[0];
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
